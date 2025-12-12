import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="text-2xl">🏆</span>
      <span className="text-2xl font-bold font-display tracking-tight">
        Contest
        <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
          Hub
        </span>
      </span>
    </Link>
  );
};

export default Logo;
