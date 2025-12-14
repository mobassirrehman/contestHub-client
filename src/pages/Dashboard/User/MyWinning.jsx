import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaTrophy, FaEye, FaMedal, FaDollarSign } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SkeletonLoader from "../../../components/Skeletons/Skeletons";

const MyWinning = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: winnings = [], isLoading } = useQuery({
    queryKey: ["my-winnings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/winners/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: participations = [] } = useQuery({
    queryKey: ["my-participations-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/participants/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const totalParticipated = participations.length;
  const totalWins = winnings.length;
  const winRate =
    totalParticipated > 0
      ? ((totalWins / totalParticipated) * 100).toFixed(1)
      : 0;

  const chartData = [
    { name: "Won", value: totalWins, color: "#10B981" },
    {
      name: "Participated",
      value: totalParticipated - totalWins,
      color: "#3B82F6",
    },
  ];

  const hasChartData = totalParticipated > 0;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          My Winning Contests
        </h1>
        <p className="text-gray-500 mt-1">
          Celebrate your victories and achievements
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl p-5 text-white">
            <FaTrophy className="text-3xl mb-3 opacity-80" />
            <p className="text-3xl font-bold">{totalWins}</p>
            <p className="text-sm opacity-80">Total Wins</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-5 text-white">
            <FaMedal className="text-3xl mb-3 opacity-80" />
            <p className="text-3xl font-bold">{winRate}%</p>
            <p className="text-sm opacity-80">Win Rate</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-5 text-white col-span-2">
            <FaDollarSign className="text-3xl mb-3 opacity-80" />
            <p className="text-3xl font-bold">
              ${winnings.reduce((acc, w) => acc + (w.prizeMoney || 0), 0)}
            </p>
            <p className="text-sm opacity-80">Total Prize Money Won</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-base-200 rounded-xl p-5"
        >
          <h3 className="font-bold mb-4">Win vs Participation</h3>
          {hasChartData ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-gray-500">
              <p>No data to display yet</p>
            </div>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-bold mb-4">🏆 Your Victories</h3>

        {isLoading ? (
          <SkeletonLoader type="table" count={3} />
        ) : winnings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {winnings.map((winning, index) => (
              <motion.div
                key={winning._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-base-200 rounded-xl p-5 border-l-4 border-amber-500"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-amber-500 text-xl">🏆</span>
                      <h4 className="font-bold">{winning.contestName}</h4>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">
                      Won on{" "}
                      {new Date(
                        winning.submittedAt || winning.createdAt
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="badge badge-success">Winner</span>
                      {winning.prizeMoney && (
                        <span className="text-green-600 font-bold">
                          +${winning.prizeMoney}
                        </span>
                      )}
                    </div>
                  </div>
                  <Link
                    to={`/contest/${winning.contestId}`}
                    className="btn btn-sm btn-ghost text-cyan-600"
                  >
                    <FaEye />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-base-200 rounded-xl">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">No Wins Yet</h3>
            <p className="text-gray-500 mb-6">
              Keep participating and your first win is coming!
            </p>
            <Link
              to="/all-contests"
              className="btn btn-gradient-primary"
            >
              Find Contests
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MyWinning;
