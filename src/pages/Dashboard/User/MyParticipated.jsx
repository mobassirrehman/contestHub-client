import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaEye,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaPaperPlane,
  FaCalendarAlt,
} from "react-icons/fa";
import SkeletonLoader from "../../../components/Skeletons/Skeletons";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyParticipated = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: participations = [], isLoading } = useQuery({
    queryKey: ["my-participations", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/participants/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const getStatusBadge = (participation) => {
    if (participation.isWinner) {
      return (
        <span className="badge badge-success gap-1">
          <FaTrophy className="text-xs" />
          Winner
        </span>
      );
    }
    if (participation.submittedTask) {
      return (
        <span className="badge badge-info gap-1">
          <FaCheckCircle className="text-xs" />
          Submitted
        </span>
      );
    }
    return (
      <span className="badge badge-warning gap-1">
        <FaClock className="text-xs" />
        Pending
      </span>
    );
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold">
          My Participated Contests
        </h1>
        <p className="text-gray-500 mt-1">
          Track all contests you've registered for
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
      >
        <div className="bg-base-200 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <FaCalendarAlt className="text-2xl text-blue-500" />
          </div>
          <div>
            <p className="text-2xl font-bold">{participations.length}</p>
            <p className="text-sm text-gray-500">Total Registered</p>
          </div>
        </div>
        <div className="bg-base-200 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-lg">
            <FaPaperPlane className="text-2xl text-green-500" />
          </div>
          <div>
            <p className="text-2xl font-bold">
              {participations.filter((p) => p.submittedTask).length}
            </p>
            <p className="text-sm text-gray-500">Submitted</p>
          </div>
        </div>
        <div className="bg-base-200 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-lg">
            <FaTrophy className="text-2xl text-amber-500" />
          </div>
          <div>
            <p className="text-2xl font-bold">
              {participations.filter((p) => p.isWinner).length}
            </p>
            <p className="text-sm text-gray-500">Won</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-base-200 rounded-xl overflow-hidden"
      >
        {isLoading ? (
          <div className="p-6">
            <SkeletonLoader type="table" count={5} />
          </div>
        ) : participations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="bg-base-300">
                <tr>
                  <th>#</th>
                  <th>Contest Name</th>
                  <th>Registered On</th>
                  <th>Status</th>
                  <th>Submission</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {participations.map((participation, index) => (
                  <tr key={participation._id} className="hover">
                    <td className="font-medium">{index + 1}</td>
                    <td>
                      <div className="font-medium">
                        {participation.contestName}
                      </div>
                    </td>
                    <td className="text-gray-500">
                      {new Date(participation.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </td>
                    <td>{getStatusBadge(participation)}</td>
                    <td>
                      {participation.submittedTask ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <FaCheckCircle />
                          Done
                        </span>
                      ) : (
                        <span className="text-orange-500 flex items-center gap-1">
                          <FaTimesCircle />
                          Not yet
                        </span>
                      )}
                    </td>
                    <td>
                      <Link
                        to={`/contest/${participation.contestId}`}
                        className="btn btn-sm btn-ghost text-cyan-600"
                      >
                        <FaEye />
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold mb-2">No Contests Yet</h3>
            <p className="text-gray-500 mb-6">
              You haven't registered for any contests yet.
            </p>
            <Link
              to="/all-contests"
              className="btn btn-gradient-primary text-white border-none"
            >
              Browse Contests
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MyParticipated;
