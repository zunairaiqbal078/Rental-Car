import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaCalendarAlt,
  FaCog,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../store/auth-slice";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../../api/authApi";

function UserSidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logoutUser());
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to log out!");
    }
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } text-gray-600 flex flex-col transition-all duration-300 shadow-lg `}
    >
      {/* Sidebar Toggle */}
      <div className="flex items-center px-4 py-4 shadow-sm">
        <h1
          className={`text-2xl font-bold text-cyan-950 flex-grow text-center ${
            !isSidebarOpen && "hidden"
          }`}
        >
          Dashboard
        </h1>
        <button
          className="m-auto text-xl "
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow p-4 space-y-2">
        {[
          {
            to: "/user/dashboard",
            label: "Dashboard",
            icon: <FaTachometerAlt />,
          },
          {
            to: "/user/booking",
            label: "My Bookings",
            icon: <FaCalendarAlt />,
          },
          {
            to: "/user/livechat",
            label: "Live Chat",
            icon: <IoChatbubblesOutline />,
          },
        ].map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-x-4 px-4 py-2 rounded-md text-sm font-medium  ${
                isActive
                  ? "bg-gradient-to-r from-cyan-900 to-blue-900 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-200  hover:scale-100"
              }`
            }
          >
            <span className="text-xl">{link.icon}</span>
            <span className={`${!isSidebarOpen && "hidden"}`}>
              {link.label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Settings Dropdown */}
      <div className="flex flex-col p-4 mb-4">
        <button
          onClick={() => setSettingsOpen(!isSettingsOpen)}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md gap-x-4 hover:bg-gray-200"
        >
          <FaCog className="text-xl" />
          <span className={`${!isSidebarOpen && "hidden"}`}>Settings</span>
        </button>

        {isSettingsOpen && (
          <div className="mt-2 space-y-2">
            <NavLink
              to="/user/profile"
              className={({ isActive }) =>
                `flex items-center gap-x-4 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-900 to-blue-900 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-200 hover:shadow-md    hover:scale-100"
                }`
              }
            >
              <FaUser className="text-xl" />
              <span className={`${!isSidebarOpen && "hidden"}`}>Profile</span>
            </NavLink>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-base font-semibold text-gray-600 transition-all duration-300 rounded-lg gap-x-4 hover:bg-red-600 hover:text-white"
            >
              <FaSignOutAlt className="text-xl" />
              <span className={`${!isSidebarOpen && "hidden"}`}>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserSidebar;
