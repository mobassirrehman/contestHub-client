import { useState } from "react";
import { useNavigate } from "react-router";
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
  FaPaperPlane,
} from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddContest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deadline, setDeadline] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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

  const handleAddContest = async (data) => {
    setIsSubmitting(true);

    try {
      let imageURL = "";
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

      const contestData = {
        name: data.name,
        description: data.description,
        image: imageURL,
        type: data.type,
        price: parseFloat(data.price),
        prizeMoney: parseFloat(data.prizeMoney),
        taskInstruction: data.taskInstruction,
        deadline: deadline.toISOString(),
        creatorEmail: user.email,
        creatorName: user.displayName,
      };

      const res = await axiosSecure.post("/contests", contestData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Contest Created!",
          text: "Your contest has been submitted for approval.",
          showConfirmButton: false,
          timer: 2500,
        });
        reset();
        setImagePreview(null);
        setDeadline(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
        navigate("/dashboard/my-created-contests");
      }
    } catch (error) {
      console.error("Error creating contest:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Create",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          Create New Contest
        </h1>
        <p className="text-gray-500 mt-1">
          Fill in the details to create a new contest
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-base-200 rounded-2xl p-6 md:p-8"
      >
        <form onSubmit={handleSubmit(handleAddContest)} className="space-y-6">
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
                    {...register("image", {
                      required: "Contest image is required",
                    })}
                    onChange={(e) => {
                      register("image").onChange(e);
                      handleImageChange(e);
                    }}
                    className={`file-input file-input-bordered w-full pl-10 ${
                      errors.image ? "file-input-error" : ""
                    }`}
                  />
                </div>
                {errors.image && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.image.message}
                    </span>
                  </label>
                )}
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
                  placeholder="10.00"
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
                <span className="label-text font-medium">Prize Money ($)</span>
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
                  placeholder="500.00"
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
                placeholder="Describe your contest in detail. What are participants expected to do? What makes this contest exciting?"
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
              <span className="label-text font-medium">Task Instructions</span>
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
                placeholder="Provide clear instructions for participants. What should they submit? What format? Any specific requirements?"
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

          <div className="alert alert-info btn-gradient-primary-static">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>
              Your contest will be reviewed by admin before being published.
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-gradient-primary w-full"
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Creating Contest...
              </>
            ) : (
              <>
                <FaPaperPlane />
                Create Contest
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddContest;
