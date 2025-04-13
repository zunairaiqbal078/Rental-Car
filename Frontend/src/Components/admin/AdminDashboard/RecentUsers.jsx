import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersThunk, deleteUserThunk } from "../../../store/user-slice";
import { FaUserCircle, FaTrash, FaUserFriends } from "react-icons/fa";
import DeleteModal from "../../common/DeleteModal";
import { Link } from "react-router-dom";

const RecentUsers = () => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.users);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  // Get only the 7 most recent users
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 7);

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      dispatch(deleteUserThunk(selectedUser._id));
      setIsDeleteOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border border-gray-100 shadow-lg rounded-xl">
      {/* Header */}
      <div className="p-6 text-white bg-gradient-to-r from-cyan-900 to-blue-900 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Recent Users</h2>
            <p className="mt-1 text-blue-100">Monitor new registrations</p>
          </div>
          <div className="flex items-center px-4 py-2 space-x-3 rounded-lg bg-white/20 backdrop-blur-sm">
            <FaUserFriends className="w-5 h-5" />
            <div>
              <Link to="/admin/users">
                <p className="text-xs opacity-80"> View All Users</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* User List */}
      {isLoading ? (
        <div className="flex items-center justify-center flex-grow">
          <div className="w-10 h-10 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      ) : (
        <div className="flex-grow px-6 py-4 overflow-auto">
          {recentUsers.length === 0 ? (
            <div className="py-12 mt-4 text-center rounded-lg bg-gray-50">
              <FaUserCircle className="w-16 h-16 mx-auto text-gray-300" />
              <p className="mt-4 font-medium text-gray-600">No users found</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {recentUsers.map((user) => (
                <li
                  key={user._id}
                  className="flex items-center justify-between px-2 py-4 transition-colors rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 text-white rounded-full bg-gradient-to-r from-indigo-500 to-purple-500">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <button
                    className="p-2 text-red-500 transition-colors rounded-full hover:bg-red-50"
                    onClick={() => openDeleteModal(user)}
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onDelete={handleDeleteUser}
      />
    </div>
  );
};

export default RecentUsers;
