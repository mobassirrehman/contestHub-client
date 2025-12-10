import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaQuestionCircle,
  FaChevronDown,
  FaTrophy,
  FaUsers,
  FaCreditCard,
  FaShieldAlt,
  FaHeadset,
} from "react-icons/fa";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqCategories = [
    {
      icon: <FaTrophy className="text-cyan-500" />,
      title: "Contests",
      faqs: [
        {
          question: "How do I participate in a contest?",
          answer:
            "To participate in a contest, simply browse our available contests, select one that interests you, pay the entry fee using our secure payment system, and submit your work before the deadline. Make sure to read the task instructions carefully!",
        },
        {
          question: "What types of contests are available?",
          answer:
            "ContestHub offers various contest types including Image Design, Article Writing, Marketing Strategy, Web Development, Gaming Reviews, and Photography. Each category has unique challenges and prize pools.",
        },
        {
          question: "How are winners selected?",
          answer:
            "Winners are selected by the contest creator based on the quality of submissions. The creator reviews all entries after the deadline and declares the winner. The winner receives the prize money directly.",
        },
        {
          question: "Can I participate in multiple contests?",
          answer:
            "Absolutely! You can participate in as many contests as you like. Each contest requires a separate entry fee, and you can track all your participations from your dashboard.",
        },
      ],
    },
    {
      icon: <FaCreditCard className="text-green-500" />,
      title: "Payments",
      faqs: [
        {
          question: "How do I pay for contest entry?",
          answer:
            "We use Stripe for secure payments. When you click \"Register Now\" on a contest page, you'll be redirected to Stripe's secure checkout. We accept all major credit and debit cards.",
        },
        {
          question: "How do winners receive their prize money?",
          answer:
            "Prize money is transferred to winners through our payment system. After being declared a winner, you'll receive instructions on how to claim your prize. Processing typically takes 3-5 business days.",
        },
        {
          question: "Are there any hidden fees?",
          answer:
            "No hidden fees! The entry fee displayed on each contest page is the total amount you pay. Winners receive the full prize money as advertised.",
        },
        {
          question: "Can I get a refund?",
          answer:
            "Entry fees are non-refundable once paid, as they go towards the prize pool. However, if a contest is cancelled by the creator or admin, full refunds will be processed automatically.",
        },
      ],
    },
    {
      icon: <FaUsers className="text-purple-500" />,
      title: "Account & Roles",
      faqs: [
        {
          question: "What are the different user roles?",
          answer:
            "ContestHub has three roles: Users (can participate in contests), Creators (can create and manage contests), and Admins (manage the platform). New accounts start as Users.",
        },
        {
          question: "How do I become a Contest Creator?",
          answer:
            'Visit our "Become a Creator" page and submit your application. Our admin team will review your request and upgrade your account if approved. Creators can then create and manage their own contests.',
        },
        {
          question: "Can I update my profile information?",
          answer:
            'Yes! Go to your Dashboard and click on "My Profile" to update your display name and profile photo. Your email cannot be changed as it\'s linked to your account.',
        },
        {
          question: "How do I track my contest history?",
          answer:
            'Your Dashboard provides complete tracking. "My Participated Contests" shows all contests you\'ve entered, and "My Winning Contests" displays your victories with statistics.',
        },
      ],
    },
    {
      icon: <FaShieldAlt className="text-amber-500" />,
      title: "Rules & Guidelines",
      faqs: [
        {
          question: "What are the submission guidelines?",
          answer:
            "Each contest has specific task instructions provided by the creator. Follow them carefully. Submissions must be original work, submitted before the deadline, and in the requested format.",
        },
        {
          question: "What happens if I miss the deadline?",
          answer:
            "Unfortunately, late submissions are not accepted. The system automatically closes submissions at the deadline. Make sure to submit your work with time to spare!",
        },
        {
          question: "Can I edit my submission?",
          answer:
            "Currently, submissions cannot be edited after being submitted. Please review your work carefully before submitting. If absolutely necessary, contact the contest creator.",
        },
        {
          question: "What if I suspect cheating?",
          answer:
            "We take fair play seriously. If you suspect plagiarism or cheating, report it to our admin team through the contact form. We investigate all reports thoroughly.",
        },
      ],
    },
  ];

  const toggleFaq = (categoryIndex, faqIndex) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-base-100">
      <div className="bg-gradient-to-br from-slate-900 via-cyan-900 to-blue-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <FaQuestionCircle className="text-cyan-400" />
              <span className="text-white/80 text-sm">Help Center</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Frequently Asked{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Questions
              </span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Find answers to common questions about ContestHub, contests,
              payments, and more.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="bg-base-200 rounded-2xl overflow-hidden"
            >
              <div className="bg-base-300 px-6 py-4 flex items-center gap-3">
                {category.icon}
                <h2 className="text-xl font-bold">{category.title}</h2>
              </div>

              <div className="divide-y divide-base-300">
                {category.faqs.map((faq, faqIndex) => {
                  const isOpen = openIndex === `${categoryIndex}-${faqIndex}`;

                  return (
                    <div key={faqIndex}>
                      <button
                        onClick={() => toggleFaq(categoryIndex, faqIndex)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-base-300/50 transition-colors"
                      >
                        <span className="font-medium pr-4">{faq.question}</span>
                        <FaChevronDown
                          className={`text-gray-400 transition-transform flex-shrink-0 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-4 text-gray-600">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-8 text-center text-white"
        >
          <FaHeadset className="text-4xl mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
          <p className="opacity-90 mb-6">
            Can't find what you're looking for? Our support team is here to
            help!
          </p>
          <a
            href="mailto:support@contesthub.com"
            className="btn bg-white text-cyan-600 hover:bg-gray-100 border-none"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
