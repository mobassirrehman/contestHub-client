import { motion } from "framer-motion";
import { FaRocket, FaTrophy } from "react-icons/fa";
import { Link } from "react-router";
import { FaCheck } from "react-icons/fa6";

const CTASection = () => {
  return (
    <section className="py-16 lg:py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTI4IDBhMjggMjggMCAxIDAgNTYgMGEyOCAyOCAwIDEgMCAtNTYgMCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9zdmc+')]" />
          </div>

          <motion.div
            className="absolute top-10 left-10 text-white/20 text-6xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          ></motion.div>
          <motion.div
            className="absolute bottom-10 right-10 text-white/20 text-6xl"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity }}
          ></motion.div>

          <div className="relative z-10 px-6 py-16 lg:px-16 lg:py-20 text-center text-white">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-5xl font-bold mb-6"
            >
              Ready to Showcase
              <br />
              Your Talent?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg lg:text-xl opacity-90 max-w-2xl mx-auto mb-10"
            >
              Join thousands of creators and compete in exciting contests. Start
              your journey today and win amazing prizes!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/all-contests"
                className="btn btn-lg bg-white text-primary hover:bg-gray-100 border-none shadow-lg"
              >
                <FaTrophy />
                Browse Contests
              </Link>
              <Link
                to="/register"
                className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary"
              >
                <FaRocket />
                Create Account
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-12 flex flex-wrap justify-center gap-6 text-sm opacity-80"
            >
              <span className="flex items-center gap-2">
                <FaCheck /> Free to Join
              </span>
              <span className="flex items-center gap-2">
                <FaCheck /> Secure Payments
              </span>
              <span className="flex items-center gap-2">
                <FaCheck /> Instant Withdrawals
              </span>
              <span className="flex items-center gap-2">
                <FaCheck /> 24/7 Support
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
