import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createCar } from "../../../api/carApi";

import {
  FaCar,
  FaMapMarkerAlt,
  FaGasPump,
  FaImages,
  FaUpload,
  FaTrash,
} from "react-icons/fa";

const steps = [
  { icon: <FaCar />, label: "Car Details" },
  { icon: <FaMapMarkerAlt />, label: "Location & Pricing" },
  { icon: <FaGasPump />, label: "Fuel & Details" },
  { icon: <FaImages />, label: "Images & Description" },
];

export default function CreateCar() {
  const [activeStep, setActiveStep] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
    watch,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      availability: true,
    },
  });

  const handleNext = async () => {
    const fieldsToValidate = {
      0: ["name", "type", "brand"],
      1: ["location", "pricePerDay", "availability"],
      2: ["mileage", "fuelType"],
      3: ["description"],
    }[activeStep];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);

    // Create preview URLs for the newly added images
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));

    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    if (images.length === 0) {
      alert("Please upload at least one image of the car");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();

      // Append text fields
      Object.keys(data).forEach((key) => {
        if (data[key] !== undefined) formData.append(key, data[key]);
      });

      // Append images
      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await createCar(formData);

      toast.success("Car created successfully!");
      reset();
      setImages([]);
      setPreviewUrls([]);
      setActiveStep(0);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl p-8 mx-auto mt-8 bg-white shadow-xl rounded-xl">
      <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
        Add New Car
      </h1>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 ${
                  index < activeStep
                    ? "bg-green-500 text-white"
                    : index === activeStep
                    ? "bg-cyan-800 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {index < activeStep ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span className="text-xl">{step.icon}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-24 h-1 mx-2 transition-all duration-200 ${
                    index < activeStep ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
            <span
              className={`mt-2 text-sm font-medium transition-all duration-200 ${
                index === activeStep
                  ? "text-cyan-800"
                  : index < activeStep
                  ? "text-green-500"
                  : "text-gray-500"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1: Car Details */}
        {activeStep === 0 && (
          <div className="p-6 rounded-lg shadow-inner bg-gray-50">
            <h2 className="mb-4 text-xl font-semibold text-gray-700">
              Car Details
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Car Name *
                </label>
                <input
                  {...register("name", {
                    required: "Car name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  placeholder="e.g. Toyota Camry 2023"
                  className="w-full p-3 transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Brand *
                </label>
                <input
                  {...register("brand", { required: "Brand is required" })}
                  placeholder="e.g. Toyota, Honda, BMW"
                  className="w-full p-3 transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.brand && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.brand.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Car Type *
                </label>
                <select
                  {...register("type", {
                    required: "Please select a car type",
                  })}
                  className="w-full p-3 transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Car Type</option>
                  <option value="Suv">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Convertible">Convertible</option>
                  <option value="Truck">Truck</option>
                  <option value="Luxury">Luxury</option>
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.type.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Location & Pricing */}
        {activeStep === 1 && (
          <div className="p-6 rounded-lg shadow-inner bg-gray-50">
            <h2 className="mb-4 text-xl font-semibold text-gray-700">
              Location & Pricing
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Location *
                </label>
                <select
                  {...register("location", {
                    required: "Please select a location",
                  })}
                  className="w-full p-3 transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Location</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Sahiwal">Sahiwal</option>
                  <option value="Okara">Okara</option>
                </select>
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.location.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Price Per Day (USD) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    {...register("pricePerDay", {
                      required: "Price is required",
                      min: {
                        value: 1,
                        message: "Price must be greater than 0",
                      },
                    })}
                    type="number"
                    placeholder="100"
                    className="w-full p-3 pl-8 transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {errors.pricePerDay && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.pricePerDay.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Availability Status
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="true"
                      {...register("availability")}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Available for rent
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="false"
                      {...register("availability")}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Not available
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Fuel & Mileage */}
        {activeStep === 2 && (
          <div className="p-6 rounded-lg shadow-inner bg-gray-50">
            <h2 className="mb-4 text-xl font-semibold text-gray-700">
              Fuel & Details
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Fuel Type *
                </label>
                <select
                  {...register("fuelType", {
                    required: "Please select a fuel type",
                  })}
                  className="w-full p-3 transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Fuel Type</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                </select>
                {errors.fuelType && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.fuelType.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Mileage (KM) *
                </label>
                <input
                  {...register("mileage", {
                    required: "Mileage is required",
                    min: {
                      value: 1,
                      message: "Mileage must be greater than 0",
                    },
                  })}
                  type="number"
                  placeholder="e.g. 45000"
                  className="w-full p-3 transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.mileage && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.mileage.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Images & Description */}
        {activeStep === 3 && (
          <div className="p-6 rounded-lg shadow-inner bg-gray-50">
            <h2 className="mb-4 text-xl font-semibold text-gray-700">
              Images & Description
            </h2>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Upload Images *
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FaUpload className="w-8 h-8 mb-3 text-gray-400" />
                    {/* <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p> */}
                    <p className="text-xs text-gray-500">
                      PNG, JPG or JPEG (MAX. 5MB each)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    onChange={handleImageUpload}
                    accept="image/png, image/jpeg, image/jpg"
                  />
                </label>
              </div>
            </div>

            {previewUrls.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-2 text-sm font-medium text-gray-700">
                  Image Previews
                </h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="object-cover w-full h-24 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute p-1 text-white transition-opacity duration-200 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 top-1 right-1"
                      >
                        <FaTrash className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 20,
                    message: "Description must be at least 20 characters long",
                  },
                })}
                rows="4"
                placeholder="Provide a detailed description of the car including its features, condition, etc."
                className="w-full p-3 transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          {activeStep > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-200"
            >
              Back
            </button>
          )}

          {activeStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 text-white bg-cyan-800 rounded-lg shadow-sm hover:bg-cyan-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-200"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 text-white bg-cyan-800 rounded-lg shadow-sm hover:bg-cyan-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">Submitting...</span>
              ) : (
                "Submit Car"
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
