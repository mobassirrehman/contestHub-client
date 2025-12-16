import { Link } from "react-router";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4">
      <div className="text-center">
        <div className="text-9xl font-bold text-cyan-400 opacity-30">404</div>

        <h1 className="text-4xl font-bold mt-4">Page Not Found</h1>

        <p className="text-gray-500 mt-4 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>

        <div className="mt-8">
          <Link
            to="/"
            className="btn text-white btn-gradient-primary gap-2"
          >
            <FaHome />
            Back to Home
          </Link>
        </div>
        <div className="mt-12 flex justify-center gap-4 opacity-30">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-secondary rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-accent rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
