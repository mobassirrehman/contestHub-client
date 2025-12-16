import { useState } from "react";
import { Link } from "react-router";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaPaperPlane,
  FaRegHeart,
  FaCheck,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "../../components/Logo/Logo";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const quickLinks = [
    { to: "/all-contests", label: "All Contests" },
    { to: "/leaderboard", label: "Leaderboard" },
    { to: "/become-creator", label: "Become Creator" },
    { to: "/faq", label: "FAQ" },
  ];

  const contestTypes = [
    { to: "/all-contests?type=image-design", label: "Image Design" },
    { to: "/all-contests?type=article-writing", label: "Article Writing" },
    {
      to: "/all-contests?type=marketing-strategy",
      label: "Marketing Strategy",
    },
    { to: "/all-contests?type=digital-art", label: "Digital Art" },
    { to: "/all-contests?type=gaming-review", label: "Gaming Review" },
  ];

  const socialLinks = [
    {
      href: "https://facebook.com",
      icon: <FaFacebook />,
      label: "Facebook",
      hoverColor: "hover:bg-blue-500",
    },
    {
      href: "https://twitter.com",
      icon: <FaXTwitter />,
      label: "Twitter",
      hoverColor: "hover:bg-gray-500",
    },
    {
      href: "https://linkedin.com",
      icon: <FaLinkedin />,
      label: "LinkedIn",
      hoverColor: "hover:bg-blue-500",
    },
    {
      href: "https://instagram.com",
      icon: <FaInstagram />,
      label: "Instagram",
      hoverColor: "hover:bg-pink-500",
    },
  ];

  return (
    <footer className="bg-base-300">
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Stay Updated!
              </h3>
              <p className="text-white/80">
                Subscribe to get notified about new contests and winners
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="w-full lg:w-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="input input-lg pl-12 w-full sm:w-80 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-white/40"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-md sm:btn-lg bg-white text-cyan-600 hover:bg-gray-100 border-none shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  {subscribed ? (
                    <>
                      <FaCheck /> Subscribed!
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Subscribe
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Your gateway to creative competitions. Discover, participate, and
              win exciting contests across multiple categories.
            </p>

            <div className="flex gap-2 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn-sm btn-circle bg-base-100 border-none ${social.hoverColor} transition-colors`}
                  aria-label={social.label}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h6 className="text-lg font-semibold mb-4 text-base-content">
              Quick Links
            </h6>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h6 className="text-lg font-semibold mb-4 text-base-content">
              Contest Types
            </h6>
            <ul className="space-y-3">
              {contestTypes.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h6 className="text-lg font-semibold mb-4 text-base-content">
              Support
            </h6>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/faq"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@contesthub.com"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  support@contesthub.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-base-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
                        <p className="flex flex-wrap items-center justify-center gap-1 text-center sm:text-left sm:justify-start">
              <span>© {new Date().getFullYear()} ContestHub.</span>
              <span>Made by TheGrim</span>

              <span className="inline-flex items-center gap-1">
                <span>with</span>
                <FaRegHeart className="mt-0.5 sm:mt-0" />
              </span>
              

              <span>All rights reserved.</span>
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/terms"
                className="hover:text-cyan-400 transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/privacy"
                className="hover:text-cyan-400 transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/cookies"
                className="hover:text-cyan-400 transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
