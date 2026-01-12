import { motion } from "framer-motion";
import { FaFileContract, FaCheckCircle } from "react-icons/fa";

const Terms = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using ContestHub, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.",
    },
    {
      title: "2. User Accounts",
      content:
        "To participate in contests, you must create an account with accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.",
    },
    {
      title: "3. Contest Participation",
      content:
        "All contest entries must be original work created by the participant. By submitting an entry, you grant ContestHub a non-exclusive license to display and promote your work. Contest creators have the right to select winners based on their stated criteria.",
    },
    {
      title: "4. Payments and Prizes",
      content:
        "Prize money will be distributed to winners within 48 hours of winner announcement. ContestHub charges a platform fee on contest creation. All payments are processed securely through our payment partners.",
    },
    {
      title: "5. Prohibited Conduct",
      content:
        "Users may not submit plagiarized content, engage in fraudulent activities, manipulate contest results, harass other users, or violate any applicable laws. Violation may result in account termination.",
    },
    {
      title: "6. Intellectual Property",
      content:
        "Contest participants retain ownership of their submissions. However, by submitting, you grant contest creators limited rights as specified in each contest's terms. The ContestHub platform, logo, and content are protected by copyright.",
    },
    {
      title: "7. Limitation of Liability",
      content:
        "ContestHub is not liable for any indirect, incidental, or consequential damages arising from your use of the platform. Our maximum liability is limited to the amount paid by you to ContestHub in the past 12 months.",
    },
    {
      title: "8. Changes to Terms",
      content:
        "We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms. We will notify users of significant changes via email.",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-600 to-purple-600 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 bg-white/10 backdrop-blur-sm border border-white/20">
              <FaFileContract />
              <span>Legal</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Terms of Service
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Please read these terms carefully before using ContestHub. By
              using our platform, you agree to these terms.
            </p>
            <p className="text-white/60 text-sm mt-4">
              Last updated: January 1, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-base-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <FaCheckCircle className="text-cyan-500" />
                  {section.title}
                </h2>
                <p className="text-base-content/70 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center bg-base-200 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold mb-4">
              Questions About Our Terms?
            </h3>
            <p className="text-base-content/60 mb-6">
              If you have any questions about these Terms of Service, please
              contact us.
            </p>
            <a
              href="mailto:legal@contesthub.com"
              className="btn btn-gradient-primary"
            >
              Contact Legal Team
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
