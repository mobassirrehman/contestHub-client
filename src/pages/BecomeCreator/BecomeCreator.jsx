import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  FaUserTie,
  FaTrophy,
  FaDollarSign,
  FaChartLine,
  FaCheckCircle,
  FaPaperPlane,
  FaUsers,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const BecomeCreator = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const benefits = [
    {
      icon: <FaTrophy />,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-500",
      title: "Host Contests",
      description:
        "Create and manage your own contests across multiple categories",
    },
    {
      icon: <FaDollarSign />,
      iconBg: "bg-green-500/10",
      iconColor: "text-green-500",
      title: "Earn Revenue",
      description:
        "Set entry fees and prize pools that work for your community",
    },
    {
      icon: <FaChartLine />,
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyan-500",
      title: "Track Analytics",
      description: "Monitor participation, submissions, and engagement metrics",
    },
    {
      icon: <FaUsers />,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-500",
      title: "Build Community",
      description: "Connect with talented participants and grow your following",
    },
  ];

  const steps = [
    {
      number: 1,
      title: "Submit Application",
      description: "Fill out the form below with your details",
    },
    {
      number: 2,
      title: "Admin Review",
      description: "Our team reviews your application",
    },
    {
      number: 3,
      title: "Get Approved",
      description: "Receive creator access to your account",
    },
    {
      number: 4,
      title: "Start Creating",
      description: "Create your first contest and go live!",
    },
  ];

  const handleApplication = async (data) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to submit your application.",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: "/become-creator" });
        }
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Application Submitted!",
        html: `
                    <p>Thank you for your interest in becoming a creator!</p>
                    <p class="text-sm text-gray-500 mt-2">Our team will review your application and get back to you within 2-3 business days.</p>
                `,
        showConfirmButton: true,
        confirmButtonText: "Got it!",
      });
      reset();
      setIsSubmitting(false);
    }, 1500);
  };

  if (role === "creator" || role === "admin") {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-base-200 rounded-2xl p-8 text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
            <FaCheckCircle className="text-4xl text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">
            You're Already a {role === "admin" ? "Admin" : "Creator"}!
          </h2>
          <p className="text-gray-500 mb-6">
            You already have access to create and manage contests.
          </p>
          <button
            onClick={() => navigate("/dashboard/add-contest")}
            className="btn btn-gradient-primary"
          >
            <FaTrophy />
            Create a Contest
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="hero-gradient-primary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <FaUserTie className="text-cyan-400" />
                <span className="text-white/80 text-sm">Join Our Creators</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Become a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  Contest Creator
                </span>
              </h1>
              <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                Turn your ideas into engaging contests. Host competitions,
                discover talent, and build a community around your passion.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2 text-white/80">
                  <FaCheckCircle className="text-green-400" />
                  <span>Free to apply</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <FaCheckCircle className="text-green-400" />
                  <span>Quick approval</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <FaCheckCircle className="text-green-400" />
                  <span>Full support</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-base-200">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Become a Creator?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Join hundreds of creators who are already hosting successful
              contests on our platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-base-100 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-14 h-14 ${benefit.iconBg} rounded-xl flex items-center justify-center mb-4`}
                >
                  <span className={`text-2xl ${benefit.iconColor}`}>
                    {benefit.icon}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-500 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-gray-500">
              Simple steps to start your creator journey
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-1 text-center relative"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex items-center justify-center text-xl font-bold">
                  {step.number}
                </div>
                <h3 className="font-bold mb-1">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.description}</p>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-30"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-base-200">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-base-100 rounded-2xl p-8 shadow-lg"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Apply Now</h2>
              <p className="text-gray-500">
                Tell us about yourself and why you want to become a creator
              </p>
            </div>

            <form
              onSubmit={handleSubmit(handleApplication)}
              className="space-y-6"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  defaultValue={user?.displayName || ""}
                  placeholder="Enter your full name"
                  className={`input input-bordered w-full ${
                    errors.name ? "input-error" : ""
                  }`}
                />
                {errors.name && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.name.message}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  defaultValue={user?.email || ""}
                  placeholder="Enter your email"
                  className={`input input-bordered w-full ${
                    errors.email ? "input-error" : ""
                  }`}
                />
                {errors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.email.message}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Interested Category
                  </span>
                </label>
                <select
                  {...register("category", {
                    required: "Please select a category",
                  })}
                  className={`select select-bordered w-full ${
                    errors.category ? "select-error" : ""
                  }`}
                >
                  <option value="">Select your primary interest</option>
                  <option value="image-design">Image Design</option>
                  <option value="article-writing">Article Writing</option>
                  <option value="web-development">Web Development</option>
                  <option value="marketing-strategy">Marketing Strategy</option>
                  <option value="gaming-review">Gaming Review</option>
                  <option value="photography">Photography</option>
                  <option value="multiple">Multiple Categories</option>
                </select>
                {errors.category && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.category.message}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Why do you want to become a creator?
                  </span>
                </label>
                <textarea
                  {...register("reason", {
                    required: "Please tell us your reason",
                    minLength: {
                      value: 50,
                      message: "Please write at least 50 characters",
                    },
                  })}
                  placeholder="Tell us about your experience and what kind of contests you'd like to create..."
                  className={`textarea textarea-bordered w-full min-h-[120px] ${
                    errors.reason ? "textarea-error" : ""
                  }`}
                />
                {errors.reason && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.reason.message}
                    </span>
                  </label>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-gradient-primary w-full"
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Submit Application
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BecomeCreator;
