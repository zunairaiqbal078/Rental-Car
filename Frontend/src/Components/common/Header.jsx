import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import { Link, NavLink } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogin, setLogin] = useState(true);

  return (
    <header className="sticky text-white shadow-lg bg-cyan-950/100">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex">
          <img
            src="src/assets/HomeImages/Logo.png"
            alt="Rental Car Logo"
            className="w-[110px] pl-3"
          />
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="items-center hidden md:flex gap-x-8">
          {[
            { to: "/", label: "Home" },
            { to: "/explore", label: "Explore Cars" },
            { to: "/about", label: "About Us" },
            { to: "/contact", label: "Contact" },
            { to: "/reviews", label: "Reviews" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition duration-200 ${
                  isActive
                    ? "text-yellow-300 underline underline-offset-4"
                    : "hover:text-yellow-300"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Menu Icon and Login Button (Mobile) */}
        <div className="flex items-center space-x-4 md:hidden ">
          <div className="space-x-4 md:flex" onClick={() => setLogin(!isLogin)}>
            {isLogin ? (
              <>
                <Link to="/user">
                  <button className="px-4 py-2 text-teal-700 transition bg-white rounded-md hover:bg-gray-100">
                    <RxAvatar />
                  </button>
                </Link>
              </>
            ) : (
              <Link to="/auth/login">
                {" "}
                <button className="px-4 py-2 text-teal-700 transition bg-white rounded-md hover:bg-gray-100">
                  Login
                </button>
              </Link>
            )}
          </div>
          <div
            className="text-2xl cursor-pointer "
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        {/* Desktop Buttons */}
        <div
          className="hidden space-x-4 md:flex "
          onClick={() => setLogin(!isLogin)}
        >
          {isLogin ? (
            <>
              <Link to="/user">
                <button className="px-4 py-2 text-teal-700 transition bg-white rounded-md hover:bg-gray-100">
                  <RxAvatar />
                </button>{" "}
              </Link>
            </>
          ) : (
            <Link to="/auth/login">
              {" "}
              <button className="px-4 py-2 text-teal-700 transition bg-white rounded-md hover:bg-gray-100">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="text-white bg-black bg-opacity-20 md:hidden">
          <ul className="flex flex-col items-center py-6 space-y-6">
            {[
              { to: "/", label: "Home" },
              { to: "/explore", label: "Explore Cars" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact" },
              { to: "/reviews", label: "Reviews" },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-lg transition ${
                    isActive
                      ? "text-yellow-300 underline underline-offset-4"
                      : "hover:text-yellow-300"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
