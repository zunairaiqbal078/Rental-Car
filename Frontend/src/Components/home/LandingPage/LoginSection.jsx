import React from "react";
import { Link } from "react-router-dom";

function LoginSection() {
  return (
    <>
      <section className="px-6 py-6 bg-white">
        <div className="flex flex-col justify-between mx-6 gap-7 md:flex-row">
          <div className="w-full md:w-1/2">
            <img
              src="src/assets/HomeImages/img1.png"
              alt="promo Section"
              className="rounded-sm"
            />
          </div>
          <div className="w-full p-6 md:w-1/2">
            <h1 className="max-w-sm px-2 mb-4 text-2xl font-bold">
              <span className="text-yellow-400">Enjoy a Rs.500 </span>
              bonus after signup and registration of your account.
            </h1>
            <p className="w-[85%] mt-1 mb-2 leading-relaxed text-gray-700">
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
                <button className="px-6 py-3 mt-3 text-white transition bg-blue-600 rounded-full hover:bg-blue-700 ml-7">
                  Learn More
                </button>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginSection;
