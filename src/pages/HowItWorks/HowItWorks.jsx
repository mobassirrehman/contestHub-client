import { motion } from "framer-motion";
import {
  FaUserPlus,
  FaSearch,
  FaCreditCard,
  FaTrophy,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      icon: <FaUserPlus />,
      title: "Create Account",
      description: "Sign up for free and complete your profile to get started.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      step: "02",
      icon: <FaSearch />,
      title: "Browse Contests",
      description: "Explore hundreds of contests across various categories.",
      color: "from-purple-500 to-pink-500",
    },
    {
      step: "03",
      icon: <FaCreditCard />,
      title: "Register & Pay",
      description: "Pay the entry fee securely and get ready to compete.",
      color: "from-orange-500 to-amber-500",
    },
    {
      step: "04",
      icon: <FaTrophy />,
      title: "Win Prizes",
      description: "Submit your work, get selected, and win amazing rewards!",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-cyan-500 uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2 mb-4">
            How It Works
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Getting started is easy! Follow these simple steps to begin your
            journey to becoming a contest champion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-14 left-[60%] w-full h-0.5 bg-gradient-to-r from-base-300 to-transparent z-0">
                  <FaArrowRight className="absolute right-0 -top-2 text-base-300" />
                </div>
              )}

              <div className="relative z-10 text-center">
                <div className="inline-block mb-4">
                  <span className="text-6xl font-bold text-base-300/50">
                    {item.step}
                  </span>
                </div>

                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${item.color} text-white text-3xl shadow-lg mb-6`}
                >
                  {item.icon}
                </motion.div>

                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            to="/register"
            className="btn btn-lg btn-gradient-primary gap-2 group"
          >
            Get Started Now
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
