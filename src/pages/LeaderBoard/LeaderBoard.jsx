import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaTrophy, FaMedal, FaCrown, FaAward } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import SkeletonLoader from "../../components/Skeletons/Skeletons";

const Leaderboard = () => {
  const axiosPublic = useAxios();

  const { data: leaderboard = [], isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await axiosPublic.get("/leaderboard");
      return res.data;
    },
  });

  const getRankStyle = (rank) => {
    switch (rank) {
      case 1:
        return {
          bg: "bg-gradient-to-r from-amber-600 to-yellow-500",
          icon: <FaCrown className="text-white" />,
          border: "border-none",
          text: "text-white",
        };
      case 2:
        return {
          bg: "bg-gradient-to-r from-gray-500 to-gray-400",
          icon: <FaMedal className="text-white" />,
          border: "border-none",
          text: "text-white",
        };
      case 3:
        return {
          bg: "bg-gradient-to-r from-amber-800 to-amber-900",
          icon: <FaMedal className="text-white" />,
          border: "border-none",
          text: "text-white",
        };
      default:
        return {
          bg: "bg-base-200",
          icon: <FaAward className="text-gray-400" />,
          border: "border-none",
          text: "text-gray-700",
        };
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      <div className="bg-gradient-to-br from-cyan-900 via-blue-900 to-emerald-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-500 to-amber-000 rounded-full mb-6">
              <FaTrophy className="text-4xl text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Leaderboard
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Top performers who have conquered the most contests
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 -mt-8">
        {isLoading ? (
          <div className="bg-base-100 rounded-2xl shadow-xl p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
          </div>
        ) : leaderboard.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-base-100 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-green-600 via-cyan-600 to-emerald-600 p-8">
              <div className="flex items-end justify-center gap-4">
                {leaderboard[1] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                  >
                    <div className="relative">
                      <img
                        src={
                          leaderboard[1].userPhoto ||
                          "https://i.ibb.co.com/mC3FBP9V/user-placeholder.jpg"
                        }
                        alt={leaderboard[1].userName}
                        className="w-20 h-20 rounded-full border-4 border-gray-300 mx-auto object-cover"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center font-bold text-gray-700">
                        2
                      </div>
                    </div>
                    <p className="mt-3 font-semibold text-white truncate max-w-[100px]">
                      {leaderboard[1].userName}
                    </p>
                    <p className="text-sm text-gray-200">
                      {leaderboard[1].winCount} wins
                    </p>
                    <div className="h-16 w-20 bg-gray-300/30 rounded-t-lg mt-2"></div>
                  </motion.div>
                )}

                {leaderboard[0] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-center -mt-8"
                  >
                    <FaCrown className="text-4xl text-amber-400 mx-auto mb-2" />
                    <div className="relative">
                      <img
                        src={
                          leaderboard[0].userPhoto ||
                          "https://i.ibb.co.com/mC3FBP9V/user-placeholder.jpg"
                        }
                        alt={leaderboard[0].userName}
                        className="w-28 h-28 rounded-full border-4 border-amber-400 mx-auto object-cover"
                      />
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center font-bold text-white text-lg">
                        1
                      </div>
                    </div>
                    <p className="mt-3 font-bold text-white text-lg truncate max-w-[120px]">
                      {leaderboard[0].userName}
                    </p>
                    <p className="text-amber-300 font-semibold">
                      {leaderboard[0].winCount} wins
                    </p>
                    <div className="h-24 w-24 bg-amber-400/30 rounded-t-lg mt-2"></div>
                  </motion.div>
                )}

                {leaderboard[2] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                  >
                    <div className="relative">
                      <img
                        src={
                          leaderboard[2].userPhoto ||
                          "https://i.ibb.co.com/mC3FBP9V/user-placeholder.jpg"
                        }
                        alt={leaderboard[2].userName}
                        className="w-20 h-20 rounded-full border-4 border-amber-600 mx-auto object-cover"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center font-bold text-white">
                        3
                      </div>
                    </div>
                    <p className="mt-3 font-semibold text-white truncate max-w-[100px]">
                      {leaderboard[2].userName}
                    </p>
                    <p className="text-sm text-gray-200">
                      {leaderboard[2].winCount} wins
                    </p>
                    <div className="h-12 w-20 bg-amber-600/30 rounded-t-lg mt-2"></div>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold mb-4">Full Rankings</h3>
              <div className="space-y-3">
                {leaderboard.map((user, index) => {
                  const rank = index + 1;
                  const style = getRankStyle(rank);

                  return (
                    <motion.div
                      key={user._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 ${
                        style.border
                      } ${rank <= 3 ? style.bg : "bg-base-200"}`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          rank <= 3
                            ? "bg-white/20 text-white"
                            : "bg-base-300 text-gray-600"
                        }`}
                      >
                        {rank <= 3 ? style.icon : rank}
                      </div>

                      <div className="flex items-center gap-3 flex-1">
                        <img
                          src={
                            user.userPhoto ||
                            "https://i.ibb.co.com/mC3FBP9V/user-placeholder.jpg"
                          }
                          alt={user.userName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p
                            className={`font-semibold ${
                              rank <= 3 ? "text-white" : ""
                            }`}
                          >
                            {user.userName}
                          </p>
                          <p
                            className={`text-sm ${
                              rank <= 3 ? "text-white/70" : "text-gray-500"
                            }`}
                          >
                            {user._id}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`text-right ${
                          rank <= 3 ? "text-white" : ""
                        }`}
                      >
                        <p className="text-2xl font-bold">{user.winCount}</p>
                        <p
                          className={`text-sm ${
                            rank <= 3 ? "text-white/70" : "text-gray-500"
                          }`}
                        >
                          {user.winCount === 1 ? "win" : "wins"}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-base-100 rounded-2xl shadow-xl p-12 text-center"
          >
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold mb-2">No Winners Yet</h3>
            <p className="text-gray-500">
              Be the first to win a contest and claim the top spot!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
