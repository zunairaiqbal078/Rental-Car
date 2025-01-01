import React, { useState } from "react";
import { selects } from "../../../Data/FAQ";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  // State to store filters dynamically
  const [filters, setFilters] = useState({
    "Vehicle Type": "",
    "Pickup Location": "",
    "Picking Up Date": "",
    "Returning Date": "",
  });

  // Handle changes for dropdowns and date inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: value,
    }));
  };

  // Navigate to the Explore page with query parameters
  const handleSearch = () => {
    const queryString = new URLSearchParams({
      location: filters["Pickup Location"],
      startDate: filters["Picking Up Date"],
      endDate: filters["Returning Date"],
      type: filters["Vehicle Type"],
    }).toString();
    navigate(`/explore?${queryString}`);
  };

  return (
    <div className="relative bg-[url('src/assets/HomeImages/heroimg.jpg')] bg-cover bg-center h-[calc(100vh-75px)] bg-no-repeat w-full flex items-center justify-center">
      <div className="absolute inset-0 bg-black/35"></div>

      <div className="absolute flex flex-col items-center justify-center gap-8 w-[75%]">
        <span className="text-3xl font-bold text-center text-white lg:text-4xl">
          Rent Your Perfect Ride Anytime, Anywhere.
        </span>

        <div className="flex flex-col w-full gap-5 p-5 bg-white bg-opacity-25 rounded-lg">
          <div className="grid w-full grid-cols-2 gap-5 lg:grid-cols-4">
            {/* dropdown menu for filtering */}
            {selects.map((item) => {
              if (
                item.title === "Picking Up Date" ||
                item.title === "Returning Date"
              ) {
                return (
                  <div className="flex flex-col gap-2" key={item.title}>
                    <span className="font-medium text-black">{item.title}</span>
                    <input
                      type="date"
                      id={item.title}
                      value={filters[item.title]}
                      onChange={handleChange}
                      className="w-full h-[50px] px-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                );
              } else {
                // Use dropdown for other fields
                return (
                  <div
                    className="relative flex flex-col gap-2"
                    key={item.title}
                  >
                    <span className="font-medium text-black">{item.title}</span>
                    <select
                      id={item.title}
                      value={filters[item.title]}
                      onChange={handleChange}
                      className="w-full h-[50px] px-2 rounded-lg outline-none appearance-none focus:ring-2 focus:ring-blue-500"
                    >
                      {item.options.map((option, index) => (
                        <option
                          key={option}
                          value={index === 0 ? "" : option}
                          disabled={index === 0}
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                    <div className="absolute  transform -translate-y-1/2 pointer-events-none right-4 top-[70%]">
                      <item.icon />
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="m-auto">
            <button
              onClick={handleSearch}
              className="px-5 py-3 text-sm font-semibold text-white bg-yellow-500 rounded-md hover:border-black hover:border-2"
            >
              Find Your Car
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
