import React from "react";

const ProfileView = ({ user, onEdit, onLogout }) => {
  return (
    <div className="flex items-center justify-center h-[80%] mt-3">
      {/* Profile Card */}
      <div className="w-full max-w-md p-6 bg-white rounded-lg ">
        {/* User Photo */}
        <div className="flex flex-col items-center">
          <img
            src={user?.photo || "https://via.placeholder.com/150"}
            alt="User Profile"
            className="w-32 h-32 mb-4 border-2 rounded-full shadow-md border-cyan-600"
          />
          <h2 className="text-xl font-semibold text-gray-800">
            {user?.name || "User Name"}
          </h2>
          <p className="text-sm text-gray-500">
            {user?.email || "example@email.com"}
          </p>
        </div>

        {/* User Information Section */}
        <div className="pt-4 mt-6 border-t">
          <div className="text-center">
            <p className="text-gray-600">
              Hello{" "}
              <span className="font-semibold">{user?.name || "User"}</span>,
              this is your profile. Manage your details or logout below.
            </p>
          </div>

          {/* Buttons Section */}
          <div className="flex justify-center mt-8 mb-6 space-x-4">
            <button
              onClick={onEdit}
              className="px-6 py-2 text-white transition bg-yellow-400 rounded-lg shadow-md hover:bg-yellow-300 focus:ring focus:ring-blue-200"
            >
              Edit Profile
            </button>
            <button
              onClick={onLogout}
              className="px-6 py-2 text-white transition bg-red-500 rounded-lg shadow-md hover:bg-red-600 focus:ring focus:ring-red-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
