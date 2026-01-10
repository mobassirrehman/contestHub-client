import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaCrown, FaTrophy, FaUsers, FaStar, FaArrowRight } from "react-icons/fa";

const FeaturedCreators = () => {
  const creators = [
    {
      id: 1,
      name: "TechVision Studios",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      specialty: "Web Development",
      contestsCreated: 24,
      totalParticipants: 1250,
      totalPrizePool: "$45,000",
      rating: 4.9,
      verified: true,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      name: "Creative Minds Co",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      specialty: "Graphic Design",
      contestsCreated: 18,
      totalParticipants: 980,
      totalPrizePool: "$32,000",
      rating: 4.8,
      verified: true,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      name: "WordSmith Agency",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
      specialty: "Content Writing",
      contestsCreated: 31,
      totalParticipants: 1540,
      totalPrizePool: "$28,500",
      rating: 4.9,
      verified: true,
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="section-padding bg-base-100">
      <div className="page-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <div className="section-badge bg-amber-500/10 text-amber-500">
            <FaCrown />
            <span>Top Creators</span>
          </div>
          <h2 className="section-title">
            Featured <span className="text-gradient-warning">Contest Creators</span>
          </h2>
          <p className="section-subtitle">
            Meet the creative minds behind our most popular contests. 
            These verified creators consistently deliver amazing competitions.
          </p>
        </motion.div>

        {/* Creators Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {creators.map((creator, index) => (
            <motion.div
              key={creator.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Card */}
              <div className="feature-card h-full">
                {index === 0 && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <FaCrown className="text-xs" />
                    #1 Creator
                  </div>
                )}

                {/* Avatar & Info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${creator.gradient} rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity`}
                    />
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="relative w-16 h-16 rounded-full object-cover ring-2 ring-base-100"
                    />
                    {creator.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-cyan-500 text-white p-1 rounded-full">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-base-content group-hover:text-cyan-500 transition-colors">
                      {creator.name}
                    </h3>
                    <p className="text-sm text-base-content/60">
                      {creator.specialty}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <FaStar className="text-amber-400 text-xs" />
                      <span className="text-sm font-medium">{creator.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="text-center p-3 bg-base-200 rounded-xl">
                    <FaTrophy className="text-cyan-500 mx-auto mb-1" />
                    <p className="text-lg font-bold">{creator.contestsCreated}</p>
                    <p className="text-xs text-base-content/60">Contests</p>
                  </div>
                  <div className="text-center p-3 bg-base-200 rounded-xl">
                    <FaUsers className="text-purple-500 mx-auto mb-1" />
                    <p className="text-lg font-bold">{creator.totalParticipants.toLocaleString()}</p>
                    <p className="text-xs text-base-content/60">Participants</p>
                  </div>
                  <div className="text-center p-3 bg-base-200 rounded-xl">
                    <span className="text-emerald-500 font-bold">$</span>
                    <p className="text-lg font-bold">{creator.totalPrizePool.replace('$', '')}</p>
                    <p className="text-xs text-base-content/60">Prizes</p>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  to="/all-contests"
                  className="btn btn-outline-cyan w-full group/btn"
                >
                  View Contests
                  <FaArrowRight className="text-sm group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Become Creator CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-base-content/60 mb-4">
            Want to create your own contests and build a community?
          </p>
          <Link
            to="/become-creator"
            className="btn btn-gradient-primary"
          >
            <FaCrown />
            Become a Creator
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCreators;