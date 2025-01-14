import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaCar,
  FaCalendarAlt,
  FaUserFriends,
  FaListAlt,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function AdminSidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-18"
      } bg-cyan-900 text-white flex flex-col transition-all duration-300`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-600">
        <h1 className={`text-lg font-bold ${!isSidebarOpen && "hidden"}`}>
          LuxeRental
        </h1>
        <button
          className="px-4 text-xl"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <nav className="flex-grow p-4 space-y-2">
        {[
          {
            to: "/admin/dashboard",
            label: "Dashboard",
            icon: <FaTachometerAlt />,
          },
          {
            to: "/admin/users",
            label: "Users",
            icon: <FaUserFriends />,
          },
          {
            to: "/admin/messages",
            label: "Messages",
            icon: <IoChatbubblesOutline />,
          },
          {
            to: "/admin/category",
            label: "Categories",
            icon: <FaListAlt />,
          },
          {
            to: "/admin/cars",
            label: "Cars",
            icon: <FaCar />,
          },
          {
            to: "/admin/booking",
            label: "Bookings",
            icon: <FaCalendarAlt />,
          },
          {
            to: "/admin/profile",
            label: "Profile",
            icon: <FaUserCircle />,
          },
          {
            to: "/admin/livechat",
            label: "Live Chat",
            icon: <IoChatbubblesOutline />,
          },
        ].map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-x-4 px-4 py-2 rounded-md text-sm font-medium ${
                isActive ? "bg-yellow-300 text-cyan-950" : "hover:bg-cyan-800"
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>
            <span className={`${!isSidebarOpen && "hidden"}`}>
              {link.label}
            </span>
          </NavLink>
        ))}
        <button className="flex items-center px-4 py-2 text-sm font-medium rounded-md gap-x-4 hover:bg-cyan-800">
          <span className="text-lg">
            <FaSignOutAlt />
          </span>
          <span className={`${!isSidebarOpen && "hidden"}`}>Logout </span>
        </button>
      </nav>
    </div>
  );
}

export default AdminSidebar;
