import { Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { FaUsers, FaClock, FaTrophy, FaFire, FaStar } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

const ContestCard = ({ contest, index = 0 }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const {
        _id,
        name,
        image,
        type,
        description,
        participantsCount = 0,
        prizeMoney,
        deadline,
        status
    } = contest;

    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    const isEnded = daysLeft <= 0;

    const getBadge = () => {
        if (participantsCount >= 100) return { text: 'Hot', icon: <FaFire />, color: 'bg-red-500' };
        if (participantsCount >= 50) return { text: 'Trending', icon: <FaStar />, color: 'bg-purple-500' };
        if (index === 0) return { text: "Editor's Pick", icon: <FaTrophy />, color: 'bg-amber-500' };
        return null;
    };

    const badge = getBadge();

    const handleDetailsClick = () => {
        if (user) {
            navigate(`/contest/${_id}`);
        } else {
            navigate('/login', { state: `/contest/${_id}` });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group"
        >
            <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-base-200 h-full">
                <figure className="relative h-48 overflow-hidden">
                    <img
                        src={image || 'https://placehold.co/400x300?text=Contest'}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {badge && (
                        <div className={`absolute top-3 right-3 ${badge.color} text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg`}>
                            {badge.icon}
                            {badge.text}
                        </div>
                    )}

                    <div className={`absolute top-3 left-3 ${isEnded ? 'bg-gray-600' : 'bg-black/60 backdrop-blur-sm'} text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5`}>
                        <FaClock className={isEnded ? '' : 'text-amber-400'} />
                        {isEnded ? 'Ended' : `${daysLeft} days left`}
                    </div>

                    <div className="absolute bottom-3 left-3">
                        <span className="bg-primary/90 text-primary-content text-xs font-medium px-3 py-1 rounded-full capitalize">
                            {type?.replace('-', ' ') || 'General'}
                        </span>
                    </div>
                </figure>

                <div className="card-body p-5">
                    <h3 className="card-title text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors">
                        {name}
                    </h3>

                    <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px]">
                        {description?.slice(0, 80)}{description?.length > 80 ? '...' : ''}
                    </p>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-base-200">
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {[...Array(Math.min(3, participantsCount || 1))].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs text-white border-2 border-base-100"
                                    >
                                        {i + 1}
                                    </div>
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">
                                <FaUsers className="inline mr-1" />
                                {participantsCount}
                            </span>
                        </div>

                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                            <FaTrophy />
                            <span>${prizeMoney || 0}</span>
                        </div>
                    </div>

                    <div className="card-actions mt-4">
                        <button
                            onClick={handleDetailsClick}
                            disabled={isEnded}
                            className={`btn w-full ${isEnded
                                    ? 'btn-disabled'
                                    : 'btn-primary hover:scale-[1.02]'
                                } transition-transform`}
                        >
                            {isEnded ? 'Contest Ended' : 'View Details'}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ContestCard;