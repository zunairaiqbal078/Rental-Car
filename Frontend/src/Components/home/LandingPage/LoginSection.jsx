import React from "react";
import { Link } from "react-router-dom";

function LoginSection() {
  return (
    <>
      <section className="px-6 py-6 mt-12 bg-white">
        <div className="flex flex-col items-center justify-center w-full p-6">
          <h1 className="max-w-lg px-2 mb-4 text-2xl font-bold ">
            <span className="text-yellow-500">Enjoy a Rs.500 </span>
            bonus after signup and registration of your account.
          </h1>
          <p className="w-[65%] mt-6 mb-2 leading-relaxed text-lg font-semibold text-gray-700">
            Sign up for an account and receive a 500 Rs bonus. This bonus will
            be added to your account balance immediately. To claim your bonus,
            follow these steps:
            <ul className="pl-6 list-disc">
              <li>Sign up for an account</li>
              <li>Choose a car</li>
              <li>Book a ride</li>
            </ul>
            <Link to="/login">
              {" "}
              <button className="px-6 py-3 mt-8 text-white transition bg-yellow-700 rounded-full hover:bg-yellow-600 ">
                Learn More
              </button>
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default LoginSection;
