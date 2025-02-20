import React, { useState } from "react";
import { selects } from "../../../Data/FAQ";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  // State to store filters dynamically
  const [filters, setFilters] = useState({
    "Vehicle Type": "",
    "Pickup Location": "",
    "Car Preference": "",
  });

  // Handle changes for dropdowns
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
      name: filters["Car Preference"], // Use "name" instead of dates
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
          <div className="grid w-full grid-cols-3 gap-5 max-sm:grid-cols-1 max-sm:gap-1">
            {/* Dropdown menu for filtering */}
            {selects?.map((item) => (
              <div className="relative flex flex-col gap-2" key={item.title}>
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
                <div className="absolute transform -translate-y-1/2 pointer-events-none right-4 top-[70%]">
                  <item.icon />
                </div>
              </div>
            ))}
          </div>
          <div className="m-auto">
            <button
              onClick={handleSearch}
              className="px-5 py-3 text-sm font-semibold text-white bg-yellow-600 rounded-md hover:border-white hover:border"
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

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAllCars } from "../../../api/carApi"; // Import the getAllCars API

// function HeroSection() {
//   const navigate = useNavigate();

//   // State to store filters dynamically
//   const [filters, setFilters] = useState({
//     "Vehicle Type": "",
//     "Pickup Location": "",
//     "Car Preference": "",
//   });

//   // State to store unique options for dropdowns
//   const [locations, setLocations] = useState([]);
//   const [carNames, setCarNames] = useState([]);
//   const [vehicleTypes, setVehicleTypes] = useState([]);

//   // Fetch all cars data and extract unique values for dropdowns
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getAllCars(); // Fetch all cars
//         const cars = response; // Assuming response is an array of cars

//         // Extract unique locations
//         const uniqueLocations = [...new Set(cars.map((car) => car.location))];
//         setLocations(uniqueLocations);

//         // Extract unique car names
//         const uniqueCarNames = [...new Set(cars.map((car) => car.name))];
//         setCarNames(uniqueCarNames);

//         // Extract unique vehicle types
//         const uniqueVehicleTypes = [...new Set(cars.map((car) => car.type))];
//         setVehicleTypes(uniqueVehicleTypes);
//       } catch (error) {
//         console.error("Error fetching cars:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Handle changes for dropdowns
//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [id]: value,
//     }));
//   };

//   // Navigate to the Explore page with query parameters
//   const handleSearch = () => {
//     const queryString = new URLSearchParams({
//       location: filters["Pickup Location"],
//       name: filters["Car Preference"],
//       type: filters["Vehicle Type"],
//     }).toString();
//     navigate(`/explore?${queryString}`);
//   };

//   return (
//     <div className="relative bg-[url('src/assets/HomeImages/heroimg.jpg')] bg-cover bg-center h-[calc(100vh-75px)] bg-no-repeat w-full flex items-center justify-center">
//       <div className="absolute inset-0 bg-black/35"></div>

//       <div className="absolute flex flex-col items-center justify-center gap-8 w-[75%]">
//         <span className="text-3xl font-bold text-center text-white lg:text-4xl">
//           Rent Your Perfect Ride Anytime, Anywhere.
//         </span>

//         <div className="flex flex-col w-full gap-5 p-5 bg-white bg-opacity-25 rounded-lg">
//           <div className="grid w-full grid-cols-3 gap-5 max-sm:grid-cols-1 max-sm:gap-1">
//             {/* Dropdown for Vehicle Type */}
//             <div className="relative flex flex-col gap-2">
//               <span className="font-medium text-black">Vehicle Type</span>
//               <select
//                 id="Vehicle Type"
//                 value={filters["Vehicle Type"]}
//                 onChange={handleChange}
//                 className="w-full h-[50px] px-2 rounded-lg outline-none appearance-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Vehicle Type</option>
//                 {vehicleTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Dropdown for Pickup Location */}
//             <div className="relative flex flex-col gap-2">
//               <span className="font-medium text-black">Pickup Location</span>
//               <select
//                 id="Pickup Location"
//                 value={filters["Pickup Location"]}
//                 onChange={handleChange}
//                 className="w-full h-[50px] px-2 rounded-lg outline-none appearance-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Location</option>
//                 {locations.map((location) => (
//                   <option key={location} value={location}>
//                     {location}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Dropdown for Car Preference */}
//             <div className="relative flex flex-col gap-2">
//               <span className="font-medium text-black">Car Preference</span>
//               <select
//                 id="Car Preference"
//                 value={filters["Car Preference"]}
//                 onChange={handleChange}
//                 className="w-full h-[50px] px-2 rounded-lg outline-none appearance-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Car Preference</option>
//                 {carNames.map((name) => (
//                   <option key={name} value={name}>
//                     {name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="m-auto">
//             <button
//               onClick={handleSearch}
//               className="px-5 py-3 text-sm font-semibold text-white bg-yellow-600 rounded-md hover:border-white hover:border"
//             >
//               Find Your Car
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HeroSection;
