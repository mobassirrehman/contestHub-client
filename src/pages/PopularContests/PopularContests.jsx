import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaArrowRight, FaFire } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import ContestCard from "../../components/ContestCard/ContestCard";
import SkeletonLoader from "../../components/Skeletons/Skeletons";
// import { FaTrophy } from "react-icons/fa";

const PopularContests = () => {
  const axiosPublic = useAxios();

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["popular-contests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/contests/popular");
      return res.data;
    },
  });

  return (
    <section className="py-16 lg:py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
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
            <p className="text-gray-500 mt-2 max-w-xl">
              Join the most exciting competitions with the highest
              participation. Don't miss your chance to win!
            </p>
          </div>

          <Link
            to="/all-contests"
            className="btn btn-outline hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white group self-start md:self-auto"
          >
            View All Contests
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {isLoading ? (
          <SkeletonLoader type="cards" count={6} />
        ) : contests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {contests.map((contest, index) => (
              <ContestCard key={contest._id} contest={contest} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-base-200 rounded-2xl"
          >
            <div className="text-6xl flex justify-center mb-4">
              {/* <FaTrophy className=" text-amber-500 " /> */}🏆
            </div>
            <h3 className="text-xl font-semibold mb-2">No Contests Yet</h3>
            <p className="text-gray-500">
              Be the first to create a contest and start the competition!
            </p>
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center md:hidden"
        >
          <Link
            to="/all-contests"
            className="btn bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-600 hover:to-cyan-600 btn-wide"
          >
            Show All Contests
            <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularContests;
