import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

function UserHeader() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleProfileClick = () => {
    navigate("/user/profile");
  };

  // Get the first letter of the user's name (fallback to 'U' if name is missing)
  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <header className="flex items-center justify-between px-4 py-3 shadow-md opacity-75 bg-gradient-to-r from-cyan-900 to-blue-900">
      {/* Logo */}
      <div className="text-xl font-bold text-white">
        <Link to="/">LuxeRental</Link>
      </div>

      {/* Profile Section */}
      <div className="relative flex items-center gap-3">
        <div className="font-semibold text-center text-white text-md">
          {user?.name ? `${user?.name} !` : "User"}
        </div>

        <div
          className="flex items-center justify-center w-10 h-10 overflow-hidden text-lg font-bold text-white bg-gray-300 rounded-full cursor-pointer"
          onClick={handleProfileClick}
        >
          {user?.photo ? (
            <img
              src={user.photo}
              alt=""
              className="object-cover w-full h-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = ""; // Fallback to letter avatar if image fails
              }}
            />
          ) : (
            <span className="flex items-center justify-center w-full h-full bg-cyan-600">
              {firstLetter}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

export default UserHeader;
