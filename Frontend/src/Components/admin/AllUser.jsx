import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersThunk, deleteUserThunk } from "../../store/user-slice";
import { FaUserCircle, FaTrash, FaSearch } from "react-icons/fa";
import DeleteModal from "../common/DeleteModal";
const AllUser = () => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.users);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  // Search filter
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="min-h-screen bg-gray-100">
      <div className="container max-w-6xl px-4 py-8 mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-600">Manage all registered users from here</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full py-3 pl-10 pr-3 bg-white border-none rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow">
            <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-hidden bg-white rounded-lg shadow">
            {filteredUsers.length === 0 ? (
              <div className="py-12 text-center">
                <FaUserCircle className="w-16 h-16 mx-auto text-gray-300" />
                <p className="mt-4 text-lg text-gray-500">No users found</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-cyan-900 to-blue-900">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-900 uppercase">
                      User
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-900 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-900 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {user.photo ? (
                            <img
                              src={user.photo}
                              alt={user.name}
                              className="object-cover w-10 h-10 rounded-full"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                            />
                          ) : null}
                          <div
                            className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-medium ${
                              user.photo ? "hidden" : "flex"
                            }`}
                          >
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button
                          className="inline-flex items-center justify-center w-8 h-8 text-red-600 transition-colors duration-200 rounded-full bg-red-50 hover:bg-red-100"
                          onClick={() => openDeleteModal(user)}
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onDelete={handleDeleteUser}
      />
    </div>
  );
};

export default AllUser;
