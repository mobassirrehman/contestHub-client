import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaCamera,
  FaSave,
  FaShieldAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SkeletonLoader from "../../../components/Skeletons/Skeletons";

const MyProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isUpdating, setIsUpdating] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    data: profile = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
    onSuccess: (data) => {
      reset({
        displayName: data.displayName,
      });
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (data) => {
    setIsUpdating(true);

    try {
      let photoURL = profile.photoURL;

      if (data.photo && data.photo[0]) {
        const imageFile = data.photo[0];
        const formData = new FormData();
        formData.append("image", imageFile);

        const imgbbKey = import.meta.env.VITE_IMAGE_HOST_KEY;
        const imgResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
          formData
        );
        photoURL = imgResponse.data.data.url;
      }

      await updateUserProfile({
        displayName: data.displayName,
        photoURL: photoURL,
      });

      await axiosSecure.patch(`/users/${user.email}`, {
        displayName: data.displayName,
        photoURL: photoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile has been updated successfully.",
        showConfirmButton: false,
        timer: 2000,
      });

      setPreviewImage(null);
      refetch();
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: "badge-error",
      creator: "badge-primary",
      user: "badge-success",
    };
    return badges[role] || "badge-ghost";
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <SkeletonLoader type="details" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold">My Profile</h1>
        <p className="text-gray-500 mt-1">Manage your account settings</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-base-200 rounded-2xl overflow-hidden"
      >
        <div className="h-32 bg-gradient-to-r from-cyan-500 to-blue-500 relative">
          <div className="absolute -bottom-16 left-6">
            <div className="relative">
              <img
                src={
                  previewImage ||
                  profile.photoURL ||
                  "https://i.ibb.co.com/mC3FBP9V/user-placeholder.jpg"
                }
                alt={profile.displayName}
                className="w-32 h-32 rounded-full border-4 border-base-200 object-cover"
              />
              <label className="absolute bottom-0 right-0 p-2 bg-base-100 rounded-full cursor-pointer shadow-lg hover:bg-base-200 transition-colors">
                <FaCamera className="text-gray-600" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("photo")}
                  onChange={(e) => {
                    register("photo").onChange(e);
                    handleImageChange(e);
                  }}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="pt-20 px-6 pb-6">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold">{profile.displayName}</h2>
            <span className={`badge ${getRoleBadge(profile.role)} capitalize`}>
              <FaShieldAlt className="mr-1" />
              {profile.role}
            </span>
          </div>

          <form
            onSubmit={handleSubmit(handleUpdateProfile)}
            className="space-y-5"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Display Name</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <FaUser />
                </span>
                <input
                  type="text"
                  {...register("displayName", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  defaultValue={profile.displayName}
                  placeholder="Enter your name"
                  className={`input input-bordered w-full pl-10 ${
                    errors.displayName ? "input-error" : ""
                  }`}
                />
              </div>
              {errors.displayName && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.displayName.message}
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
                  value={profile.email}
                  disabled
                  className="input input-bordered w-full pl-10 bg-base-300 cursor-not-allowed"
                />
              </div>
              <label className="label">
                <span className="label-text-alt text-gray-500">
                  Email cannot be changed
                </span>
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Account Role</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <FaShieldAlt />
                </span>
                <input
                  type="text"
                  value={
                    profile.role?.charAt(0).toUpperCase() +
                    profile.role?.slice(1)
                  }
                  disabled
                  className="input input-bordered w-full pl-10 bg-base-300 cursor-not-allowed capitalize"
                />
              </div>
              <label className="label">
                <span className="label-text-alt text-gray-500">
                  Contact admin to change role
                </span>
              </label>
            </div>

            <div className="bg-base-300 rounded-lg p-4">
              <p className="text-sm text-gray-500">
                Member since{" "}
                <span className="font-medium text-gray-700">
                  {new Date(profile.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="btn bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-none w-full"
            >
              {isUpdating ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Updating...
                </>
              ) : (
                <>
                  <FaSave />
                  Save Changes
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default MyProfile;
