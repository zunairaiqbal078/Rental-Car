import React, { useState } from "react";

const ProfileEdit = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "", // New password
    confirmPassword: "", // Confirm password
    photo: user?.photo || "", // User photo URL
  });

  const [photoPreview, setPhotoPreview] = useState(user?.photo || "");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result); // Update the preview
        setFormData({ ...formData, photo: reader.result }); // Save photo data
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      return alert("Name and Email are required!");
    }
    if (formData.password && formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match!");
    }
    onSave(formData);
    console.log("formData", formData);
  };

  return (
    <div className="flex items-center justify-center h-[80%] mt-3">
      {/* Profile Edit Card */}
      <div className="w-full max-w-md p-6 bg-white ">
        {/* Title */}
        <h2 className="mb-6 text-xl font-semibold text-center text-gray-800">
          Edit Profile
        </h2>

        {/* Form Fields */}
        <div className="flex flex-col items-center">
          {/* Photo Upload */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={photoPreview || "https://via.placeholder.com/150"}
              alt="Profile Preview"
              className="w-32 h-32 mb-4 border-2 rounded-full shadow-md border-cyan-600"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="text-sm text-gray-600"
            />
          </div>

          {/* Name Field */}
          <div className="w-full mb-4">
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
          </div>

          {/* Email Field */}
          <div className="w-full mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
          </div>

          {/* Password Field */}
          <div className="w-full mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="w-full mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={handleSave}
            className="px-6 py-2 text-white transition bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:ring focus:ring-green-300"
          >
            Save Changes
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-2 text-white transition bg-gray-500 rounded-lg shadow-md hover:bg-gray-600 focus:ring focus:ring-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
