import { Link } from 'react-router';
import { FaLock } from 'react-icons/fa';

const Forbidden = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <FaLock className="text-6xl text-error mb-4" />
            <h1 className="text-4xl font-bold mb-2">Access Denied</h1>
            <p className="text-gray-500 mb-6">
                You don't have permission to access this page.
            </p>
            <Link to="/" className="btn text-cyan-500">
                Go Back Home
            </Link>
        </div>
    );
};

export default Forbidden;