import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaTrophy,
  FaArrowRight,
} from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const sessionId = searchParams.get("session_id");
  const contestId = searchParams.get("contestId");

  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId || !user) {
        setStatus("error");
        setMessage("Invalid payment session.");
        return;
      }

      try {
        const res = await axiosSecure.post("/verify-payment", { sessionId });

        if (res.data.success) {
          setStatus("success");
          setMessage(res.data.message || "Registration successful!");
        } else {
          setStatus("error");
          setMessage(res.data.message || "Payment verification failed.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
        setMessage(error.response?.data?.message || "Something went wrong.");
      }
    };

    if (user) {
      verifyPayment();
    }
  }, [sessionId, user, axiosSecure]);

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-base-200 rounded-2xl p-8 text-center"
      >
        {status === "verifying" && (
          <>
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-cyan-100 flex items-center justify-center">
              <span className="loading loading-spinner loading-lg text-cyan-500"></span>
            </div>
            <h1 className="text-2xl font-bold mb-2">Verifying Payment</h1>
            <p className="text-gray-500">
              Please wait while we confirm your payment...
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
            >
              <FaCheckCircle className="text-5xl text-green-500" />
            </motion.div>
            <h1 className="text-2xl font-bold mb-2 text-green-600">
              Payment Successful!
            </h1>
            <p className="text-gray-500 mb-6">{message}</p>

            <div className="bg-base-100 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-amber-500">
                <FaTrophy />
                <span className="font-medium">You're now registered!</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Don't forget to submit your task before the deadline.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                to={`/contest/${contestId}`}
                className="btn btn-gradient-primary text-white border-none"
              >
                View Contest
                <FaArrowRight />
              </Link>
              <Link to="/dashboard/my-participated" className="btn btn-ghost">
                Go to My Contests
              </Link>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center"
            >
              <FaTimesCircle className="text-5xl text-red-500" />
            </motion.div>
            <h1 className="text-2xl font-bold mb-2 text-red-600">
              Payment Failed
            </h1>
            <p className="text-gray-500 mb-6">{message}</p>

            <div className="flex flex-col gap-3">
              {contestId && (
                <Link
                  to={`/contest/${contestId}`}
                  className="btn btn-gradient-primary text-white border-none"
                >
                  Try Again
                </Link>
              )}
              <Link to="/all-contests" className="btn btn-ghost">
                Browse Contests
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
