import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaUsers,
  FaClock,
  FaCalendarAlt,
  FaDollarSign,
  FaUser,
  FaCrown,
  FaCheckCircle,
  FaPaperPlane,
  FaArrowLeft,
  FaCheck,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxios from "../../hooks/useAxios";
import SkeletonLoader from "../../components/Skeletons/Skeletons";

const ContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxios();

  const [timeLeft, setTimeLeft] = useState({});
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submittedTask, setSubmittedTask] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const { data: contest = {}, isLoading } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/contests/${id}`);
      return res.data;
    },
  });

  const { data: registrationStatus = {}, refetch: refetchRegistration } =
    useQuery({
      queryKey: ["registration-status", id, user?.email],
      queryFn: async () => {
        if (!user?.email) return { isRegistered: false };
        const res = await axiosSecure.get(
          `/participants/check?contestId=${id}&email=${user.email}`
        );
        return res.data;
      },
      enabled: !!user?.email,
    });

  const { isRegistered, participant } = registrationStatus;

  useEffect(() => {
    if (!contest.deadline) return;

    const calculateTimeLeft = () => {
      const deadline = new Date(contest.deadline).getTime();
      const now = new Date().getTime();
      const difference = deadline - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        };
      }
      return null;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      const time = calculateTimeLeft();
      setTimeLeft(time);
      if (!time) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [contest.deadline]);

  const isEnded = !timeLeft;
  const hasWinner = !!contest.winnerEmail;
  const hasSubmitted = !!participant?.submittedTask;
  const isOwnContest = contest?.creatorEmail === user?.email;
  const isAdmin = user?.role === "admin";

  const handlePayment = async () => {
    if (!user) {
      navigate("/login", { state: `/contest/${id}` });
      return;
    }

    setIsPaying(true);
    try {
      const res = await axiosSecure.post("/create-payment-intent", {
        contestId: id,
        contestName: contest.name,
        price: contest.price,
        userEmail: user.email,
        userName: user.displayName,
        userPhoto: user.photoURL,
      });

      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error("Payment error:", error);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setIsPaying(false);
    }
  };

  const handleSubmitTask = async () => {
    if (!submittedTask.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Empty Submission",
        text: "Please enter your task submission.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await axiosSecure.patch(`/participants/${participant._id}/submit`, {
        submittedTask: submittedTask.trim(),
      });

      Swal.fire({
        icon: "success",
        title: "Submitted!",
        text: "Your task has been submitted successfully.",
      });

      setIsSubmitModalOpen(false);
      setSubmittedTask("");
      refetchRegistration();
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <SkeletonLoader type="details" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={contest.image || ""}
          alt={contest.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 btn btn-circle btn-ghost bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
        >
          <FaArrowLeft />
        </button>

        <div className="absolute top-4 right-4">
          <span className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium rounded-full capitalize">
            {contest.type?.replace("-", " ")}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2"
            >
              {contest.name}
            </motion.h1>
            <p className="text-gray-300 flex items-center gap-2">
              <FaUser />
              Created by {contest.creatorEmail}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {hasWinner && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-full">
                    <FaCrown className="text-3xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">Winner Announced!</h3>
                    <p className="opacity-90">Congratulations to the winner</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        contest.winnerPhoto ||
                        "https://i.ibb.co.com/mC3FBP9V/user-placeholder.jpg"
                      }
                      alt={contest.winnerName}
                      className="w-12 h-12 rounded-full border-2 border-white"
                    />
                    <div>
                      <p className="font-bold">{contest.winnerName}</p>
                      <p className="text-sm opacity-90">
                        Won ${contest.prizeMoney}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-base-200 rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaTrophy className="text-cyan-500" />
                About This Contest
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {contest.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-base-200 rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaPaperPlane className="text-cyan-500" />
                Task Instructions
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {contest.taskInstruction ||
                    "No specific instructions provided."}
                </p>
              </div>
            </motion.div>

            {isRegistered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`rounded-2xl p-6 ${
                  hasSubmitted
                    ? "bg-green-500/10 border border-green-500/30"
                    : "bg-amber-500/10 border border-amber-500/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FaCheckCircle
                    className={`text-2xl ${
                      hasSubmitted ? "text-green-500" : "text-yellow-500"
                    }`}
                  />
                  <div>
                    <h3 className="font-bold">
                      {hasSubmitted ? "Task Submitted" : "Submission Pending"}
                    </h3>
                    <p className="text-sm text-base-content/70">
                      {hasSubmitted
                        ? `Submitted on ${new Date(
                            participant.submittedAt
                          ).toLocaleDateString()}`
                        : "You have registered. Submit your task before the deadline."}
                    </p>
                  </div>
                </div>
                {hasSubmitted && (
                  <div className="mt-4 p-4 bg-base-200 rounded-xl">
                    <p className="text-sm text-base-content/60 mb-1">
                      Your Submission:
                    </p>
                    <p className="text-base-content">
                      {participant.submittedTask}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-emerald-700 via-blue-800 to-cyan-900 rounded-2xl p-6 text-white"
            >
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FaClock />
                {hasWinner
                  ? "Contest Completed"
                  : isEnded
                  ? "Contest Ended"
                  : "Time Remaining"}
              </h3>

              {hasWinner ? (
                <p className="text-center text-green-400 py-4 flex items-center justify-center gap-2">
                  <FaTrophy /> Winner has been declared
                </p>
              ) : isEnded ? (
                <p className="text-center text-gray-300 py-4">
                  This contest has ended
                </p>
              ) : (
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { value: timeLeft.days, label: "Days" },
                    { value: timeLeft.hours, label: "Hours" },
                    { value: timeLeft.minutes, label: "Mins" },
                    { value: timeLeft.seconds, label: "Secs" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-3"
                    >
                      <div className="text-2xl md:text-3xl font-bold">
                        {String(item.value || 0).padStart(2, "0")}
                      </div>
                      <div className="text-xs text-gray-300">{item.label}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-white/20 flex items-center gap-2 text-sm">
                <FaCalendarAlt />
                <span>
                  Deadline:{" "}
                  {new Date(contest.deadline).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-base-200 rounded-2xl p-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 flex items-center gap-2">
                    <FaTrophy className="text-amber-500" />
                    Prize Money
                  </span>
                  <span className="text-2xl font-bold text-amber-500">
                    ${contest.prizeMoney}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 flex items-center gap-2">
                    <FaDollarSign className="text-green-500" />
                    Entry Fee
                  </span>
                  <span className="text-xl font-bold text-green-500">
                    ${contest.price}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 flex items-center gap-2">
                    <FaUsers className="text-blue-500" />
                    Participants
                  </span>
                  <span className="text-xl font-bold">
                    {contest.participantsCount || 0}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {isEnded ? (
                <button disabled className="btn btn-lg w-full btn-disabled">
                  Contest Ended
                </button>
              ) : hasWinner ? (
                <button disabled className="btn btn-lg w-full btn-disabled">
                  Winner Declared
                </button>
              ) : isAdmin ? (
                <button disabled className="btn btn-lg w-full btn-disabled">
                  Admins Cannot Participate
                </button>
              ) : isOwnContest ? (
                <button disabled className="btn btn-lg w-full btn-disabled">
                  Cannot Join Own Contest
                </button>
              ) : isRegistered ? (
                hasSubmitted ? (
                  <button
                    disabled
                    className="btn btn-lg w-full bg-green-500 text-white border-none"
                  >
                    <FaCheckCircle />
                    Already Submitted
                  </button>
                ) : (
                  <button
                    onClick={() => setIsSubmitModalOpen(true)}
                    className="btn btn-lg w-full btn-gradient-primary text-white border-none"
                  >
                    <FaPaperPlane />
                    Submit Your Task
                  </button>
                )
              ) : (
                <button
                  onClick={handlePayment}
                  disabled={isPaying}
                  className="btn btn-lg w-full btn-gradient-primary text-white border-none"
                >
                  {isPaying ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <>
                      <FaDollarSign />
                      Register Now - ${contest.price}
                    </>
                  )}
                </button>
              )}
            </motion.div>

            {isRegistered && !hasSubmitted && !isEnded && (
              <p className="flex items-center justify-center gap-2 text-sm text-base-content/60">
                <FaCheck className="text-green-500" /> You are registered for
                this contest
              </p>
            )}
          </div>
        </div>
      </div>

      {isSubmitModalOpen && (
        <div className="modal modal-open">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="modal-box max-w-lg"
          >
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <FaPaperPlane className="text-cyan-500" />
              Submit Your Task
            </h3>

            <div className="mb-4">
              <label className="label">
                <span className="label-text font-medium">Your Submission</span>
              </label>
              <textarea
                value={submittedTask}
                onChange={(e) => setSubmittedTask(e.target.value)}
                placeholder="Enter your task submission (link, text, or description)..."
                className="textarea textarea-bordered w-full h-40 focus:border-cyan-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                You can submit a link to your work or describe your submission.
              </p>
            </div>

            <div className="modal-action">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="btn btn-ghost"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitTask}
                disabled={isSubmitting || !submittedTask.trim()}
                className="btn btn-gradient-primary-static text-white border-none"
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    <FaPaperPlane />
                    Submit
                  </>
                )}
              </button>
            </div>
          </motion.div>
          <div
            className="modal-backdrop bg-black/50"
            onClick={() => setIsSubmitModalOpen(false)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ContestDetails;
