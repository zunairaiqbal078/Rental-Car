import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars, removeCar, editCar } from "../../store/car-slice";
import { Link, useNavigate } from "react-router-dom";
import { CiMenuKebab } from "react-icons/ci";
import { FaEye, FaEdit, FaTrashAlt, FaSearch } from "react-icons/fa";
import CarPreviewModal from "../common/PreviewModal";
import DeleteModal from "../common/DeleteModal";

const CarListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cars, isLoading, error } = useSelector((state) => state.cars);
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const toggleMenu = (e, carId) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === carId ? null : carId);
  };

  const handleEditCar = (car) => {
    navigate("/admin/new-car", { state: { car } });
  };

  const openPreviewModal = (car) => {
    setSelectedCar(car);
    setIsPreviewOpen(true);
  };

  const openDeleteModal = (car) => {
    setSelectedCar(car);
    setIsDeleteOpen(true);
  };

  const handleDeleteCar = () => {
    if (selectedCar) {
      dispatch(removeCar(selectedCar._id));
      setIsDeleteOpen(false);
    }
  };

  const filteredCars = cars.filter(
    (car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-b-4 rounded-full border-cyan-700 animate-spin"></div>
          <p className="mt-4 text-xl font-semibold text-gray-700">
            Loading cars...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl p-6 mx-auto rounded-lg bg-red-50">
        <p className="text-xl font-semibold text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container p-6 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">All Cars</h2>
        <Link to="/admin/new-car">
          <button className="px-4 py-2 text-white bg-yellow-600 rounded-lg hover:bg-yellow-500">
            Add New Car
          </button>
        </Link>
      </div>
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full py-3 pl-10 pr-3 border border-t rounded-full shadow-lg focus:right-1 focus:ring-cyan-600"
            placeholder="Search by car name or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-hidden bg-white border shadow-md rounded-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-cyan-900 to-blue-900">
              <tr>
                <th className="px-6 py-3 text-left text-white">Car Details</th>
                <th className="px-6 py-3 text-left text-white">
                  Specifications
                </th>
                <th className="px-6 py-3 text-left text-white">Location</th>
                <th className="px-6 py-3 text-center text-white">Price</th>
                <th className="px-6 py-3 text-center text-white">Status</th>
                <th className="px-6 py-3 text-right text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCars.map((car) => (
                <tr
                  key={car._id}
                  className="transition-colors hover:bg-gray-50"
                >
                  {/* Car Details */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-16 h-16">
                        <img
                          src={car.images?.[0] || "/placeholder.png"}
                          alt={car.name}
                          className="object-cover w-16 h-16 rounded-md"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {car.name}
                        </div>
                        <div className="text-sm text-gray-500">{car.brand}</div>
                      </div>
                    </div>
                  </td>

                  {/* Specifications */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      Type: {car.type}
                    </div>
                    <div className="text-sm text-gray-500">
                      Fuel: {car.fuelType}
                    </div>
                  </td>

                  {/* Location */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{car.location}</div>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      Rs.{car.pricePerDay}
                      <span className="text-xs text-gray-500">/day</span>
                    </div>
                  </td>
                  {/* Availability */}
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        car.availability
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {car.availability ? "Available" : "Not Available"}
                    </span>
                  </td>
                  {/* Actions */}
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="relative inline-block text-left">
                      <button
                        onClick={(e) => toggleMenu(e, car._id)}
                        className="p-2 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none"
                      >
                        <CiMenuKebab className="w-5 h-5" />
                      </button>

                      {activeMenu === car._id && (
                        <div className="absolute right-0 z-20 w-48 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                          <div
                            className="py-1"
                            role="menu"
                            aria-orientation="vertical"
                          >
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => openPreviewModal(car)}
                            >
                              <FaEye className="w-4 h-4 mr-3 text-gray-500" />
                              View Details
                            </button>
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm text-blue-500 hover:bg-gray-100"
                              onClick={() => handleEditCar(car)}
                            >
                              <FaEdit className="w-4 h-4 mr-3" />
                              Edit Car
                            </button>
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              onClick={() => openDeleteModal(car)}
                            >
                              <FaTrashAlt className="w-4 h-4 mr-3 text-red-500" />
                              Delete Car
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CarPreviewModal
        car={selectedCar}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onDelete={handleDeleteCar}
      />
    </div>
  );
};

export default CarListing;
