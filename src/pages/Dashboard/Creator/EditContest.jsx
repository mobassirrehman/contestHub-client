import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaTrophy,
  FaImage,
  FaDollarSign,
  FaCalendarAlt,
  FaListAlt,
  FaPen,
  FaTasks,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SkeletonLoader from "../../../components/Skeletons/Skeletons";

const EditContest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deadline, setDeadline] = useState(new Date());
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const { data: contest = {}, isLoading } = useQuery({
    queryKey: ["edit-contest", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (contest._id) {
      setValue("name", contest.name);
      setValue("description", contest.description);
      setValue("type", contest.type);
      setValue("price", contest.price);
      setValue("prizeMoney", contest.prizeMoney);
      setValue("taskInstruction", contest.taskInstruction);
      setDeadline(new Date(contest.deadline));
      setImagePreview(contest.image);
    }
  }, [contest, setValue]);

  const contestTypes = [
    { value: "image-design", label: "Image Design" },
    { value: "article-writing", label: "Article Writing" },
    { value: "marketing-strategy", label: "Marketing Strategy" },
    { value: "web-development", label: "Web Development" },
    { value: "gaming-review", label: "Gaming Review" },
    { value: "photography", label: "Photography" },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateContest = async (data) => {
    setIsSubmitting(true);

    try {
      let imageURL = contest.image;

      if (data.image && data.image[0]) {
        const imageFile = data.image[0];
        const formData = new FormData();
        formData.append("image", imageFile);

        const imgbbKey = import.meta.env.VITE_IMAGE_HOST_KEY;
        const imgResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
          formData
        );
        imageURL = imgResponse.data.data.url;
      }

      const updateData = {
        name: data.name,
        description: data.description,
        image: imageURL,
        type: data.type,
        price: parseFloat(data.price),
        prizeMoney: parseFloat(data.prizeMoney),
        taskInstruction: data.taskInstruction,
        deadline: deadline.toISOString(),
      };

      const res = await axiosSecure.patch(`/contests/${id}`, updateData);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Contest Updated!",
          text: "Your contest has been updated successfully.",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/dashboard/my-created-contests");
      }
    } catch (error) {
      console.error("Error updating contest:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <SkeletonLoader type="details" />
      </div>
    );
  }

  if (contest.participantsCount > 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold mb-2">Cannot Edit</h2>
        <p className="text-gray-500 mb-6">
          This contest already has participants and cannot be edited.
        </p>
        <button onClick={() => navigate(-1)} className="btn btn-ghost gap-2">
          <FaArrowLeft />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="btn btn-ghost gap-2 mb-6">
        <FaArrowLeft />
        Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          Edit Contest
        </h1>
        <p className="text-gray-500 mt-1">Update your contest details</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-base-200 rounded-2xl p-6 md:p-8"
      >
        <form
          onSubmit={handleSubmit(handleUpdateContest)}
          className="space-y-6"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Contest Name</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaTrophy />
              </span>
              <input
                type="text"
                {...register("name", {
                  required: "Contest name is required",
                  minLength: {
                    value: 5,
                    message: "Name must be at least 5 characters",
                  },
                })}
                placeholder="Enter an attractive contest name"
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
              <span className="label-text font-medium">Contest Image</span>
            </label>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <FaImage />
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    {...register("image")}
                    onChange={(e) => {
                      register("image").onChange(e);
                      handleImageChange(e);
                    }}
                    className="file-input file-input-bordered w-full pl-10"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to keep current image
                </p>
              </div>
              {imagePreview && (
                <div className="w-32 h-20 rounded-lg overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Contest Type</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <FaListAlt />
                </span>
                <select
                  {...register("type", {
                    required: "Please select a contest type",
                  })}
                  className={`select select-bordered w-full pl-10 ${
                    errors.type ? "select-error" : ""
                  }`}
                >
                  <option value="">Select Type</option>
                  {contestTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              {errors.type && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.type.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Deadline</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 z-10">
                  <FaCalendarAlt />
                </span>
                <DatePicker
                  selected={deadline}
                  onChange={(date) => setDeadline(date)}
                  minDate={new Date()}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="input input-bordered w-full pl-10"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Entry Fee ($)</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <FaDollarSign />
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  {...register("price", {
                    required: "Entry fee is required",
                    min: { value: 1, message: "Minimum fee is $1" },
                  })}
                  className={`input input-bordered w-full pl-10 ${
                    errors.price ? "input-error" : ""
                  }`}
                />
              </div>
              {errors.price && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.price.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Prize Money ($)
                </span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <FaTrophy />
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="10"
                  {...register("prizeMoney", {
                    required: "Prize money is required",
                    min: { value: 10, message: "Minimum prize is $10" },
                  })}
                  className={`input input-bordered w-full pl-10 ${
                    errors.prizeMoney ? "input-error" : ""
                  }`}
                />
              </div>
              {errors.prizeMoney && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.prizeMoney.message}
                  </span>
                </label>
              )}
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Description</span>
            </label>
            <div className="relative">
              <span className="absolute top-3 left-3 text-gray-400">
                <FaPen />
              </span>
              <textarea
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 50,
                    message: "Description must be at least 50 characters",
                  },
                })}
                placeholder="Describe your contest in detail..."
                className={`textarea textarea-bordered w-full pl-10 min-h-[120px] ${
                  errors.description ? "textarea-error" : ""
                }`}
              />
            </div>
            {errors.description && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.description.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Task Instructions
              </span>
            </label>
            <div className="relative">
              <span className="absolute top-3 left-3 text-gray-400">
                <FaTasks />
              </span>
              <textarea
                {...register("taskInstruction", {
                  required: "Task instructions are required",
                  minLength: {
                    value: 30,
                    message: "Instructions must be at least 30 characters",
                  },
                })}
                placeholder="Provide clear instructions for participants..."
                className={`textarea textarea-bordered w-full pl-10 min-h-[150px] ${
                  errors.taskInstruction ? "textarea-error" : ""
                }`}
              />
            </div>
            {errors.taskInstruction && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.taskInstruction.message}
                </span>
              </label>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-ghost flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-none flex-1"
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Updating...
                </>
              ) : (
                <>
                  <FaSave />
                  Update Contest
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditContest;
