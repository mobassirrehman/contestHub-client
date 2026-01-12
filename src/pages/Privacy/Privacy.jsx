import { motion } from "framer-motion";
import { FaShieldAlt, FaCheckCircle } from "react-icons/fa";

const Privacy = () => {
  const sections = [
    {
      title: "1. Information We Collect",
      content:
        "We collect information you provide directly, including your name, email address, profile photo, and payment information. We also collect usage data such as pages visited, features used, and contest participation history.",
    },
    {
      title: "2. How We Use Your Information",
      content:
        "Your information is used to provide and improve our services, process payments, communicate with you about contests and updates, ensure platform security, and comply with legal obligations.",
    },
    {
      title: "3. Information Sharing",
      content:
        "We do not sell your personal information. We may share data with service providers (payment processors, hosting), contest creators (for winner selection), and when required by law. Your contest submissions may be publicly visible.",
    },
    {
      title: "4. Data Security",
      content:
        "We implement industry-standard security measures including SSL encryption, secure servers, and regular security audits. However, no method of transmission over the Internet is 100% secure.",
    },
    {
      title: "5. Cookies and Tracking",
      content:
        "We use cookies to maintain your session, remember preferences, and analyze platform usage. You can control cookie settings in your browser, though some features may not function properly without cookies.",
    },
    {
      title: "6. Your Rights",
      content:
        "You have the right to access, correct, or delete your personal data. You can export your data, opt out of marketing communications, and request account deletion. Contact us to exercise these rights.",
    },
    {
      title: "7. Data Retention",
      content:
        "We retain your data as long as your account is active or as needed to provide services. Contest submission data may be retained longer for legal and operational purposes. You can request deletion at any time.",
    },
    {
      title: "8. Children's Privacy",
      content:
        "ContestHub is not intended for children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us.",
    },
    {
      title: "9. International Data Transfers",
      content:
        "Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers in compliance with applicable data protection laws.",
    },
    {
      title: "10. Changes to This Policy",
      content:
        "We may update this privacy policy periodically. We will notify you of significant changes via email or platform notification. Continued use after changes constitutes acceptance.",
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
              <FaShieldAlt />
              <span>Your Privacy Matters</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              We are committed to protecting your privacy. This policy explains
              how we collect, use, and safeguard your information.
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
          {/* Quick Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-6 mb-8"
          >
            <h2 className="text-lg font-bold text-cyan-600 mb-3">
              Privacy at a Glance
            </h2>
            <ul className="space-y-2 text-base-content/70">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-cyan-500 flex-shrink-0" />
                We never sell your personal data
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-cyan-500 flex-shrink-0" />
                Your data is encrypted and securely stored
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-cyan-500 flex-shrink-0" />
                You can delete your account and data anytime
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-cyan-500 flex-shrink-0" />
                We're GDPR compliant
              </li>
            </ul>
          </motion.div>

          {/* Sections */}
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
            <h3 className="text-xl font-bold mb-4">Privacy Concerns?</h3>
            <p className="text-base-content/60 mb-6">
              If you have any questions about how we handle your data or want to
              exercise your privacy rights, please contact our privacy team.
            </p>
            <a
              href="mailto:privacy@contesthub.com"
              className="btn btn-gradient-primary"
            >
              Contact Privacy Team
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
