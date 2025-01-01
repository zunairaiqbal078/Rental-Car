import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/auth-slice";
function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
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

  const onSubmit = (data) => {
    dispatch(registerUser(data))
      .unwrap()
      .then(() => {
        setTimeout(() => {
          navigate("/auth/login");
        }, 3000);
      })
      .catch((error) => {
        console.error("Registration failed: ", error);
      });

    reset();
  };

  const onHandlepassword = (e) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };
  const passwordDisplay = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-row w-full max-w-4xl overflow-hidden rounded-lg shadow-lg bg-slate-100">
        <div className="flex flex-col items-center justify-center w-1/2 text-white bg-gradient-to-r from-purple-800 via-teal-600 to-emerald-700">
          <h2 className="text-3xl font-bold">Already Member?</h2>
          <p className="mt-2 text-center text-gray-200">
            Sign In and discover a great experience with us!
          </p>
          <img
            className="w-1/2 mt-10 mb-8"
            src="../assets/signup.png"
            alt=" image"
          />
          <Link to="/auth/login">
            <button className="px-6 py-2 mt-6 text-lg font-semibold bg-white rounded-md text-neutral-700 hover:focus:outline-none focus:ring-2 focus:ring-indigo-300">
              Log In
            </button>
          </Link>
        </div>
        <div className="w-1/2 px-10 py-12">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Sign Up
          </h1>
          <p className="mt-2 text-center text-gray-600">
            Sign Up to new account
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
                  message: " UserName is shorter than 8 letters",
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
                  value: " /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i",
                  message: "invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs italic text-red-500">
                {errors.email.message}
              </p>
            )}
            <label htmlFor="password">Password:</label>
            <div className="relative flex flex-row ">
              <input
                id="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("password", {
                  required: "Password Required*",
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z]).{8}$/,
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
            <div className="relative flex flex-row ">
              <input
                id="confirmPassword"
                placeholder="Password"
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("confirmPassword", {
                  required: "Confirm password Required*",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                autoComplete=" newpassword"
              />
              <button
                className="absolute right-4 top-3"
                onClick={onHandlepassword}
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs italic text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
            <div className="">
              <button
                type="submit"
                className="w-full px-4 py-2 mt-8 text-white rounded-md bg-gradient-to-r from-purple-600 to-emerald-500 hover:focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
