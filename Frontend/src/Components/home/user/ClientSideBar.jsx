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
      } bg-gradient-to-r from-cyan-900 to-blue-900 text-white flex flex-col transition-all duration-300`}
    >
      {/* Sidebar Toggle */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-700">
        <button
          className="px-4 text-xl text-white"
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
              `flex items-center gap-x-4 px-4 py-2 rounded-md text-sm font-medium ${
                isActive ? "bg-yellow-500 text-white" : "hover:bg-gray-600"
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>
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
          className="flex items-center px-4 py-2 text-sm font-medium text-white rounded-md gap-x-4 hover:bg-gray-700"
        >
          <FaCog className="text-lg" />
          <span className={`${!isSidebarOpen && "hidden"}`}>Settings</span>
        </button>

        {isSettingsOpen && (
          <div className="mt-2 space-y-2">
            <NavLink
              to="/user/profile"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md gap-x-4 hover:bg-gray-700"
            >
              <FaUser className="text-md" />
              <span className={`${!isSidebarOpen && "hidden"}`}>Profile</span>
            </NavLink>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-white rounded-md gap-x-4 hover:bg-gray-700"
            >
              <FaSignOutAlt className="text-md" />
              <span className={`${!isSidebarOpen && "hidden"}`}>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserSidebar;
