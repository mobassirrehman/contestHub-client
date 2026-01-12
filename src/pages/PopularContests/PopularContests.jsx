import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaArrowRight, FaFire } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import ContestCard from "../../components/ContestCard/ContestCard";
import SkeletonLoader from "../../components/Skeletons/Skeletons";

const PopularContests = () => {
  const axiosPublic = useAxios();

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["popular-contests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/contests/popular");
      return res.data;
    },
    // Cache for 5 minutes to reduce API calls and improve performance
    staleTime: 5 * 60 * 1000,
    // Keep data in cache for 10 minutes
    gcTime: 10 * 60 * 1000,
  });

  return (
    <section className="py-16 lg:py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FaFire className="text-orange-500 text-xl" />
              <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">
                Trending Now
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold">Popular Contests</h2>
            <p className="text-base-content/60 mt-2 max-w-xl">
              Join the most exciting competitions with the highest
              participation. Don't miss your chance to win!
            </p>
          </div>

          <motion.div
            whileHover="hover"
            initial="initial"
            className="group self-start md:self-auto"
          >
            <Link
              to="/all-contests"
              className="btn btn-outline border-2 border-cyan-500 text-cyan-500 hover:border-cyan-400/20 relative overflow-hidden"
            >
              <motion.span
                variants={{
                  initial: { scaleX: 0 },
                  hover: { scaleX: 1 },
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ originX: 0 }}
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500"
              />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                View All Contests
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Contests Grid - 4 columns on xl screens, showing 8 cards */}
        {isLoading ? (
          <SkeletonLoader type="cards" count={8} />
        ) : contests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {contests.slice(0, 8).map((contest, index) => (
              <ContestCard key={contest._id} contest={contest} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-base-200 rounded-2xl"
          >
            <div className="text-6xl flex justify-center mb-4">🏆</div>
            <h3 className="text-xl font-semibold mb-2">No Contests Yet</h3>
            <p className="text-base-content/60">
              Be the first to create a contest and start the competition!
            </p>
          </motion.div>
        )}

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center md:hidden"
        >
          <Link to="/all-contests" className="btn btn-gradient-primary">
            Show All Contests
            <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularContests;
