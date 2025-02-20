import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaCar,
  FaCalendarAlt,
  FaUsers,
  FaListAlt,
  FaChevronDown,
  FaChevronRight,
  FaCog,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
import { logout } from "../../api/authApi";

function AdminSidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isCategoriesOpen, setCategoriesOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logoutUser());
      navigate("/");
    } catch (error) {
      toast.error("Failed to log out!");
    }
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-18"
      } bg-gradient-to-r from-cyan-900 to-blue-900 text-white flex flex-col transition-all duration-300`}
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
        {/* Sidebar Links */}
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-x-4 px-4 py-2 rounded-md text-sm font-medium ${
              isActive ? "bg-yellow-500 text-white" : "hover:bg-gray-600"
            }`
          }
        >
          <FaTachometerAlt className="text-lg" />
          <span className={`${!isSidebarOpen && "hidden"}`}>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center gap-x-4 px-4 py-2 rounded-md text-sm font-medium ${
              isActive ? "bg-yellow-500 text-white" : "hover:bg-gray-600"
            }`
          }
        >
          <FaUsers className="text-lg" />
          <span className={`${!isSidebarOpen && "hidden"}`}>Users</span>
        </NavLink>

        {/* Categories Dropdown */}
        <div>
          <button
            onClick={() => setCategoriesOpen(!isCategoriesOpen)}
            className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700"
          >
            <div className="flex items-center gap-x-4">
              <FaListAlt className="text-lg" />
              <span className={`${!isSidebarOpen && "hidden"}`}>
                Categories
              </span>
            </div>
            {isSidebarOpen && (
              <span>
                {isCategoriesOpen ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            )}
          </button>

          {isCategoriesOpen && (
            <div className="space-y-2">
              <NavLink
                to="/admin/new-car"
                className={({ isActive }) =>
                  `flex items-center gap-x-4 px-4 py-2 rounded-md text-sm font-medium ${
                    isActive ? "bg-yellow-500 text-white" : "hover:bg-gray-600"
                  }`
                }
              >
                <FaCar className="text-md" />
                <span className={`${!isSidebarOpen && "hidden"}`}>New Car</span>
              </NavLink>
              <NavLink
                to="/admin/cars"
                className={({ isActive }) =>
                  `flex items-center gap-x-4 px-4 py-2 rounded-md text-sm font-medium ${
                    isActive ? "bg-yellow-500 text-white" : "hover:bg-gray-600"
                  }`
                }
              >
                <FaCar className="text-md" />
                <span className={`${!isSidebarOpen && "hidden"}`}>
                  Car Lists
                </span>
              </NavLink>
            </div>
          )}
        </div>

        <NavLink
          to="/admin/booking"
          className={({ isActive }) =>
            `flex items-center gap-x-4 px-4 py-2 rounded-md text-sm font-medium ${
              isActive ? "bg-yellow-500 text-white" : "hover:bg-gray-600"
            }`
          }
        >
          <FaCalendarAlt className="text-lg" />
          <span className={`${!isSidebarOpen && "hidden"}`}>Bookings</span>
        </NavLink>

        <NavLink
          to="/admin/livechat"
          className={({ isActive }) =>
            `flex items-center gap-x-4 px-4 py-2 rounded-md text-sm font-medium ${
              isActive ? "bg-yellow-500 text-white" : "hover:bg-gray-600"
            }`
          }
        >
          <IoChatbubblesOutline className="text-lg" />
          <span className={`${!isSidebarOpen && "hidden"}`}>Live Chat</span>
        </NavLink>
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
              to="/admin/profile"
              className={({ isActive }) =>
                `flex items-center gap-x-4 px-4 py-2 rounded-md text-sm font-medium ${
                  isActive ? "bg-yellow-500 text-white" : "hover:bg-gray-600"
                }`
              }
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

export default AdminSidebar;
