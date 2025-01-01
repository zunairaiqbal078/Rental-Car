import React, { useState } from "react";
import {
  IoIosArrowDropupCircle,
  IoIosArrowDropdownCircle,
} from "react-icons/io";
import { options } from "../../../Data/FAQ";
import { Link } from "react-router-dom";

function HelpUsSection() {
  const [operator, setOperator] = useState(null);
  return (
    <>
      <section className="px-6 py-12 bg-gradient-to-l from-teal-500/20 via-cyan-700/2 to-cyan-800/25">
        <div className="flex flex-col justify-between mx-6 gap-7 md:flex-row ">
          <div className="w-full p-6 border rounded-lg shadow-lg md:w-1/2">
            <h1 className="max-w-sm px-2 mb-20 text-2xl font-bold">
              <span className="text-yellow-400">Help Us </span>
              to keep you safe from scam and fraud
            </h1>
            <div className="space-y-4 ">
              {options.map((faq) => (
                <details
                  key={faq.id}
                  open={operator === faq.id}
                  className="px-2 py-2 font-serif border border-gray-300 rounded-md group hover:border-blue-600"
                >
                  <summary className="flex items-center justify-between text-lg font-medium ">
                    {faq.title}
                    <span
                      className="text-xl font-extrabold transition-transform transform cursor-pointer hover:text-blue-600"
                      onClick={(e) => {
                        e.preventDefault();
                        setOperator(operator === faq.id ? null : faq.id);
                      }}
                    >
                      {operator === faq.id ? (
                        <IoIosArrowDropupCircle className="text-xl text-gray-800 hover:text-blue-600" />
                      ) : (
                        <IoIosArrowDropdownCircle className="text-xl text-gray-800 hover:text-blue-600" />
                      )}
                    </span>
                  </summary>
                  {operator === faq.id && (
                    <p className="mt-2 text-gray-700">{faq.description}</p>
                  )}
                </details>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start w-full md:w-1/2">
            <p className="w-[85%] mt-6 mb-4 leading-relaxed text-gray-700 pl-7">
              At LuxeRental, we're working hard to make out platform as secure
              as it can be.But when when scams do happen, we want exactly how to
              avoid and report them.Follow our tips to help us keep you safe.
            </p>
            <Link to="/about">
              {" "}
              <button className="px-6 py-3 text-white transition bg-blue-600 rounded-full hover:bg-blue-700 ml-7">
                Learn More
              </button>
            </Link>
            <img
              className="items-end w-[85%] mt-6 rounded-lg shadow-sm max-md:w-[90%]"
              src="src/assets/HomeImages/image3.png"
              alt="Promotional Image"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default HelpUsSection;
