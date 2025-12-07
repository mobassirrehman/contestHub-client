import { Link } from "react-router";
import { FaTrophy } from "react-icons/fa";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <FaTrophy className="text-2xl text-primary" />
      <span className="text-xl font-bold">
        Contest<span className="text-primary">Hub</span>
      </span>
    </Link>
  );
};

export default Logo;
