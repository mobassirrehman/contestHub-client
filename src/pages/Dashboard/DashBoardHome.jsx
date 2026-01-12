import { Link } from "react-router";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  FaTrophy,
  FaClipboardList,
  FaPaperPlane,
  FaDollarSign,
  FaArrowRight,
  FaPlus,
  FaSearch,
  FaChartLine,
  FaClock,
  FaMedal,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();

  // Fetch user's participation data
  const { data: participatedContests = [] } = useQuery({
    queryKey: ["participated", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/participants/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch user's winning data
  const { data: winningData = [] } = useQuery({
    queryKey: ["winnings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/winners/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Calculate stats
  const totalParticipated = participatedContests.length;
  const totalSubmitted = participatedContests.filter(
    (c) => c.submittedTask
  ).length;
  const totalWon = winningData.length;
  const totalEarnings = winningData.reduce(
    (sum, win) => sum + (win.prizeMoney || 0),
    0
  );

  // Stats cards data
  const statsCards = [
    {
      title: "Contests Joined",
      value: totalParticipated,
      icon: FaClipboardList,
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      title: "Submissions",
      value: totalSubmitted,
      icon: FaPaperPlane,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Contests Won",
      value: totalWon,
      icon: FaTrophy,
      gradient: "from-amber-500 to-orange-500",
    },
    {
      title: "Total Earnings",
      value: `$${totalEarnings.toLocaleString()}`,
      icon: FaDollarSign,
      gradient: "from-emerald-500 to-green-500",
    },
  ];

  // Monthly activity data for bar chart
  const monthlyData = [
    { month: "Jan", participated: 4, won: 1 },
    { month: "Feb", participated: 6, won: 2 },
    { month: "Mar", participated: 8, won: 1 },
    { month: "Apr", participated: 5, won: 2 },
    { month: "May", participated: 9, won: 3 },
    { month: "Jun", participated: 7, won: 2 },
  ];

  // Category breakdown for pie chart
  const categoryData = [
    { name: "Image Design", value: 35, color: "#ec4899" },
    { name: "Article Writing", value: 25, color: "#8b5cf6" },
    { name: "Web Dev", value: 20, color: "#06b6d4" },
    { name: "Gaming", value: 12, color: "#f59e0b" },
    { name: "Photography", value: 8, color: "#10b981" },
  ];

  // Recent contests (from participated)
  const recentContests = participatedContests.slice(0, 5);

  // Quick actions based on role
  const quickActions = [
    {
      title: "Browse Contests",
      description: "Find new competitions",
      icon: FaSearch,
      link: "/all-contests",
      color: "cyan",
    },
    {
      title: "My Submissions",
      description: "View your entries",
      icon: FaClipboardList,
      link: "/dashboard/my-participated",
      color: "purple",
    },
    {
      title: "Leaderboard",
      description: "Check rankings",
      icon: FaMedal,
      link: "/leaderboard",
      color: "amber",
    },
    ...(role === "creator" || role === "admin"
      ? [
          {
            title: "Create Contest",
            description: "Host a new competition",
            icon: FaPlus,
            link: "/dashboard/add-contest",
            color: "emerald",
          },
        ]
      : []),
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl p-6 lg:p-8 text-white"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              {getGreeting()}, {user?.displayName?.split(" ")[0] || "User"}!
            </h1>
            <p className="text-white/80">
              Welcome back to your dashboard. Here's what's happening with your
              contests.
            </p>
          </div>
          <Link
            to="/all-contests"
            className="btn bg-white/20 hover:bg-white/30 border-none text-white backdrop-blur-sm"
          >
            <FaSearch />
            Find Contests
          </Link>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
      >
        {statsCards.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-base-200 rounded-2xl p-5 flex items-center gap-4 hover:shadow-lg transition-shadow"
          >
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-lg`}
            >
              <stat.icon className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-base-content/60">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Monthly Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-base-200 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold">Monthly Activity</h3>
              <p className="text-sm text-base-content/60">
                Your contest participation over time
              </p>
            </div>
            <FaChartLine className="text-2xl text-cyan-500" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
                opacity={0.3}
              />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Legend />
              <Bar
                dataKey="participated"
                fill="#06b6d4"
                name="Participated"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="won"
                fill="#f59e0b"
                name="Won"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart - Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-base-200 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold">Category Breakdown</h3>
              <p className="text-sm text-base-content/60">
                Contests by category type
              </p>
            </div>
            <FaTrophy className="text-2xl text-amber-500" />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <ResponsiveContainer
              width="100%"
              height={200}
              className="sm:w-[60%]"
            >
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2 w-full sm:w-auto">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-base-content/70">{item.name}</span>
                  <span className="ml-auto font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Contests & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Contests Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-base-200 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold">Recent Contests</h3>
              <p className="text-sm text-base-content/60">
                Your latest contest activities
              </p>
            </div>
            <Link
              to="/dashboard/my-participated"
              className="text-cyan-500 hover:text-cyan-600 text-sm font-medium flex items-center gap-1"
            >
              View All <FaArrowRight className="text-xs" />
            </Link>
          </div>

          {recentContests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="text-base-content/60">
                    <th>Contest</th>
                    <th>Status</th>
                    <th className="hidden sm:table-cell">Date</th>
                    <th>Prize</th>
                  </tr>
                </thead>
                <tbody>
                  {recentContests.map((contest, index) => (
                    <tr key={index} className="hover:bg-base-300/50">
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar hidden sm:block">
                            <div className="w-10 h-10 rounded-xl">
                              <img
                                src={
                                  contest.contestImage ||
                                  "https://placehold.co/100x100?text=Contest"
                                }
                                alt={contest.contestName}
                              />
                            </div>
                          </div>
                          <div>
                            <p className="font-medium truncate max-w-[120px] sm:max-w-[150px]">
                              {contest.contestName}
                            </p>
                            <p className="text-xs text-base-content/60">
                              {contest.contestType}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge badge-sm ${
                            contest.isWinner
                              ? "badge-success"
                              : contest.submittedTask
                              ? "badge-info"
                              : "badge-warning"
                          }`}
                        >
                          {contest.isWinner
                            ? "Winner"
                            : contest.submittedTask
                            ? "Submitted"
                            : "Pending"}
                        </span>
                      </td>
                      <td className="text-sm text-base-content/60 hidden sm:table-cell">
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt className="text-xs" />
                          {new Date(contest.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="font-medium text-emerald-500">
                        ${contest.prizeMoney?.toLocaleString() || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-4xl mb-3">🎯</p>
              <p className="text-base-content/60 mb-4">
                No contests joined yet
              </p>
              <Link to="/all-contests" className="btn btn-sm btn-outline-cyan">
                Browse Contests
              </Link>
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-base-200 rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-base-300 transition-colors group"
              >
                <div
                  className={`p-3 rounded-xl bg-${action.color}-500/10 group-hover:bg-${action.color}-500/20 transition-colors`}
                >
                  <action.icon className={`text-${action.color}-500`} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{action.title}</p>
                  <p className="text-xs text-base-content/60">
                    {action.description}
                  </p>
                </div>
                <FaArrowRight className="text-xs text-base-content/40 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>

          {/* Upcoming Deadline Alert */}
          <div className="mt-6 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
            <div className="flex items-start gap-3">
              <FaClock className="text-amber-500 mt-1" />
              <div>
                <p className="font-medium text-amber-600">Upcoming Deadline</p>
                <p className="text-sm text-base-content/60 mt-1">
                  You have contests ending soon. Don't forget to submit!
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHome;
