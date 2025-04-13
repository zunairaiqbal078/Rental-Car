import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaHome,
  FaCarAlt,
  FaInfoCircle,
  FaPhoneAlt,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import { Link, Navigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/auth-slice"; // Adjust path as needed
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Detect scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".profile-dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logged out successfully!");
    navigate("/login");
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const handleDashboardNavigation = () => {
    if (user?.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  // Close mobile menu when navigating
  const handleNavigation = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-md py-2"
            : "bg-white/90 backdrop-blur-sm py-4"
        }`}
      >
        <div className="flex items-center justify-between px-4 mx-auto max-w-7xl lg:px-8">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="src/assets/HomeImages/Logo.png"
              alt="Rental Car Logo"
              className="w-[110px]"
            />
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="items-center hidden md:flex">
            {[
              { to: "/", label: "Home", icon: <FaHome className="mr-2" /> },
              {
                to: "/explore",
                label: "Explore Cars",
                icon: <FaCarAlt className="mr-2" />,
              },
              {
                to: "/about",
                label: "About Us",
                icon: <FaInfoCircle className="mr-2" />,
              },
              {
                to: "/contact",
                label: "Contact",
                icon: <FaPhoneAlt className="mr-2" />,
              },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `mx-4 py-2 px-3 flex items-center rounded-md transition duration-200 relative ${
                    isActive
                      ? "text-blue-600 font-medium"
                      : "text-gray-700 hover:text-blue-500"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.icon}
                    {link.label}
                    {/* Animated underline for active link */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left animate-grow"></span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Profile or Login */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative profile-dropdown">
                <div
                  className="flex items-center p-1 space-x-2 rounded-full cursor-pointer hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                >
                  {user?.photo ? (
                    <img
                      src={user.photo}
                      alt="User Profile"
                      className="object-cover w-10 h-10 border-2 border-blue-500 rounded-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-gradient-to-r from-blue-500 to-blue-700">
                      {user?.name ? (
                        user.name.charAt(0).toUpperCase()
                      ) : (
                        <FaUserCircle size={24} />
                      )}
                    </div>
                  )}
                  <span className="hidden font-medium text-gray-700 sm:block">
                    {user?.name ? user.name.split(" ")[0] : "User"}
                  </span>
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 z-50 w-56 mt-2 overflow-hidden bg-white border border-gray-100 rounded-lg shadow-xl">
                    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-500/10 to-blue-700/10">
                      <p className="font-semibold">{user?.name || "User"}</p>
                      <p className="text-sm text-gray-500 truncate">
                        {user?.email || ""}
                      </p>
                    </div>

                    <button
                      onClick={handleDashboardNavigation}
                      className="flex items-center w-full px-4 py-3 text-sm text-left transition hover:bg-gray-50"
                    >
                      <FaTachometerAlt className="mr-3 text-blue-600" />
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-sm text-left text-red-600 transition border-t border-gray-100 hover:bg-red-50"
                    >
                      <FaSignOutAlt className="mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="px-5 py-2 font-medium text-white transition rounded-md bg-gradient-to-r from-blue-600 to-blue-800 hover:shadow-lg hover:from-blue-700 hover:to-blue-900">
                  Login
                </button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="p-2 text-gray-700 rounded-md hover:bg-gray-100 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <FaBars size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Menu - Half Width with Blur */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-white/90 backdrop-blur-md shadow-2xl z-50 transition-transform duration-300 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden overflow-y-auto`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <img
              src="src/assets/HomeImages/Logo.png"
              alt="Rental Car Logo"
              className="w-[100px]"
            />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-gray-700 rounded-full hover:bg-gray-100"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* User Profile Section */}
          {isAuthenticated && (
            <div className="flex items-center p-4 space-x-3 border-b">
              {user?.photo ? (
                <img
                  src={user.photo}
                  alt="User Profile"
                  className="w-12 h-12 border-2 border-blue-500 rounded-full"
                />
              ) : (
                <div className="flex items-center justify-center w-12 h-12 text-white rounded-full bg-gradient-to-r from-blue-500 to-blue-700">
                  {user?.name ? (
                    user.name.charAt(0).toUpperCase()
                  ) : (
                    <FaUserCircle size={28} />
                  )}
                </div>
              )}
              <div>
                <p className="font-semibold">{user?.name || "User"}</p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || ""}
                </p>
              </div>
            </div>
          )}

          {/* Mobile Navigation Links */}
          <nav className="flex-1 py-6">
            <ul className="px-3 space-y-1">
              {[
                { to: "/", label: "Home", icon: <FaHome /> },
                { to: "/explore", label: "Explore Cars", icon: <FaCarAlt /> },
                { to: "/about", label: "About Us", icon: <FaInfoCircle /> },
                { to: "/contact", label: "Contact", icon: <FaPhoneAlt /> },
              ].map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={handleNavigation}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-lg transition relative overflow-hidden ${
                        isActive
                          ? "text-blue-700 font-medium bg-blue-50"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`mr-3 ${isActive ? "text-blue-600" : ""}`}
                        >
                          {link.icon}
                        </span>
                        {link.label}
                        {isActive && (
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="p-4 mt-auto border-t">
            {isAuthenticated ? (
              <div className="space-y-2">
                <button
                  onClick={handleDashboardNavigation}
                  className="flex items-center justify-center w-full px-4 py-2 text-blue-700 transition rounded-lg bg-blue-50 hover:bg-blue-100"
                >
                  <FaTachometerAlt className="mr-2" />
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center w-full px-4 py-2 text-red-600 transition rounded-lg bg-red-50 hover:bg-red-100"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="block w-full"
                onClick={handleNavigation}
              >
                <button className="w-full px-4 py-3 font-medium text-white transition rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 hover:shadow-md hover:from-blue-700 hover:to-blue-900">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Content Spacer to prevent content from hiding under fixed header */}
      <div className={`${isScrolled ? "h-16" : "h-20"}`}></div>

      {/* Add this animation to your global CSS */}
      <style jsx global>{`
        @keyframes grow {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        .animate-grow {
          animation: grow 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}

export default Header;
