import { useQuery } from "@tanstack/react-query";
/* eslint-disable no-unused-vars */
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  FaTrophy,
  FaUsers,
  FaDollarSign,
  FaMedal,
  FaCrown,
} from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import { MdCelebration } from "react-icons/md";

const AnimatedCounter = ({ end, duration = 2, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min(
          (timestamp - startTime) / (duration * 1000),
          1
        );
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const WinnerSection = () => {
  const axiosPublic = useAxios();

  const { data: stats = {} } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosPublic.get("/stats");
      return res.data;
    },
  });

  const {
    totalContests = 0,
    totalParticipants = 0,
    totalWinners = 0,
    totalPrizeMoney = 0,
    recentWinners = [],
  } = stats;

  const statsData = [
    {
      icon: <FaTrophy className="text-3xl" />,
      value: totalContests,
      label: "Total Contests",
      color: "from-amber-500 to-orange-500",
      suffix: "+",
    },
    {
      icon: <FaUsers className="text-3xl" />,
      value: totalParticipants,
      label: "Participants",
      color: "from-blue-500 to-cyan-500",
      suffix: "+",
    },
    {
      icon: <FaMedal className="text-3xl" />,
      value: totalWinners,
      label: "Happy Winners",
      color: "from-green-500 to-emerald-500",
      suffix: "+",
    },
    {
      icon: <FaDollarSign className="text-3xl" />,
      value: totalPrizeMoney,
      label: "Prize Distributed",
      color: "from-purple-500 to-pink-500",
      prefix: "$",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-emerald-900 to-green-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FaCrown />
            Hall of Fame
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Our Winners Are
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              {" "}
              Extraordinary
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join the league of champions who have showcased their talents and
            won amazing prizes. Your victory story could be next!
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity`}
              />
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center">
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${stat.color} text-white mb-4`}
                >
                  {stat.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                  <AnimatedCounter
                    end={stat.value}
                    prefix={stat.prefix || ""}
                    suffix={stat.suffix || ""}
                  />
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {recentWinners.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              <MdCelebration /> Recent Winners
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {recentWinners.map((winner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2"
                >
                  <img
                    src={
                      winner.winnerPhoto ||
                      "https://i.ibb.co/MgsTCcv/user-placeholder.jpg"
                    }
                    alt={winner.winnerName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-amber-500"
                  />
                  <div>
                    <p className="text-white font-medium text-sm">
                      {winner.winnerName}
                    </p>
                    <p className="text-amber-400 text-xs">
                      Won ${winner.prizeMoney}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">Ready to become a winner?</p>
          <a
            href="/all-contests"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/25"
          >
            <FaTrophy />
            Start Competing Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WinnerSection;
