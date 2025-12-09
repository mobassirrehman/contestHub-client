import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaEye,
  FaEdit,
  FaTrash,
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaPlusCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SkeletonLoader from "../../../components/Skeletons/Skeletons";

const MyCreatedContests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: contests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-created-contests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/creator/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const getStatusBadge = (status) => {
    const badges = {
      pending: { icon: <FaClock />, class: "badge-warning", text: "Pending" },
      approved: {
        icon: <FaCheckCircle />,
        class: "badge-success",
        text: "Approved",
      },
      rejected: {
        icon: <FaTimesCircle />,
        class: "badge-error",
        text: "Rejected",
      },
    };
    const badge = badges[status] || badges.pending;
    return (
      <span className={`badge ${badge.class} gap-1`}>
        {badge.icon}
        {badge.text}
      </span>
    );
  };

  const handleDelete = async (contest) => {
    if (contest.status === "approved" && contest.participantsCount > 0) {
      Swal.fire({
        icon: "error",
        title: "Cannot Delete",
        text: "This contest has participants and cannot be deleted.",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Delete Contest?",
      text: `Are you sure you want to delete "${contest.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/contests/${contest._id}`);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your contest has been deleted.",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Could not delete the contest.",
        });
      }
    }
  };

  const totalContests = contests.length;
  const approvedContests = contests.filter(
    (c) => c.status === "approved"
  ).length;
  const pendingContests = contests.filter((c) => c.status === "pending").length;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            My Created Contests
          </h1>
          <p className="text-gray-500 mt-1">
            Manage all contests you've created
          </p>
        </div>
        <Link
          to="/dashboard/add-contest"
          className="btn bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-none"
        >
          <FaPlusCircle />
          Add New Contest
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
      >
        <div className="bg-base-200 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <FaTrophy className="text-2xl text-blue-500" />
          </div>
          <div>
            <p className="text-2xl font-bold">{totalContests}</p>
            <p className="text-sm text-gray-500">Total Contests</p>
          </div>
        </div>
        <div className="bg-base-200 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-lg">
            <FaCheckCircle className="text-2xl text-green-500" />
          </div>
          <div>
            <p className="text-2xl font-bold">{approvedContests}</p>
            <p className="text-sm text-gray-500">Approved</p>
          </div>
        </div>
        <div className="bg-base-200 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-lg">
            <FaClock className="text-2xl text-amber-500" />
          </div>
          <div>
            <p className="text-2xl font-bold">{pendingContests}</p>
            <p className="text-sm text-gray-500">Pending Review</p>
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
        ) : contests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="bg-base-300">
                <tr>
                  <th>#</th>
                  <th>Contest</th>
                  <th>Type</th>
                  <th>Prize</th>
                  <th>Participants</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contests.map((contest, index) => (
                  <tr key={contest._id} className="hover">
                    <td className="font-medium">{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-12 h-12 rounded-lg">
                            <img src={contest.image || ""} alt={contest.name} />
                          </div>
                        </div>
                        <div>
                          <div className="font-medium line-clamp-1 max-w-[200px]">
                            {contest.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(contest.deadline).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-ghost capitalize">
                        {contest.type?.replace("-", " ")}
                      </span>
                    </td>
                    <td className="font-medium text-green-600">
                      ${contest.prizeMoney}
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <FaUsers className="text-gray-400" />
                        {contest.participantsCount || 0}
                      </div>
                    </td>
                    <td>{getStatusBadge(contest.status)}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        {contest.status === "approved" && (
                          <Link
                            to={`/dashboard/contest-submissions/${contest._id}`}
                            className="btn btn-sm btn-ghost text-cyan-600"
                            title="View Submissions"
                          >
                            <FaEye />
                          </Link>
                        )}

                        {contest.participantsCount === 0 && (
                          <Link
                            to={`/dashboard/edit-contest/${contest._id}`}
                            className="btn btn-sm btn-ghost text-amber-600"
                            title="Edit Contest"
                          >
                            <FaEdit />
                          </Link>
                        )}

                        <button
                          onClick={() => handleDelete(contest)}
                          className="btn btn-sm btn-ghost text-red-500"
                          title="Delete Contest"
                          disabled={
                            contest.status === "approved" &&
                            contest.participantsCount > 0
                          }
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">No Contests Yet</h3>
            <p className="text-gray-500 mb-6">
              Start by creating your first contest!
            </p>
            <Link
              to="/dashboard/add-contest"
              className="btn bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-none"
            >
              <FaPlusCircle />
              Create Contest
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MyCreatedContests;
