import React from "react";
import { FaUserCircle } from "react-icons/fa";

import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
function UserHeader() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleProfileClick = () => {
    navigate("/user/profile");
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
      {/* Logo */}
      <div className="text-xl font-bold text-gray-600">
        <Link to="/">LuxeRental</Link>
      </div>

      {/* Profile Section */}
      <div className="relative flex items-center gap-3">
        <div className="font-semibold text-center text-gray-700 text-md">
          {user?.name ? ` ${user?.name} !` : "User"}
        </div>
        <div
          className="w-10 h-10 overflow-hidden bg-gray-300 rounded-full cursor-pointer"
          onClick={handleProfileClick}
        >
          {user?.photo ? (
            <img
              src={user.photo}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          ) : (
            <FaUserCircle size={40} className="text-gray-500" />
          )}
        </div>
      </div>
    </header>
  );
}

export default UserHeader;
