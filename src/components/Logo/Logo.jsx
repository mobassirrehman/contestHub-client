import { Link } from "react-router";
import { FaTrophy } from "react-icons/fa";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <FaTrophy className="text-2xl text-cyan-600" />
      <span className="text-2xl font-bold">
        Contest
        <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
          Hub
        </span>
      </span>
    </Link>
  );
};

export default Logo;
