import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state || "/";

  const handleLogin = (data) => {
    setLoginError("");

    signInUser(data.email, data.password)
      .then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful!",
          text: `Welcome back, ${result.user.displayName || "User"}!`,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate(from);
      })
      .catch((error) => {
        console.error(error);
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

        setLoginError(errorMessage);

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: errorMessage,
        });
      });
  };

  return (
    <div className="card bg-base-100 shadow-2xl">
      <div className="card-body">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold">Welcome Back!</h2>
          <p className="text-gray-500 mt-2">Please login to your account</p>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email Address</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaEnvelope />
              </span>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter your email"
                className={`input input-bordered w-full pl-10 ${
                  errors.email ? "input-error" : ""
                }`}
              />
            </div>
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
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaLock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Enter your password"
                className={`input input-bordered w-full pl-10 pr-10 ${
                  errors.password ? "input-error" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.password.message}
                </span>
              </label>
            )}
          </div>
          <div className="flex justify-end">
            <Link to="/forgot-password" className="link text-cyan-500 text-sm">
              Forgot Password?
            </Link>
          </div>
          {loginError && (
            <div className="alert alert-error">
              <span>{loginError}</span>
            </div>
          )}
          <button
            type="submit"
            className="btn text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-600 hover:to-cyan-600 w-full"
          >
            Login
          </button>
        </form>

        <div className="divider">OR</div>
        <SocialLogin></SocialLogin>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            state={location.state}
            className="link text-cyan-500 font-semibold"
          >
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
