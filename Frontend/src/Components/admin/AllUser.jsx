import React, { useEffect, useState } from "react";
import axios from "axios";

function AllUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/admin/users", {
          withCredentials: true,
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen py-10 bg-gray-100">
      <div className="container mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
          All Users
        </h1>

        {loading ? (
          <div className="flex items-center justify-center">
            <div className="inline-block w-8 h-8 border-4 border-gray-500 rounded-full spinner-border animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg"
              >
                <div className="flex items-center justify-center w-16 h-16 text-2xl font-bold text-gray-500 bg-gray-200 rounded-full">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllUser;
