import React from "react";
import { useSearchParams } from "react-router-dom";
import { CarDetails } from "../../../Data/Rides";
import { cars } from "../../../Data/Rides";
import { Link } from "react-router-dom";
function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = searchParams.get("location") || "";
  const pickUpDate = searchParams.get("startDate") || "";
  const returningDate = searchParams.get("endDate") || "";
  const type = searchParams.get("type") || "All";
  const page = parseInt(searchParams.get("page") || "1");
  const sort = searchParams.get("sort") || "price-asc";

  console.log("type", type);

  const ITEMS_PER_PAGE = 8;

  {
    /* filtered function */
  }
  const filteredCars = CarDetails.filter((car) => {
    const matchesLocation = location
      ? car.location.toLowerCase().includes(location.toLowerCase())
      : true;
    const matchesType =
      type === "All" || car.type.toLowerCase() === type.toLowerCase();
    const matchesDate =
      (!pickUpDate || new Date(car.availableFrom) >= new Date(pickUpDate)) &&
      (!returningDate || new Date(car.availableTo) <= new Date(returningDate));
    console.log("type", type);
    return matchesLocation && matchesType && matchesDate;
  });

  {
    /* Sorted function */
  }
  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "date-asc":
        return new Date(a.date) - new Date(b.date);
      case "date-desc":
        return new Date(b.date) - new Date(a.date);
      case "popular":
        return (b.popularity || 0) - (a.popularity || 0); // Handle missing popularity
      default:
        return 0;
    }
  });

  // Paginate cars
  const totalPages = Math.ceil(sortedCars.length / ITEMS_PER_PAGE);
  const currentCars = sortedCars.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // Update search params
  const updateSearchParams = (params) => {
    setSearchParams({ ...Object.fromEntries(searchParams), ...params });
  };

  return (
    <div className="p-6 mx-auto max-w-7xl">
      {/* Filter by Type */}
      <div className="mb-8">
        <div className="flex gap-2 pb-2 overflow-x-auto">
          {cars.map((carType) => (
            <button
              key={carType}
              onClick={() => updateSearchParams({ type: carType, page: "1" })}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                type.toLowerCase() === carType.toLowerCase()
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {carType}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end mb-6">
        <span className="text-gray-600">Sort by:</span>

        {/* Sort Drop Down menu */}
        <select
          value={sort}
          onChange={(e) =>
            updateSearchParams({ sort: e.target.value, page: "1" })
          }
          className="px-3 py-2 bg-white border rounded-lg"
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="date-asc">Date: Oldest to Newest</option>
          <option value="date-desc">Date: Newest to Oldest</option>
          <option value="popular">Popular Cars</option>
        </select>
      </div>

      {/* If filtered car can't match */}
      {filteredCars.length === 0 ? (
        <div className="text-center text-gray-500">
          No cars match your search criteria. Try adjusting your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentCars.map((car) => (
            <div
              key={car.id}
              className="p-4 transition-shadow bg-white border rounded-lg shadow-md hover:shadow-lg"
            >
              <div className="mb-3 overflow-hidden rounded-lg">
                <img
                  src={car.image}
                  alt={car.title}
                  className="object-cover w-full h-40"
                />
              </div>
              <h3 className="text-lg font-semibold">{car.title}</h3>
              <p className="font-medium text-gray-600">{car.price}</p>
              <p className="text-sm text-gray-500">
                {car.location} • {car.type}
              </p>
              <p className="mt-1 text-xs text-gray-400">Added on: {car.date}</p>
              <div className="flex justify-between mt-4">
                <button className="px-4 py-2 text-sm text-white bg-yellow-500 rounded-lg hover:bg-blue-600">
                  Book Now
                </button>
                <Link to="/explore/viewDetails">
                  {" "}
                  <button className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
                    More Details
                  </button>
                </Link>
              </div>
            </div>
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
                  ? "bg-blue-500 text-white"
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
}

export default Explore;
