import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaCrown,
  FaExternalLinkAlt,
  FaArrowLeft,
  FaUsers,
  FaCheckCircle,
  FaCalendarAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SkeletonLoader from "../../../components/Skeletons/Skeletons";

const ContestSubmissions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: contest = {}, isLoading: contestLoading } = useQuery({
    queryKey: ["contest-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data;
    },
  });

  const {
    data: submissions = [],
    isLoading: submissionsLoading,
    refetch,
  } = useQuery({
    queryKey: ["contest-submissions", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissions/${id}`);
      return res.data;
    },
  });

  const isLoading = contestLoading || submissionsLoading;
  const hasWinner = !!contest.winnerEmail;

  const handleDeclareWinner = async (submission) => {
    const result = await Swal.fire({
      title: "Declare Winner?",
      html: `
                <div class="text-left">
                    <p class="mb-2">Are you sure you want to declare:</p>
                    <p class="font-bold text-lg">${submission.userName}</p>
                    <p class="text-gray-500">${submission.userEmail}</p>
                    <p class="mt-2 text-sm text-amber-600">⚠️ This action cannot be undone!</p>
                </div>
            `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Declare Winner!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/contests/${id}/winner`, {
          winnerEmail: submission.userEmail,
          winnerName: submission.userName,
          winnerPhoto: submission.userPhoto,
        });

        Swal.fire({
          icon: "success",
          title: "Winner Declared!",
          text: `${submission.userName} has been declared the winner!`,
          showConfirmButton: false,
          timer: 2500,
        });

        refetch();
      } catch (error) {
        console.error("Error declaring winner:", error);
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Could not declare winner. Please try again.",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto">
        <SkeletonLoader type="details" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <button onClick={() => navigate(-1)} className="btn btn-ghost gap-2 mb-6">
        <FaArrowLeft />
        Back to Contests
      </button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-base-200 rounded-2xl p-6 mb-8"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden">
            <img
              src={contest.image || ""}
              alt={contest.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{contest.name}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <FaUsers />
                {contest.participantsCount || 0} Participants
              </span>
              <span className="flex items-center gap-1">
                <FaTrophy className="text-amber-500" />${contest.prizeMoney}{" "}
                Prize
              </span>
              <span className="flex items-center gap-1">
                <FaCalendarAlt />
                Deadline: {new Date(contest.deadline).toLocaleDateString()}
              </span>
            </div>

            {hasWinner && (
              <div className="mt-4 flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl p-4">
                <FaCrown className="text-2xl" />
                <div>
                  <p className="font-bold">Winner: {contest.winnerName}</p>
                  <p className="text-sm opacity-90">{contest.winnerEmail}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaCheckCircle className="text-cyan-500" />
          Submissions ({submissions.length})
        </h2>

        {submissions.length > 0 ? (
          <div className="space-y-4">
            {submissions.map((submission, index) => (
              <motion.div
                key={submission._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-base-200 rounded-xl p-5 ${
                  submission.isWinner ? "border-2 border-amber-500" : ""
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="relative">
                      <img
                        src={
                          submission.userPhoto ||
                          "https://i.ibb.co.com/mC3FBP9V/user-placeholder.jpg"
                        }
                        alt={submission.userName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {submission.isWinner && (
                        <div className="absolute -top-1 -right-1 bg-amber-500 text-white p-1 rounded-full">
                          <FaCrown className="text-xs" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {submission.userName}
                        {submission.isWinner && (
                          <span className="badge badge-warning badge-sm">
                            Winner
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {submission.userEmail}
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Submitted:</span>{" "}
                    {new Date(submission.submittedAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </div>

                  {!hasWinner && (
                    <button
                      onClick={() => handleDeclareWinner(submission)}
                      className="btn btn-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-none"
                    >
                      <FaCrown />
                      Declare Winner
                    </button>
                  )}
                </div>

                <div className="mt-4 p-4 bg-base-100 rounded-lg">
                  <p className="text-sm text-gray-500 mb-2 font-medium">
                    Submission:
                  </p>
                  <div className="text-gray-700">
                    {submission.submittedTask?.startsWith("http") ? (
                      <a
                        href={submission.submittedTask}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-600 hover:underline flex items-center gap-2"
                      >
                        {submission.submittedTask}
                        <FaExternalLinkAlt className="text-sm" />
                      </a>
                    ) : (
                      <p className="whitespace-pre-line">
                        {submission.submittedTask}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-base-200 rounded-xl">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold mb-2">No Submissions Yet</h3>
            <p className="text-gray-500">
              Participants haven't submitted their tasks yet.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ContestSubmissions;
