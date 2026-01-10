import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaBolt,
  FaHandHoldingUsd,
  FaHeadset,
  FaChartLine,
  FaGlobe,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const WhyChooseUs = () => {
  const features = [
    {
      icon: FaShieldAlt,
      title: "Secure & Transparent",
      description:
        "All contests are verified and monitored. Fair judging criteria with transparent winner selection process.",
      color: "cyan",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: FaBolt,
      title: "Instant Payouts",
      description:
        "Winners receive their prizes within 24-48 hours. Multiple withdrawal options including bank transfer and PayPal.",
      color: "amber",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: FaHandHoldingUsd,
      title: "Low Platform Fees",
      description:
        "Keep more of what you earn. Our competitive fees ensure creators and winners get maximum value.",
      color: "emerald",
      gradient: "from-emerald-500 to-green-500",
    },
    {
      icon: FaHeadset,
      title: "24/7 Support",
      description:
        "Our dedicated support team is always ready to help. Get assistance via chat, email, or phone anytime.",
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: FaChartLine,
      title: "Growth Analytics",
      description:
        "Track your performance with detailed analytics. Monitor participation, wins, and earnings over time.",
      color: "blue",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: FaGlobe,
      title: "Global Community",
      description:
        "Connect with creative professionals worldwide. Participate in contests from anywhere in the world.",
      color: "rose",
      gradient: "from-rose-500 to-pink-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section className="section-padding bg-base-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="page-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <div className="section-badge bg-cyan-500/10 text-cyan-500">
            <HiSparkles />
            <span>Why ContestHub</span>
          </div>
          <h2 className="section-title">
            Everything You Need to{" "}
            <span className="text-gradient-primary">Succeed</span>
          </h2>
          <p className="section-subtitle">
            We've built the most comprehensive contest platform with features
            designed to help you win, grow, and earn.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="feature-card group"
            >
              {/* Icon */}
              <div
                className={`feature-icon bg-gradient-to-br ${feature.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="text-2xl" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-2 text-base-content group-hover:text-cyan-500 transition-colors">
                {feature.title}
              </h3>
              <p className="text-base-content/60 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover indicator */}
              <div
                className={`mt-4 h-1 w-0 group-hover:w-16 bg-gradient-to-r ${feature.gradient} rounded-full transition-all duration-300`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl p-8 lg:p-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-white text-center">
            {[
              { value: "99.9%", label: "Uptime" },
              { value: "<2hrs", label: "Avg. Response Time" },
              { value: "150+", label: "Countries" },
              { value: "4.9★", label: "User Rating" },
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-3xl lg:text-4xl font-bold mb-1">
                  {stat.value}
                </p>
                <p className="text-white/80 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;