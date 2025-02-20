import React, { useEffect, memo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../../store/car-slice";
import CarCard from "./CarCard";
import CarCardSkeleton from "../../../Components/common/CarCardSkeleton";

const Explore = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { cars, isLoading, error } = useSelector((state) => state.cars);

  const location = searchParams.get("location") || "";
  const name = searchParams.get("name") || "";
  const type = searchParams.get("type") || "All";
  const page = parseInt(searchParams.get("page") || "1");
  const availability = searchParams.get("availability") || "";
  const sort = searchParams.get("sort") || "price-asc";

  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  // ** Extract Unique Car Types **
  const uniqueCarTypes = ["All", ...new Set(cars.map((car) => car.type))];

  let filteredCars = [...cars];
  if (location) {
    filteredCars = filteredCars.filter((car) =>
      car.location.toLowerCase().includes(location.toLowerCase())
    );
  }
  if (name) {
    filteredCars = filteredCars.filter((car) =>
      car.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  if (type !== "All") {
    filteredCars = filteredCars.filter((car) => car.type === type);
  }
  if (availability) {
    filteredCars = filteredCars.filter((car) => car.availability === true);
  }

  switch (sort) {
    case "price-asc":
      filteredCars.sort((a, b) => a.pricePerDay - b.pricePerDay);
      break;
    case "price-desc":
      filteredCars.sort((a, b) => b.pricePerDay - a.pricePerDay);
      break;
    case "date-asc":
      filteredCars.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      break;
    case "date-desc":
      filteredCars.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      break;
    default:
      break;
  }

  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);
  const currentCars = filteredCars.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const updateSearchParams = (params) => {
    setSearchParams({ ...Object.fromEntries(searchParams), ...params });
  };

  if (isLoading) {
    return (
      <div className="p-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(12)].map((_, index) => (
            <CarCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 mx-auto max-w-7xl">
      {/* ** Dynamic Filter by Type ** */}
      <div className="mb-8">
        <div className="flex gap-2 pb-2 overflow-x-auto">
          {uniqueCarTypes.map((carType) => (
            <button
              key={carType}
              onClick={() => updateSearchParams({ type: carType, page: "1" })}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                type.toLowerCase() === carType.toLowerCase()
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {carType}
            </button>
          ))}
        </div>
      </div>

      {/* Sorting Dropdown */}
      <div className="flex items-center justify-end mb-6">
        <span className="mr-4 text-gray-600">Sort by:</span>
        <select
          value={sort}
          onChange={(e) =>
            updateSearchParams({ sort: e.target.value, page: "1" })
          }
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none"
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="date-asc">Date: Oldest to Newest</option>
          <option value="date-desc">Date: Newest to Oldest</option>
          <option value="available">Availability</option>
        </select>
      </div>

      {/* Display Cars */}
      {filteredCars.length === 0 ? (
        <div className="text-center text-gray-500">
          No cars match your search criteria. Try adjusting your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentCars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => updateSearchParams({ page: String(page - 1) })}
          disabled={page <= 1}
          className="flex items-center justify-center w-8 h-8 border rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ←
        </button>

        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => updateSearchParams({ page: String(i + 1) })}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                page === i + 1
                  ? "bg-yellow-400 text-white"
                  : "border hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => updateSearchParams({ page: String(page + 1) })}
          disabled={page >= totalPages}
          className="flex items-center justify-center w-8 h-8 border rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          →
        </button>
      </div>
    </div>
  );
});

export default Explore;
