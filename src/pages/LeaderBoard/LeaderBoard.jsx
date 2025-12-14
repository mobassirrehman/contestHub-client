import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaMedal,
  FaCrown,
  FaSearch,
  FaDollarSign,
  FaUsers,
  FaAward,
} from "react-icons/fa";
import { GiDiamondTrophy } from "react-icons/gi";
import useAxios from "../../hooks/useAxios";
import SkeletonLoader from "../../components/Skeletons/Skeletons";

const Leaderboard = () => {
  const axiosPublic = useAxios();
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");

  const { data: leaderboard = [], isLoading } = useQuery({
    queryKey: ["leaderboard", timeFilter],
    queryFn: async () => {
      const res = await axiosPublic.get(`/leaderboard?filter=${timeFilter}`);
      return res.data;
    },
  });

  const filteredLeaderboard = leaderboard.filter(
    (user) =>
      user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user._id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBadge = (wins) => {
    if (wins >= 10)
      return {
        name: "Diamond",
        className: "badge-diamond",
        icon: <GiDiamondTrophy />,
      };
    if (wins >= 5)
      return {
        name: "Platinum",
        className: "badge-platinum",
        icon: <FaTrophy />,
      };
    if (wins >= 3)
      return { name: "Gold", className: "badge-gold", icon: <FaMedal /> };
    if (wins >= 2)
      return { name: "Silver", className: "badge-silver", icon: <FaMedal /> };
    return { name: "Bronze", className: "badge-bronze", icon: <FaAward /> };
  };

  const getRankStyle = (rank) => {
    if (rank === 1) return "rank-1";
    if (rank === 2) return "rank-2";
    if (rank === 3) return "rank-3";
    return "bg-base-300 text-gray-600";
  };

  const getRingColor = (rank) => {
    if (rank === 1) return "ring-amber-400";
    if (rank === 2) return "ring-gray-400";
    if (rank === 3) return "ring-amber-600";
    return "ring-base-300";
  };

  const totalWins = leaderboard.reduce((sum, user) => sum + user.winCount, 0);
  const totalPrize = leaderboard.reduce(
    (sum, user) => sum + (user.totalPrize || 0),
    0
  );

  const timeFilters = [
    { value: "all", label: "All Time" },
    { value: "month", label: "This Month" },
    { value: "week", label: "This Week" },
  ];

  const badgeLevels = [
    { name: "Bronze", wins: "1 win", className: "badge-bronze" },
    { name: "Silver", wins: "2+ wins", className: "badge-silver" },
    { name: "Gold", wins: "3+ wins", className: "badge-gold" },
    { name: "Platinum", wins: "5+ wins", className: "badge-platinum" },
    { name: "Diamond", wins: "10+ wins", className: "badge-diamond" },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      <div className="hero-gradient-primary py-16 md:py-20">
        <div className="page-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-400 rounded-full mb-6">
              <FaTrophy className="text-4xl text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Leaderboard
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              See who's leading the pack in our global contest rankings
            </p>
          </motion.div>
        </div>
      </div>

      <div className="content-container py-12 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          <div className="stat-card">
            <div className="stat-card-icon icon-bg-cyan">
              <FaUsers className="text-2xl text-cyan-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{leaderboard.length}</p>
              <p className="text-sm text-gray-500">Total Winners</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon icon-bg-amber">
              <FaTrophy className="text-2xl text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalWins}</p>
              <p className="text-sm text-gray-500">Total Wins</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon icon-bg-green">
              <FaDollarSign className="text-2xl text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                ${totalPrize.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">Prize Distributed</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-base-200 rounded-xl p-4 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-10"
              />
            </div>

            <div className="flex bg-base-300 rounded-lg p-1">
              {timeFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setTimeFilter(filter.value)}
                  className={`filter-tab ${
                    timeFilter === filter.value
                      ? "btn-gradient-primary-static text-white"
                      : "filter-tab-inactive"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-base-200 rounded-xl overflow-hidden"
        >
          {isLoading ? (
            <div className="p-6">
              <SkeletonLoader type="table" count={10} />
            </div>
          ) : filteredLeaderboard.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table">
                <thead className="table-header">
                  <tr>
                    <th className="text-center">Rank</th>
                    <th>User</th>
                    <th className="text-center">Wins</th>
                    <th className="text-center">Prize Won</th>
                    <th className="text-center">Badge</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeaderboard.map((user, index) => {
                    const rank = index + 1;
                    const badge = getBadge(user.winCount);

                    return (
                      <motion.tr
                        key={user._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className={`hover ${rank <= 3 ? "bg-base-100" : ""}`}
                      >
                        <td className="text-center">
                          <div
                            className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold ${getRankStyle(
                              rank
                            )}`}
                          >
                            {rank === 1 ? (
                              <FaCrown className="text-lg" />
                            ) : (
                              rank
                            )}
                          </div>
                        </td>

                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div
                                className={`w-12 h-12 rounded-full ring-2 ${getRingColor(
                                  rank
                                )}`}
                              >
                                <img
                                  src={
                                    user.userPhoto ||
                                    "https://i.ibb.co.com/mC3FBP9V/user-placeholder.jpg"
                                  }
                                  alt={user.userName}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-semibold">
                                {user.userName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {user._id}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="text-center">
                          <div className="flex flex-col items-center">
                            <span className="text-xl font-bold text-cyan-600">
                              {user.winCount}
                            </span>
                            <span className="text-xs text-gray-500">
                              {user.winCount === 1 ? "win" : "wins"}
                            </span>
                          </div>
                        </td>

                        <td className="text-center">
                          <span className="font-semibold text-green-600">
                            ${(user.totalPrize || 0).toLocaleString()}
                          </span>
                        </td>

                        <td className="text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${badge.className}`}
                          >
                            {badge.icon}
                            {badge.name}
                          </span>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-2">
                {searchTerm ? "No Players Found" : "No Winners Yet"}
              </h3>
              <p className="text-gray-500">
                {searchTerm
                  ? "Try a different search term"
                  : "Be the first to win a contest and claim the top spot!"}
              </p>
            </div>
          )}
        </motion.div>

        {filteredLeaderboard.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-sm text-gray-500"
          >
            Showing {filteredLeaderboard.length} of {leaderboard.length} players
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-base-200 rounded-xl p-6"
        >
          <h3 className="font-bold mb-4 text-center">Badge Levels</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {badgeLevels.map((badge) => (
              <div key={badge.name} className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${badge.className}`}
                >
                  {badge.name}
                </span>
                <span className="text-sm text-gray-500">{badge.wins}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;
