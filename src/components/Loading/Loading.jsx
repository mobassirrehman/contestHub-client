import { FaTrophy } from 'react-icons/fa';

const Loading = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-base-100">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-cyan-200 border-t-cyan-500 rounded-full animate-spin"></div>
                <FaTrophy className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-500 text-xl" />
            </div>
            <p className="text-base-content/60 text-sm font-medium">Loading ContestHub...</p>
        </div>
    );
};

export default Loading;