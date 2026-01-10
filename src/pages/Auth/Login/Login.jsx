import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserShield,
  FaUserTie,
  FaUser,
} from "react-icons/fa";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Demo credentials
  const demoCredentials = {
    admin: {
      email: "zehad@gmail.com",
      password: "Abcd1234@",
      label: "Admin",
      icon: FaUserShield,
      color: "cyan",
    },
    creator: {
      email: "shehab@gmail.com",
      password: "Abcd1234@",
      label: "Creator",
      icon: FaUserTie,
      color: "purple",
    },
    user: {
      email: "demo@user.com",
      password: "Abcd1234@",
      label: "User",
      icon: FaUser,
      color: "emerald",
    },
  };

  const fillDemoCredentials = (role) => {
    const creds = demoCredentials[role];
    setValue("email", creds.email);
    setValue("password", creds.password);

    Swal.fire({
      icon: "info",
      title: `${creds.label} Credentials Filled`,
      text: "Click 'Sign In' to login with demo account",
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await signInUser(data.email, data.password);
      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "You have successfully logged in.",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate(from, { replace: true });
    } catch (error) {
      let errorMessage = "Login failed. Please try again.";

      if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password.";
      } else if (error.code === "auth/invalid-credential") {
        errorMessage = "Invalid email or password.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many failed attempts. Please try again later.";
      }

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-base-content/60">
          Sign in to continue your creative journey
        </p>
      </div>

      {/* Demo Credentials Section */}
      <div className="mb-6 p-4 bg-base-200 rounded-2xl">
        <p className="text-sm text-base-content/70 mb-3 text-center font-medium">
          🎯 Quick Demo Access
        </p>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(demoCredentials).map(([role, creds]) => (
            <button
              key={role}
              type="button"
              onClick={() => fillDemoCredentials(role)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 border-transparent hover:border-${creds.color}-500 bg-base-100 hover:bg-${creds.color}-500/10 transition-all group`}
            >
              <creds.icon className={`text-lg text-${creds.color}-500`} />
              <span className="text-xs font-medium">{creds.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email Field */}
        <div className="form-control">
          <label className="label">
            <span className="form-label">Email Address</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40">
              <FaEnvelope />
            </span>
            <input
              type="email"
              placeholder="Enter your email"
              className={`input input-bordered w-full pl-11 rounded-xl ${
                errors.email ? "input-error" : ""
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email",
                },
              })}
            />
          </div>
          {errors.email && (
            <label className="label">
              <span className="form-error">{errors.email.message}</span>
            </label>
          )}
        </div>

        {/* Password Field */}
        <div className="form-control">
          <label className="label">
            <span className="form-label">Password</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40">
              <FaLock />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={`input input-bordered w-full pl-11 pr-11 rounded-xl ${
                errors.password ? "input-error" : ""
              }`}
              {...register("password", {
                required: "Password is required",
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <label className="label">
              <span className="form-error">{errors.password.message}</span>
            </label>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end">
          <a
            href="#"
            className="text-sm text-cyan-500 hover:text-cyan-600 transition-colors"
          >
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-gradient-primary w-full"
        >
          {isLoading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="divider my-6 text-base-content/40">or continue with</div>

      {/* Social Login */}
      <SocialLogin />

      {/* Register Link */}
      <p className="text-center mt-6 text-base-content/60">
        Don't have an account?{" "}
        <Link
          to="/register"
          state={location.state}
          className="text-cyan-500 hover:text-cyan-600 font-medium transition-colors"
        >
          Create one
        </Link>
      </p>
    </div>
  );
};

export default Login;
