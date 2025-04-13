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
      }  text-gray-600 flex flex-col transition-all duration-300 shadow-lg `}
    >
      {/* Sidebar Header */}
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

      <nav className="flex-grow p-4 space-y-2">
        {/* Sidebar Links */}
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-x-4 px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-cyan-900 to-blue-900 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-200  hover:scale-100"
            }`
          }
        >
          <FaTachometerAlt className="text-xl" />
          <span className={`${!isSidebarOpen && "hidden"}`}>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center gap-x-4 px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-cyan-900 to-blue-900 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-200 hover:shadow-md    hover:scale-100"
            }`
          }
        >
          <FaUsers className="text-xl" />
          <span className={`${!isSidebarOpen && "hidden"}`}>Users</span>
        </NavLink>

        {/* Categories Dropdown */}
        <div>
          <button
            onClick={() => setCategoriesOpen(!isCategoriesOpen)}
            className="flex items-center justify-between w-full px-4 py-3 text-base font-semibold text-gray-600 transition-all duration-300 rounded-lg hover:bg-gray-200 "
          >
            <div className="flex items-center gap-x-4">
              <FaListAlt className="text-xl" />
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
            <div className="space-y-2 ">
              <NavLink
                to="/admin/new-car"
                className={({ isActive }) =>
                  `flex items-center gap-x-4 px-4 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-900 to-blue-900 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-200 hover:shadow-md    hover:scale-100"
                  }`
                }
              >
                <FaCar className="text-lg" />
                <span className={`${!isSidebarOpen && "hidden"}`}>New Car</span>
              </NavLink>
              <NavLink
                to="/admin/cars"
                className={({ isActive }) =>
                  `flex items-center gap-x-4 px-4 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-900 to-blue-900 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-200 hover:shadow-md    hover:scale-100"
                  }`
                }
              >
                <FaCar className="text-lg" />
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
            `flex items-center gap-x-4 px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-cyan-900 to-blue-900 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-200 hover:shadow-md    hover:scale-100"
            }`
          }
        >
          <FaCalendarAlt className="text-xl" />
          <span className={`${!isSidebarOpen && "hidden"}`}>Bookings</span>
        </NavLink>

        <NavLink
          to="/admin/livechat"
          className={({ isActive }) =>
            `flex items-center gap-x-4 px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-cyan-900 to-blue-900 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-200 hover:shadow-md    hover:scale-100"
            }`
          }
        >
          <IoChatbubblesOutline className="text-xl" />
          <span className={`${!isSidebarOpen && "hidden"}`}>Live Chat</span>
        </NavLink>
      </nav>

      {/* Settings Dropdown */}
      <div className="flex flex-col p-4 mb-4">
        <button
          onClick={() => setSettingsOpen(!isSettingsOpen)}
          className="flex items-center px-4 py-3 text-base font-semibold text-gray-600 transition-all duration-300 rounded-lg gap-x-4 hover:bg-gray-200 "
        >
          <FaCog className="text-xl" />
          <span className={`${!isSidebarOpen && "hidden"}`}>Settings</span>
        </button>

        {isSettingsOpen && (
          <div className="mt-2 space-y-2">
            <NavLink
              to="/admin/profile"
              className={({ isActive }) =>
                `flex items-center gap-x-4 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-900 to-blue-900 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-200 hover:shadow-md    hover:scale-100"
                }`
              }
            >
              <FaUser className="text-lg" />
              <span className={`${!isSidebarOpen && "hidden"}`}>Profile</span>
            </NavLink>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-base font-semibold text-gray-600 transition-all duration-300 rounded-lg gap-x-4 hover:bg-red-600 hover:text-white"
            >
              <FaSignOutAlt className="text-lg" />
              <span className={`${!isSidebarOpen && "hidden"}`}>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminSidebar;
