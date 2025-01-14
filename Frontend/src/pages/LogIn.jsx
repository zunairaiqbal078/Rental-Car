import React from "react";
import image from ".././assets/signup.png";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { IoLogoLinkedin } from "react-icons/io5";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/auth-slice";
import { login } from "../api/authApi";
import { toast } from "react-toastify";
function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      dispatch(setUser(response));
      const role = response.user.role;
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.message);
    }
    reset();
  };

  const passwordDisplay = (e) => {
    e.preventDefault();
    setShowPassword(true);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-row w-full max-w-4xl overflow-hidden rounded-lg shadow-lg h-fit bg-slate-100">
        <div className="w-1/2 px-10 py-12">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            LogIn
          </h1>
          <p className="mt-2 text-center text-gray-600">
            Log in to your account
          </p>

          <form
            className="flex flex-col mt-6 space-y-2"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                  message: "Password must be correct",
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
            <div className="flex justify-between text-sm text-gray-500">
              <a href="#" className="text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white rounded-md bg-gradient-to-r from-purple-600 to-emerald-500 hover:focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              Log In
            </button>
            <p className="pt-5">Login with </p>
            <div className="flex flex-row mx-6 text-2xl justify-evenly ">
              <FcGoogle />
              <BiLogoFacebookCircle className="text-blue-800" />
              <IoLogoLinkedin className="text-blue-800" />
            </div>
          </form>
        </div>

        <div className="flex flex-col items-center justify-center w-1/2 text-white bg-gradient-to-r from-purple-800 via-teal-600 to-emerald-700">
          <h2 className="text-3xl font-bold">New Here?</h2>
          <p className="mt-2 text-center text-gray-200">
            Sign up and discover a great experience with us!
          </p>
          <img className="w-1/2 mt-10 mb-8" src={image} alt=" image" />
          <Link to="/auth/signup">
            <button className="px-6 py-2 mt-6 text-lg font-semibold bg-white rounded-md text-neutral-700 hover:focus:outline-none focus:ring-2 focus:ring-indigo-300">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
