import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import Logo from "../../components/Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="footer flex justify-between py-10">
          <aside>
            <Logo></Logo>
            <p className="mt-2 max-w-xs">
              ContestHub - Your gateway to creative competitions. Discover,
              participate, and win exciting contests.
            </p>
          </aside>
          <nav>
            <h6 className="footer-title">Quick Links</h6>
            <a className="link link-hover">All Contests</a>
            <a className="link link-hover">Leaderboard</a>
            <a className="link link-hover">How It Works</a>
            <a className="link link-hover">Contact Us</a>
          </nav>
          <nav>
            <h6 className="footer-title">Contest Types</h6>
            <a className="link link-hover">Image Design</a>
            <a className="link link-hover">Article Writing</a>
            <a className="link link-hover">Marketing Strategy</a>
            <a className="link link-hover">Digital Art</a>
          </nav>
          <nav>
            <h6 className="footer-title">Connect With Us</h6>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-circle"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-circle"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-circle"
              >
                <FaTwitter className="text-xl" />
              </a>
            </div>
          </nav>
        </div>
        <div className="footer footer-center py-4 border-t border-base-300">
          <p>
            Copyright © {new Date().getFullYear()} ContestHub. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
