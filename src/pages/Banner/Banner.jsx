import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaSearch, FaTrophy, FaUsers, FaMedal } from "react-icons/fa";

const Banner = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `/all-contests?search=${encodeURIComponent(searchQuery.trim())}`
      );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] bg-gradient-to-br from-slate-900 via-cyan-900 to-blue-900 overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTEgMGExIDEgMCAxIDAgMiAwYTEgMSAwIDEgMCAtMiAwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-40" />
      </div>

      <motion.div
        className="absolute top-32 right-20 hidden lg:block"
        variants={floatVariants}
        animate="animate"
      ></motion.div>

      <motion.div
        className="absolute bottom-40 left-20 hidden lg:block"
        variants={floatVariants}
        animate="animate"
        transition={{ delay: 1 }}
      ></motion.div>

      <motion.div
        className="absolute top-1/2 right-32 hidden xl:block"
        variants={floatVariants}
        animate="animate"
        transition={{ delay: 2 }}
      ></motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 lg:py-32">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-block mb-6">
            <span className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 text-white rounded-full opacity-50 text-sm font-medium">
              The #1 Contest Platform
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Compete. Create.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400">
              Win Amazing Prizes!
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
          >
            Join thousands of creative minds. Participate in exciting contests,
            showcase your talent, and win incredible rewards.
          </motion.p>

          <motion.form
  variants={itemVariants}
  onSubmit={handleSearch}
  className="max-w-2xl mx-auto mb-10 px-2 sm:px-0"
>
  <div className="relative group">
    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-emerald-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
    <div className="relative flex items-center bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 overflow-hidden pr-2">
      <FaSearch className="ml-4 sm:ml-5 text-gray-400 flex-shrink-0" />
      <input
        type="text"
        placeholder="Search contests..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 px-3 sm:px-4 py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base min-w-0"
      />
      <button
        type="submit"
        className="px-4 sm:px-6 py-2 sm:py-3 btn-gradient-primary text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base flex-shrink-0"
      >
        Search
      </button>
    </div>
  </div>
</motion.form>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3"
          >
            <span className="text-gray-400 text-sm">Popular:</span>
            {[
              "Image Design",
              "Article Writing",
              "Digital Art",
              "Gaming Review",
            ].map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  navigate(
                    `/all-contests?type=${tag.toLowerCase().replace(" ", "-")}`
                  )
                }
                className="px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/50 rounded-full text-sm text-gray-300 hover:text-white transition-all duration-300"
              >
                {tag}
              </button>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              { value: "10K+", label: "Active Users" },
              { value: "500+", label: "Contests" },
              { value: "$50K+", label: "Prize Pool" },
              { value: "1K+", label: "Winners" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-base-100"
          />
        </svg>
      </div>
    </section>
  );
};

export default Banner;
