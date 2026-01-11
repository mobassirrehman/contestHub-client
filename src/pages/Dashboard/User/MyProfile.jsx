import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  FaCamera,
  FaUser,
  FaEnvelope,
  FaUserTag,
  FaCalendarAlt,
  FaTrophy,
  FaClipboardList,
  FaDollarSign,
  FaEdit,
  FaSave,
  FaTimes,
  FaCheck,
} from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: user?.displayName || "",
      bio: "",
    },
  });

  // Fetch user data from database
  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
    onSuccess: (data) => {
      reset({
        displayName: data?.displayName || user?.displayName,
        bio: data?.bio || "",
      });
    },
  });

  // Fetch participation stats
  const { data: participatedContests = [] } = useQuery({
    queryKey: ["participated", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/participants/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch winning stats
  const { data: winningData = [] } = useQuery({
    queryKey: ["winnings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/winners/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Calculate stats
  const stats = {
    totalParticipated: participatedContests.length,
    totalWon: winningData.length,
    totalEarnings: winningData.reduce(
      (sum, win) => sum + (win.prizeMoney || 0),
      0
    ),
    winRate:
      participatedContests.length > 0
        ? ((winningData.length / participatedContests.length) * 100).toFixed(1)
        : 0,
  };

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data) => {
      // Update Firebase profile
      if (data.displayName !== user?.displayName) {
        await updateUserProfile({ displayName: data.displayName });
      }
      // Update database
      return axiosSecure.patch(`/users/${user?.email}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user", user?.email]);
      setIsEditing(false);
      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile has been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong. Please try again.",
      });
    },
  });

  // Handle avatar upload
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);

    // Upload to imgbb
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();

      if (data.success) {
        // Update Firebase profile
        await updateUserProfile({ photoURL: data.data.url });
        // Update database
        await axiosSecure.patch(`/users/${user?.email}`, {
          photoURL: data.data.url,
        });
        queryClient.invalidateQueries(["user", user?.email]);

        Swal.fire({
          icon: "success",
          title: "Avatar Updated!",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Could not upload image. Please try again.",
      });
    } finally {
      setIsUploading(false);
      setAvatarPreview(null);
    }
  };

  const onSubmit = (data) => {
    updateProfileMutation.mutate(data);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    reset({
      displayName: userData?.displayName || user?.displayName,
      bio: userData?.bio || "",
    });
  };

  // Stat cards data
  const statCards = [
    {
      label: "Contests Joined",
      value: stats.totalParticipated,
      icon: FaClipboardList,
      color: "cyan",
    },
    {
      label: "Contests Won",
      value: stats.totalWon,
      icon: FaTrophy,
      color: "amber",
    },
    {
      label: "Win Rate",
      value: `${stats.winRate}%`,
      icon: FaCheck,
      color: "emerald",
    },
    {
      label: "Total Earnings",
      value: `$${stats.totalEarnings.toLocaleString()}`,
      icon: FaDollarSign,
      color: "purple",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-cyan-500"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Full-Width Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl overflow-hidden"
      >
        {/* Banner Background */}
        <div className="h-32 sm:h-40 lg:h-48 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 relative">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl" />
          </div>
        </div>

        {/* Profile Info Card */}
        <div className="relative bg-base-100 mx-4 sm:mx-6 -mt-16 sm:-mt-20 rounded-2xl shadow-lg border border-base-200 p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center lg:items-start">
              {/* Avatar */}
              <div className="relative -mt-16 sm:-mt-20 lg:-mt-24">
                <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-2xl overflow-hidden ring-4 ring-base-100 shadow-xl bg-base-200">
                  <img
                    src={
                      avatarPreview ||
                      user?.photoURL ||
                      `https://ui-avatars.com/api/?name=${user?.displayName}&background=06b6d4&color=fff&size=160`
                    }
                    alt={user?.displayName}
                    className="w-full h-full object-cover"
                  />
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
                      <span className="loading loading-spinner loading-md text-white"></span>
                    </div>
                  )}
                </div>
                {/* Camera Button */}
                <label className="absolute -bottom-2 -right-2 p-2.5 bg-cyan-500 text-white rounded-xl cursor-pointer hover:bg-cyan-600 transition-colors shadow-lg">
                  <FaCamera className="text-sm" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>

            {/* Info Section */}
            <div className="flex-1 text-center lg:text-left mt-2 lg:mt-0">
              {/* Name */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                {user?.displayName}
              </h1>

              {/* Email */}
              <p className="text-base-content/60 flex items-center justify-center lg:justify-start gap-2 mt-1 text-sm sm:text-base">
                <FaEnvelope className="text-sm flex-shrink-0" />
                <span className="truncate">{user?.email}</span>
              </p>

              {/* Role & Member Since */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-3">
                <span className="badge bg-cyan-500/10 text-cyan-500 border-none gap-1">
                  <FaUserTag className="text-xs" />
                  {userData?.role || "user"}
                </span>
                <span className="text-sm text-base-content/60 flex items-center gap-1">
                  <FaCalendarAlt className="text-xs" />
                  Member since{" "}
                  {new Date(
                    userData?.createdAt || user?.metadata?.creationTime
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Edit Button - Mobile */}
              <div className="mt-4 lg:hidden">
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-outline-cyan btn-sm"
                  >
                    <FaEdit />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Edit Button - Desktop */}
            <div className="hidden lg:block">
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-outline-cyan"
                >
                  <FaEdit />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="stat-card flex-col sm:flex-row text-center sm:text-left"
          >
            <div
              className={`stat-card-icon bg-${stat.color}-500/10 mx-auto sm:mx-0 mb-2 sm:mb-0`}
            >
              <stat.icon
                className={`text-lg sm:text-xl text-${stat.color}-500`}
              />
            </div>
            <div>
              <p className="stat-card-value text-xl sm:text-2xl lg:text-3xl">
                {stat.value}
              </p>
              <p className="stat-card-label text-xs sm:text-sm">{stat.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Profile Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="feature-card"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold">
              Profile Information
            </h2>
            <p className="text-sm text-base-content/60">
              {isEditing
                ? "Update your profile details below"
                : "Your personal information"}
            </p>
          </div>
          {isEditing && (
            <div className="flex gap-2">
              <button
                onClick={handleCancelEdit}
                className="btn btn-ghost btn-sm"
              >
                <FaTimes />
                <span className="hidden sm:inline">Cancel</span>
              </button>
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={updateProfileMutation.isLoading}
                className="btn btn-gradient-primary btn-sm"
              >
                {updateProfileMutation.isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <FaSave />
                )}
                <span className="hidden sm:inline">Save Changes</span>
                <span className="sm:hidden">Save</span>
              </button>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            {/* Display Name */}
            <div className="form-control">
              <label className="label py-1">
                <span className="form-label flex items-center gap-2 text-sm">
                  <FaUser className="text-cyan-500" />
                  Display Name
                </span>
              </label>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    className={`input input-bordered w-full rounded-xl ${
                      errors.displayName ? "input-error" : ""
                    }`}
                    {...register("displayName", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                  />
                  {errors.displayName && (
                    <label className="label py-1">
                      <span className="form-error">
                        {errors.displayName.message}
                      </span>
                    </label>
                  )}
                </>
              ) : (
                <p className="py-3 px-4 bg-base-200 rounded-xl text-sm sm:text-base">
                  {user?.displayName}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label py-1">
                <span className="form-label flex items-center gap-2 text-sm">
                  <FaEnvelope className="text-purple-500" />
                  Email Address
                </span>
              </label>
              <p className="py-3 px-4 bg-base-200 rounded-xl text-base-content/60 text-sm sm:text-base">
                <span className="truncate block">{user?.email}</span>
                <span className="text-xs text-base-content/40">
                  (cannot be changed)
                </span>
              </p>
            </div>

            {/* Role */}
            <div className="form-control">
              <label className="label py-1">
                <span className="form-label flex items-center gap-2 text-sm">
                  <FaUserTag className="text-amber-500" />
                  Account Role
                </span>
              </label>
              <p className="py-3 px-4 bg-base-200 rounded-xl capitalize text-sm sm:text-base">
                {userData?.role || "user"}
              </p>
            </div>

            {/* Member Since */}
            <div className="form-control">
              <label className="label py-1">
                <span className="form-label flex items-center gap-2 text-sm">
                  <FaCalendarAlt className="text-emerald-500" />
                  Member Since
                </span>
              </label>
              <p className="py-3 px-4 bg-base-200 rounded-xl text-sm sm:text-base">
                {new Date(
                  userData?.createdAt || user?.metadata?.creationTime
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Bio */}
          <div className="form-control">
            <label className="label py-1">
              <span className="form-label text-sm">Bio</span>
              {isEditing && (
                <span className="label-text-alt text-base-content/50 text-xs">
                  Optional
                </span>
              )}
            </label>
            {isEditing ? (
              <textarea
                placeholder="Tell us about yourself, your skills, and what kind of contests you're interested in..."
                className="textarea textarea-bordered w-full rounded-xl h-28 sm:h-32 resize-none text-sm sm:text-base"
                {...register("bio", {
                  maxLength: {
                    value: 500,
                    message: "Bio cannot exceed 500 characters",
                  },
                })}
              />
            ) : (
              <p className="py-3 px-4 bg-base-200 rounded-xl min-h-[70px] sm:min-h-[80px] text-base-content/70 text-sm sm:text-base">
                {userData?.bio || "No bio added yet."}
              </p>
            )}
            {errors.bio && (
              <label className="label py-1">
                <span className="form-error">{errors.bio.message}</span>
              </label>
            )}
          </div>
        </form>
      </motion.div>

      {/* Activity Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="feature-card"
      >
        <h2 className="text-lg sm:text-xl font-bold mb-4">Activity Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-4 sm:p-5 bg-cyan-500/10 rounded-xl text-center">
            <p className="text-2xl sm:text-3xl font-bold text-cyan-500">
              {stats.totalParticipated}
            </p>
            <p className="text-xs sm:text-sm text-base-content/60 mt-1">
              Total Contests Joined
            </p>
          </div>
          <div className="p-4 sm:p-5 bg-amber-500/10 rounded-xl text-center">
            <p className="text-2xl sm:text-3xl font-bold text-amber-500">
              {stats.totalWon}
            </p>
            <p className="text-xs sm:text-sm text-base-content/60 mt-1">
              Victories Achieved
            </p>
          </div>
          <div className="p-4 sm:p-5 bg-emerald-500/10 rounded-xl text-center">
            <p className="text-2xl sm:text-3xl font-bold text-emerald-500">
              ${stats.totalEarnings.toLocaleString()}
            </p>
            <p className="text-xs sm:text-sm text-base-content/60 mt-1">
              Total Prize Money
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MyProfile;
