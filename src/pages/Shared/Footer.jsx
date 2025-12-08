import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";
import Logo from "../../components/Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo></Logo>
            <p className="mt-4 text-sm opacity-80 max-w-xs">
              ContestHub - Your gateway to creative competitions. Discover,
              participate, and win exciting contests.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-circle bg-base-100/10 hover:bg-blue-600 border-none"
                aria-label="Facebook"
              >
                <FaFacebook className="text-lg" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-circle bg-base-100/10 hover:bg-blue-700 border-none"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-lg" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-circle bg-base-100/10 hover:bg-blue-700 border-none"
                aria-label="X (Twitter)"
              >
                <FaXTwitter className="text-lg" />
              </a>
            </div>
          </div>

          <div>
            <h6 className="text-lg font-semibold mb-4">Quick Links</h6>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/all-contests"
                  className="opacity-80 hover:opacity-100 hover:underline transition-opacity"
                >
                  All Contests
                </Link>
              </li>
              <li>
                <Link
                  to="/leaderboard"
                  className="opacity-80 hover:opacity-100 hover:underline transition-opacity"
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="opacity-80 hover:opacity-100 hover:underline transition-opacity"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="opacity-80 hover:opacity-100 hover:underline transition-opacity"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="text-lg font-semibold mb-4">Contest Types</h6>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/all-contests?type=image-design"
                  className="opacity-80 hover:opacity-100 hover:underline transition-opacity"
                >
                  Image Design
                </Link>
              </li>
              <li>
                <Link
                  to="/all-contests?type=article-writing"
                  className="opacity-80 hover:opacity-100 hover:underline transition-opacity"
                >
                  Article Writing
                </Link>
              </li>
              <li>
                <Link
                  to="/all-contests?type=marketing-strategy"
                  className="opacity-80 hover:opacity-100 hover:underline transition-opacity"
                >
                  Marketing Strategy
                </Link>
              </li>
              <li>
                <Link
                  to="/all-contests?type=digital-art"
                  className="opacity-80 hover:opacity-100 hover:underline transition-opacity"
                >
                  Digital Art
                </Link>
              </li>
              <li>
                <Link
                  to="/all-contests?type=gaming-review"
                  className="opacity-80 hover:opacity-100 hover:underline transition-opacity"
                >
                  Gaming Review
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="text-lg font-semibold mb-4">Support</h6>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/faq"
                  className="opacity-80 hover:opacity-100 hover:underline transition-opacity"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="opacity-80 hover:opacity-100 hover:underline transition-opacity"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="opacity-80 hover:opacity-100 hover:underline transition-opacity"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@contesthub.com"
                  className="opacity-80 hover:opacity-100 hover:underline transition-opacity"
                >
                  support@contesthub.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-base-100/20"></div>

        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="opacity-80">
            Copyright © {new Date().getFullYear()} ContestHub. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <Link
              to="/terms"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              Privacy
            </Link>
            <Link
              to="/cookies"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
