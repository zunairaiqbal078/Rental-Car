import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { register as registerUser } from "../api/authApi";
import "aos/dist/aos.css";
import AOS from "aos";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // React Form Hook
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }

    reset();
  };

  const onHandlePassword = (e) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };

  const passwordDisplay = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div
        className="flex flex-row w-full max-w-4xl overflow-hidden rounded-lg shadow-lg bg-slate-100"
        data-aos="fade-up"
      >
        {/* Left Section */}

        <div className="flex flex-col justify-center w-full p-8 bg bg-gradient-to-t from-cyan-800/80 via-amber-200 to-cyan-900/70 lg:w-1/2">
          <h1
            className="text-3xl font-semibold text-gray-800"
            data-aos="fade-right"
          >
            New Here!
          </h1>
          <p
            className="mt-4 text-gray-600"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            Sign In and discover a great experience with us!
          </p>
          <img
            src="https://source.unsplash.com/400x300/?workspace,technology"
            alt="Login visual"
            className="w-full mt-6 rounded-lg"
            data-aos="zoom-in"
            data-aos-delay="400"
          />
        </div>
        {/* Right Section */}
        <div className="w-1/2 px-10 py-12">
          <h1
            className="text-3xl font-bold text-center text-gray-800"
            data-aos="fade-left"
          >
            Sign Up
          </h1>
          <p className="mt-2 text-center text-gray-600" data-aos="fade-left">
            Sign up for a new account
          </p>

          <form
            className="flex flex-col mt-6 space-y-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="name">Username:</label>
            <input
              id="name"
              placeholder="Username"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("name", {
                required: "Username Required*",
                pattern: {
                  value: /^(?=.*[a-zA-Z])[a-zA-Z0-9]{5,}$/,
                  message: "Username is shorter than 5 letters",
                },
              })}
            />
            {errors.name && (
              <p className="mt-0 text-xs italic text-red-500">
                {errors.name.message}
              </p>
            )}

            <label htmlFor="email">Email:</label>
            <input
              id="email"
              placeholder="Email"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "Email Required*",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs italic text-red-500">
                {errors.email.message}
              </p>
            )}

            <label htmlFor="password">Password:</label>
            <div className="relative flex flex-row">
              <input
                id="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("password", {
                  required: "Password Required*",
                  pattern: {
                    value:
                      " /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z]).{8}$/",
                    message:
                      "Password must be at least 8 characters long, contain uppercase, lowercase, a digit, and a special character",
                  },
                })}
                autoComplete="new-password"
              />
              <button
                className="absolute right-4 top-3"
                onClick={passwordDisplay}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs italic text-red-500">
                {errors.password.message}
              </p>
            )}

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <div className="relative flex flex-row">
              <input
                id="confirmPassword"
                placeholder="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("confirmPassword", {
                  required: "Confirm Password Required*",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                autoComplete="new-password"
              />
              <button
                className="absolute right-4 top-3"
                onClick={onHandlePassword}
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs italic text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}

            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 mt-6 text-white bg-yellow-700 rounded-md shadow-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Sign Up
              </button>
            </div>

            <div className="mt-6 text-center text-gray-500">
              Already have a member?{" "}
              <Link
                to="/login"
                className="font-medium text-cyan-950 hover:underline"
              >
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
