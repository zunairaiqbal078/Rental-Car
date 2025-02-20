import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { IoLogoLinkedin } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setUser } from "../store/auth-slice";
import { login } from "../api/authApi";
import { toast } from "react-toastify";
import "aos/dist/aos.css";
import AOS from "aos";

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

  React.useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      dispatch(setUser(response));
      const role = response.user.role;
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
    reset();
  };

  const passwordDisplay = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white-100">
      <div
        className="flex flex-col w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow-lg lg:flex-row"
        data-aos="fade-up"
      >
        {/* Left Section */}
        <div className="flex flex-col justify-center w-full p-8 bg bg-gradient-to-t from-cyan-800/80 via-amber-200 to-cyan-900/70 lg:w-1/2">
          <h1
            className="text-3xl font-semibold text-gray-800"
            data-aos="fade-right"
          >
            Welcome Back!
          </h1>
          <p
            className="mt-4 text-gray-600"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            Log in to access your account and continue your journey with us.
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
        <div className="flex flex-col justify-center w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Log In
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Access your account quickly and securely.
          </p>

          <form
            className="flex flex-col mt-8 space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                id="email"
                placeholder="Enter your email"
                type="text"
                className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password:
              </label>
              <div className="relative">
                <input
                  id="password"
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("password", {
                    required: "Password Required*",
                  })}
                  autoComplete="new-password"
                />
                <button
                  className="absolute text-gray-500 right-3 top-4"
                  onClick={passwordDisplay}
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-between text-sm text-gray-500">
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-yellow-700 rounded-lg shadow-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Log In
            </button>

            <div className="text-center text-gray-500">Or login with</div>
            <div className="flex justify-center space-x-6 text-2xl">
              <FcGoogle className="cursor-pointer" />
              <BiLogoFacebookCircle className="text-blue-600 cursor-pointer" />
              <IoLogoLinkedin className="text-blue-700 cursor-pointer" />
            </div>
          </form>

          <div className="mt-6 text-center text-gray-500">
            New here?{" "}
            <Link
              to="/signup"
              className="font-medium text-cyan-950 hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
