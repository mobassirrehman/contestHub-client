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
    { to: "/all-contests?type=marketing-strategy", label: "Marketing Strategy" },
    { to: "/all-contests?type=web-development", label: "Web Development" },
    { to: "/all-contests?type=gaming-review", label: "Gaming Review" },
    { to: "/all-contests?type=photography", label: "Photography" },
  ];

  const supportLinks = [
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact Us" },
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Privacy Policy" },
    { href: "mailto:support@contesthub.com", label: "support@contesthub.com" },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="bg-base-200">
      <div className="newsletter-gradient">
        <div className="page-container py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-white text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-2">Stay Updated!</h3>
              <p className="text-white/80">
                Subscribe to get notified about new contests and winners
              </p>
            </div>
            <form
              onSubmit={handleNewsletter}
              className="flex w-full max-w-md"
            >
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                  ✉️
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 newsletter-input border-r-0 rounded-l-xl rounded-r-none"
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

      <div className="page-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
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
                  aria-label={social.label}
                  className="social-btn"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.to} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Contest Types</h4>
            <ul className="space-y-3">
              {contestTypes.map((link, index) => (
                <li key={index}>
                  <Link to={link.to} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  {link.to ? (
                    <Link to={link.to} className="footer-link">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="footer-link">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-base-300">
        <div className="page-container py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-base-content/60">
              © {new Date().getFullYear()} ContestHub. Made by TheGrim with{" "}
              <FaRegHeart className="inline" /> All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-base-content/60 hover:text-cyan-500 transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-base-content/60 hover:text-cyan-500 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-base-content/60 hover:text-cyan-500 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;