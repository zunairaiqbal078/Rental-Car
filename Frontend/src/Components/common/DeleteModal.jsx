import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <FaExclamationTriangle className="w-12 h-12 mx-auto mb-4 text-red-600" />
          <h3 className="mb-4 text-lg font-medium text-gray-700">
            "Are you sure you want to delete this car?"
          </h3>
          <div className="flex justify-center space-x-4">
            <button
              className="px-5 py-2.5 text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
              onClick={onDelete}
            >
              Yes, Delete
            </button>
            <button
              className="px-5 py-2.5 text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:outline-none focus:ring-gray-100"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
