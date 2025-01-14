import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaCalendarAlt,
  FaUserCircle,
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logoutUser());
      toast.success("Logged out successfully!");
      navigate("/");
      handleLogout;
    } catch (error) {
      toast.error("Failed to log out!");
    }
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } bg-cyan-900 text-white flex flex-col transition-all duration-300`}
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
            to: "/user/profile",
            label: "Profile",
            icon: <FaUserCircle />,
          },
          {
            to: "/user/booking",
            label: "Bookings",
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
                isActive ? "bg-yellow-300 text-white" : "hover:bg-gray-800"
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

      <div className="flex flex-col p-4 mb-4 ">
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 text-sm font-medium text-white rounded-md gap-x-4 hover:bg-gray-800"
        >
          <span className="text-lg">
            <FaSignOutAlt />
          </span>
          <span className={`${!isSidebarOpen && "hidden"}`}>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default UserSidebar;
