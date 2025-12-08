import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaImage,
} from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxios();

  const from = location.state || "/";
  const password = watch("password");

  const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMAGE_HOST_KEY
  }`;

  const handleRegistration = async (data) => {
    setIsLoading(true);

    try {
      const imageFile = data.photo[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgResponse = await axios.post(imageHostingAPI, formData);
      const photoURL = imgResponse.data.data.url;

      await registerUser(data.email, data.password);

      await updateUserProfile({
        displayName: data.name,
        photoURL: photoURL,
      });

      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL: photoURL,
      };

      const dbResponse = await axiosPublic.post("/users", userInfo);

      if (
        dbResponse.data.insertedId ||
        dbResponse.data.message === "User already exists"
      ) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registration Successful!",
          text: `Welcome to ContestHub, ${data.name}!`,
          showConfirmButton: false,
          timer: 2500,
        });
        navigate(from);
      }
    } catch (error) {
      console.error(error);
      let errorMessage = "Registration failed. Please try again.";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      }

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-2xl">
      <div className="card-body">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold">Create Account</h2>
          <p className="text-gray-500 mt-2">
            Join ContestHub and start competing!
          </p>
        </div>

        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaUser />
              </span>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                placeholder="Enter your full name"
                className={`input input-bordered w-full pl-10 ${
                  errors.name ? "input-error" : ""
                }`}
              />
            </div>
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
              <span className="label-text font-medium">Profile Photo</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaImage />
              </span>
              <input
                type="file"
                {...register("photo", {
                  required: "Profile photo is required",
                  validate: {
                    fileType: (files) => {
                      const allowedTypes = [
                        "image/jpeg",
                        "image/png",
                        "image/gif",
                        "image/webp",
                      ];
                      return (
                        allowedTypes.includes(files[0]?.type) ||
                        "Only JPG, PNG, GIF, WEBP allowed"
                      );
                    },
                    fileSize: (files) => {
                      return (
                        files[0]?.size <= 2 * 1024 * 1024 ||
                        "Image must be less than 2MB"
                      );
                    },
                  },
                })}
                accept="image/*"
                className={`file-input file-input-bordered w-full pl-10 ${
                  errors.photo ? "file-input-error" : ""
                }`}
              />
            </div>
            {errors.photo && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.photo.message}
                </span>
              </label>
            )}
          </div>
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
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                    message:
                      "Must include uppercase, lowercase, number & special character",
                  },
                })}
                placeholder="Create a strong password"
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
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Confirm Password</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaLock />
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                placeholder="Confirm your password"
                className={`input input-bordered w-full pl-10 pr-10 ${
                  errors.confirmPassword ? "input-error" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.confirmPassword.message}
                </span>
              </label>
            )}
          </div>
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                {...register("terms", {
                  required: "You must accept the terms and conditions",
                })}
                className="checkbox checkbox-primary checkbox-sm"
              />
              <span className="label-text">
                I agree to the{" "}
                <Link to="/terms" className="link text-cyan-500">
                  Terms & Conditions
                </Link>
              </span>
            </label>
            {errors.terms && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.terms.message}
                </span>
              </label>
            )}
          </div>
          <button
            type="submit"
            className="btn text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-600 hover:to-cyan-600 w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        <div className="divider">OR</div>
        <SocialLogin />
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            state={location.state}
            className="link text-cyan-500 font-semibold"
          >
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
