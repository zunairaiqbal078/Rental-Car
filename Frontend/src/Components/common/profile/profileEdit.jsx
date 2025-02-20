import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  FaRegEyeSlash,
  FaRegEye,
  FaCamera,
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

const ProfileEdit = ({ user, onSave, onCancel }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(user?.photo || "");

  const togglePasswordVisibility = (e, field) => {
    e.preventDefault();
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      photo: user?.photo || "",
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);

      if (data.password) {
        formData.append("password", data.password);
      }

      if (data.file && data.file.length > 0) {
        formData.append("photo", data.file[0]);
      }

      await onSave(formData);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to update profile!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]  p-4 ">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Update Your Profile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Profile Photo */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <div className="w-32 h-32 overflow-hidden transition duration-300 border-4 rounded-full shadow-lg border-cyan-100 group-hover:border-cyan-200">
                <img
                  src={
                    previewImage ||
                    "https://via.placeholder.com/128?text=Profile"
                  }
                  alt="Profile Preview"
                  className="object-cover w-full h-full"
                />
              </div>
              <label
                htmlFor="file"
                className="absolute bottom-0 right-0 p-2 transition duration-300 rounded-full shadow-md cursor-pointer bg-cyan-500 hover:bg-cyan-600"
              >
                <FaCamera className="text-white" />
              </label>
              <input
                id="file"
                type="file"
                accept="image/*"
                className="hidden"
                {...register("file")}
                onChange={handleFileChange}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Click the camera icon to update your photo
            </p>
          </div>

          {/* Name Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaUser className="text-gray-400" />
            </div>
            <input
              id="name"
              placeholder="Your Name"
              type="text"
              className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border ${
                errors.name ? "border-red-300" : "border-gray-200"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300`}
              {...register("name", {
                required: "Username Required*",
                pattern: {
                  value: /^(?=.*[a-zA-Z])[a-zA-Z0-9]{5,}$/,
                  message: "Username must be at least 5 characters",
                },
              })}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaEnvelope className="text-gray-400" />
            </div>
            <input
              id="email"
              placeholder="Your Email"
              type="text"
              className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border ${
                errors.email ? "border-red-300" : "border-gray-200"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300`}
              {...register("email", {
                required: "Email Required*",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaLock className="text-gray-400" />
            </div>
            <input
              id="password"
              placeholder="New Password (Optional)"
              type={showPassword ? "text" : "password"}
              className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
              {...register("password", {
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
                  message:
                    "Password must contain uppercase, lowercase, digit, and special character",
                },
              })}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              onClick={(e) => togglePasswordVisibility(e, "password")}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaLock className="text-gray-400" />
            </div>
            <input
              id="confirmPassword"
              placeholder="Confirm New Password"
              type={showConfirmPassword ? "text" : "password"}
              className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
              {...register("confirmPassword", {
                validate: (value) =>
                  !password || value === password || "Passwords do not match",
              })}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              onClick={(e) => togglePasswordVisibility(e, "confirm")}
            >
              {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              type="submit"
              className="px-6 py-2 text-white transition-all duration-200 transform rounded-full shadow-md hover:scale-105 bg-cyan-700 hover:bg-cyan-800 focus:ring focus:ring-cyan-300"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-white transition-all duration-200 transform bg-gray-500 rounded-full shadow-md hover:scale-105 hover:bg-gray-600 focus:ring focus:ring-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
