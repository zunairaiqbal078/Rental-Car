import React from "react";

const ProfileView = ({ user, onEdit }) => {
  // Extract first letter of the user's name (fallback to 'U' if name is missing)
  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="flex items-center flex-col justify-center min-h-[80vh]">
      <h1 className="mb-5 text-3xl font-bold text-center">Profile</h1>

      {/* Profile Card */}
      <div className="w-full max-w-md p-8 transition-all duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl">
        {/* User Photo or First Letter */}
        <div className="relative flex flex-col items-center">
          <div className="absolute top-0 w-32 h-32 rounded-full opacity-50 bg-gradient-to-r from-blue-200 to-cyan-300 blur-md"></div>

          <div className="relative">
            {user?.photo ? (
              <img
                src={user.photo}
                alt=""
                className="z-10 object-cover w-32 h-32 border-4 border-white rounded-full shadow-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = ""; // Fallback to letter avatar if image fails
                }}
              />
            ) : (
              <div className="flex items-center justify-center w-32 h-32 text-4xl font-bold text-white border-4 border-white rounded-full shadow-lg bg-cyan-600">
                {firstLetter}
              </div>
            )}
          </div>

          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {user?.name || "User Name"}
          </h2>
          <div className="flex items-center mt-1 space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-cyan-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <p className="text-sm text-gray-500">
              {user?.email || "example@email.com"}
            </p>
          </div>
        </div>

        {/* User Information Section */}
        <div className="pt-6 mt-8 border-t border-gray-100">
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="leading-relaxed text-center text-gray-700">
              Hello{" "}
              <span className="font-semibold text-cyan-800">
                {user?.name || "User"}!
              </span>
              ,
              <br />
              This is your personal profile space. Manage your profile settings
              below.
            </p>
          </div>

          {/* Buttons Section */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={onEdit}
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-900 to-blue-900 text-white rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
