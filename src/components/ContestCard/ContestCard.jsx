import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaUsers, FaClock, FaTrophy, FaFire, FaStar } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

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
  } = contest;

  const deadlineDate = new Date(deadline);
  const today = new Date();
  const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  const isEnded = daysLeft <= 0;

  const getBadge = () => {
    if (participantsCount >= 100)
      return { text: "Hot", icon: <FaFire />, color: "bg-red-500" };
    if (participantsCount >= 50)
      return { text: "Trending", icon: <FaStar />, color: "bg-emerald-500" };
    if (index === 0)
      return {
        text: "Editor's Pick",
        icon: <FaTrophy />,
        color: "bg-amber-500",
      };
    return null;
  };

  const badge = getBadge();

  const handleDetailsClick = () => {
    if (user) {
      navigate(`/contest/${_id}`);
    } else {
      navigate("/login", { state: `/contest/${_id}` });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group h-full"
    >
      <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-base-200 h-full flex flex-col rounded-2xl">
        {/* Image Section */}
        <figure className="relative h-48 overflow-hidden">
          <img
            src={image || "https://placehold.co/400x300?text=Contest"}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Badge */}
          {badge && (
            <div
              className={`absolute top-3 right-3 ${badge.color} text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg`}
            >
              {badge.icon}
              {badge.text}
            </div>
          )}

          {/* Days Left */}
          <div
            className={`absolute top-3 left-3 ${
              isEnded ? "bg-gray-600" : "bg-black/60 backdrop-blur-sm"
            } text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5`}
          >
            <FaClock className={isEnded ? "" : "text-amber-400"} />
            {isEnded ? "Ended" : `${daysLeft} days left`}
          </div>

          {/* Category Tag */}
          <div className="absolute bottom-3 left-3">
            <span className="bg-cyan-500/80 text-white text-xs font-medium px-3 py-1.5 rounded-full capitalize backdrop-blur-sm">
              {type?.replace("-", " ") || "General"}
            </span>
          </div>
        </figure>

        {/* Content Section */}
        <div className="card-body p-5 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="card-title text-lg font-bold line-clamp-1 text-base-content group-hover:text-cyan-500 transition-colors">
            {name}
          </h3>

          {/* Description */}
          <p className="text-sm text-base-content/60 line-clamp-2 min-h-[40px]">
            {description?.slice(0, 80)}
            {description?.length > 80 ? "..." : ""}
          </p>

          {/* Stats Row */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-base-200">
            {/* Participants */}
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[...Array(Math.min(3, participantsCount || 1))].map((_, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-xs text-white border-2 border-base-100"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <span className="text-sm text-base-content/60 flex items-center gap-1">
                <FaUsers className="text-xs" />
                {participantsCount}
              </span>
            </div>

            {/* Prize */}
            <div className="flex items-center gap-1.5 text-amber-500 font-bold">
              <FaTrophy className="text-sm" />
              <span>${prizeMoney?.toLocaleString() || 0}</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="card-actions mt-4">
            <button
              onClick={handleDetailsClick}
              disabled={isEnded}
              className={`btn w-full rounded-xl ${
                isEnded
                  ? "btn-disabled bg-base-300 text-base-content/50"
                  : "btn-gradient-primary hover:scale-[1.02]"
              } transition-transform`}
            >
              {isEnded ? "Contest Ended" : "View Details"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContestCard;
