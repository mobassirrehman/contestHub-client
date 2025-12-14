import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaTrash,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaUsers,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SkeletonLoader from "../../../components/Skeletons/Skeletons";

const ManageContests = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const {
    data: contestsData = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-contests", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/contests?page=${currentPage}&limit=${limit}`
      );
      return res.data;
    },
  });

  const { contests = [], totalPages = 1, totalContests = 0 } = contestsData;

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

  const handleApprove = async (contest) => {
    const result = await Swal.fire({
      title: "Approve Contest?",
      html: `
                <div class="text-left">
                    <p class="mb-2">Approve this contest:</p>
                    <p class="font-bold">${contest.name}</p>
                    <p class="text-gray-500 text-sm">by ${contest.creatorEmail}</p>
                </div>
            `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Approve",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/admin/contests/${contest._id}/status`, {
          status: "approved",
        });

        Swal.fire({
          icon: "success",
          title: "Approved!",
          text: "Contest has been approved and is now live.",
          showConfirmButton: false,
          timer: 1500,
        });

        refetch();
      } catch (error) {
        console.error("Approve error:", error);
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Could not approve the contest.",
        });
      }
    }
  };

  const handleReject = async (contest) => {
    const result = await Swal.fire({
      title: "Reject Contest?",
      html: `
                <div class="text-left">
                    <p class="mb-2">Reject this contest:</p>
                    <p class="font-bold">${contest.name}</p>
                    <p class="text-gray-500 text-sm">by ${contest.creatorEmail}</p>
                </div>
            `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Reject",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/admin/contests/${contest._id}/status`, {
          status: "rejected",
        });

        Swal.fire({
          icon: "success",
          title: "Rejected!",
          text: "Contest has been rejected.",
          showConfirmButton: false,
          timer: 1500,
        });

        refetch();
      } catch (error) {
        console.error("Reject error:", error);
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Could not reject the contest.",
        });
      }
    }
  };

  const handleDelete = async (contest) => {
    const result = await Swal.fire({
      title: "Delete Contest?",
      html: `
                <div class="text-left">
                    <p class="mb-2">Are you sure you want to delete:</p>
                    <p class="font-bold">${contest.name}</p>
                    <p class="mt-2 text-sm text-red-500">⚠️ This action cannot be undone!</p>
                </div>
            `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/contests/${contest._id}`);

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Contest has been deleted.",
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

  const pendingCount = contests.filter((c) => c.status === "pending").length;
  const approvedCount = contests.filter((c) => c.status === "approved").length;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          Manage Contests
        </h1>
        <p className="text-gray-500 mt-1">
          Review, approve, or reject contest submissions
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
            <FaTrophy className="text-2xl text-blue-500" />
          </div>
          <div>
            <p className="text-2xl font-bold">{totalContests}</p>
            <p className="text-sm text-gray-500">Total Contests</p>
          </div>
        </div>
        <div className="bg-base-200 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-lg">
            <FaClock className="text-2xl text-amber-500" />
          </div>
          <div>
            <p className="text-2xl font-bold">{pendingCount}</p>
            <p className="text-sm text-gray-500">Pending Review</p>
          </div>
        </div>
        <div className="bg-base-200 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-lg">
            <FaCheckCircle className="text-2xl text-green-500" />
          </div>
          <div>
            <p className="text-2xl font-bold">{approvedCount}</p>
            <p className="text-sm text-gray-500">Approved</p>
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
          <>
            <div className="overflow-x-auto">
              <table className="table">
                <thead className="bg-base-300">
                  <tr>
                    <th>#</th>
                    <th>Contest</th>
                    <th>Creator</th>
                    <th>Prize</th>
                    <th>Participants</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contests.map((contest, index) => (
                    <tr key={contest._id} className="hover">
                      <td className="font-medium">
                        {(currentPage - 1) * limit + index + 1}
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-12 h-12 rounded-lg">
                              <img
                                src={contest.image || ""}
                                alt={contest.name}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-medium line-clamp-1 max-w-[180px]">
                              {contest.name}
                            </div>
                            <div className="text-xs text-gray-500 capitalize">
                              {contest.type?.replace("-", " ")}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-gray-500 text-sm">
                        {contest.creatorEmail}
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
                        <div className="flex items-center gap-1">
                          <Link
                            to={`/contest/${contest._id}`}
                            className="btn btn-sm btn-ghost text-cyan-600"
                            title="View Contest"
                          >
                            <FaEye />
                          </Link>

                          {contest.status === "pending" && (
                            <button
                              onClick={() => handleApprove(contest)}
                              className="btn btn-sm btn-ghost text-green-600"
                              title="Approve"
                            >
                              <FaCheckCircle />
                            </button>
                          )}

                          {contest.status === "pending" && (
                            <button
                              onClick={() => handleReject(contest)}
                              className="btn btn-sm btn-ghost text-red-500"
                              title="Reject"
                            >
                              <FaTimesCircle />
                            </button>
                          )}

                          <button
                            onClick={() => handleDelete(contest)}
                            className="btn btn-sm btn-ghost text-red-500"
                            title="Delete"
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

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 p-4 border-t border-base-300">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="btn btn-sm btn-ghost"
                >
                  <FaChevronLeft />
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`btn btn-sm ${
                      currentPage === i + 1
                        ? "btn bg-blue-500 text-white"
                        : "btn-ghost"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="btn btn-sm btn-ghost"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold mb-2">No Contests</h3>
            <p className="text-gray-500">No contests have been created yet.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ManageContests;
