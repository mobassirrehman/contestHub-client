import { Link } from "react-router";
import { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaPaperPlane,
  FaRegHeart,
} from "react-icons/fa";
import Logo from "../../components/Logo/Logo";
import Swal from "sweetalert2";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      Swal.fire({
        icon: "success",
        title: "Subscribed!",
        text: "Thank you for subscribing to our newsletter.",
        confirmButtonColor: "#06b6d4",
        timer: 3000,
      });
      setEmail("");
    }
  };

  const quickLinks = [
    { to: "/all-contests", label: "All Contests" },
    { to: "/leaderboard", label: "Leaderboard" },
    { to: "/become-creator", label: "Become Creator" },
    { to: "/about", label: "About Us" },
    { to: "/faq", label: "FAQ" },
  ];

  const contestTypes = [
    { to: "/all-contests?type=image-design", label: "Image Design" },
    { to: "/all-contests?type=article-writing", label: "Article Writing" },
    {
      to: "/all-contests?type=marketing-strategy",
      label: "Marketing Strategy",
    },
    { to: "/all-contests?type=web-development", label: "Web Development" },
    { to: "/all-contests?type=gaming-review", label: "Gaming Review" },
    { to: "/all-contests?type=photography", label: "Photography" },
  ];

  const supportLinks = [
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact Us" },
    { to: "/terms", label: "Terms of Service" },
    { to: "/privacy", label: "Privacy Policy" },
    { href: "mailto:support@contesthub.com", label: "support@contesthub.com" },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  ];

  return (
    <footer className="bg-base-200">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-cyan-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-white text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-2">Stay Updated!</h3>
              <p className="text-white/80">
                Subscribe to get notified about new contests and winners
              </p>
            </div>
            <form onSubmit={handleNewsletter} className="flex w-full max-w-md">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                  ✉️
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 rounded-l-xl rounded-r-none focus:outline-none focus:ring-2 focus:ring-white/30"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn bg-white text-cyan-600 hover:bg-cyan-50 border-none rounded-l-none rounded-r-xl px-6"
              >
                <FaPaperPlane />
                <span className="hidden sm:inline">Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 text-base-content/60 text-sm leading-relaxed">
              Your gateway to creative competitions. Discover, participate, and
              win exciting contests across multiple categories.
            </p>
            <div className="flex gap-2 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-base-300 flex items-center justify-center text-base-content/60 hover:bg-cyan-500 hover:text-white transition-all"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-base-content mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-base-content/60 hover:text-cyan-500 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contest Types */}
          <div>
            <h4 className="font-bold text-base-content mb-4">Contest Types</h4>
            <ul className="space-y-3">
              {contestTypes.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-base-content/60 hover:text-cyan-500 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-base-content mb-4">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  {link.to ? (
                    <Link
                      to={link.to}
                      className="text-base-content/60 hover:text-cyan-500 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-base-content/60 hover:text-cyan-500 transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-300">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-base-content/60">
              © {new Date().getFullYear()} ContestHub. Made by TheGrim with{" "}
              <FaRegHeart className="inline" /> All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/terms"
                className="text-sm text-base-content/60 hover:text-cyan-500 transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/privacy"
                className="text-sm text-base-content/60 hover:text-cyan-500 transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/contact"
                className="text-sm text-base-content/60 hover:text-cyan-500 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
