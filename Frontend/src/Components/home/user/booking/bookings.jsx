import React from "react";

const bookings = [
  {
    id: 1,

    photo: "https://via.placeholder.com/50",
    carName: "Toyota Corolla",
    type: "Sedan",
    location: "Los Angeles, CA",
    startDate: "2025-01-20",
    endDate: "2025-01-25",
    price: "$500",
    status: "Pending",
  },
  {
    id: 2,

    photo: "https://via.placeholder.com/50",
    carName: "Honda Civic",
    type: "Hatchback",
    location: "New York, NY",
    startDate: "2025-02-01",
    endDate: "2025-02-07",
    price: "$450",
    status: "Reserved",
  },
  {
    id: 3,

    photo: "https://via.placeholder.com/50",
    carName: "Ford Focus",
    type: "Suv",
    location: "Chicago, IL",
    startDate: "2025-03-15",
    endDate: "2025-03-20",
    price: "$600",
    status: "Cancelled",
  },
];

const getStatusClass = (status) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Reserved":
      return "bg-green-100 text-green-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const BookingsTable = () => {
  return (
    <div className="container p-4 mx-auto">
      <h2 className="mb-6 text-3xl font-bold text-center">My Bookings</h2>
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-md">
        <table className="min-w-full border-collapse table-auto">
          <thead className="bg-cyan-950 ">
            <tr>
              <th className="px-4 py-2 text-sm font-medium text-left text-white ">
                Photo
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-white">
                Car Name
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-white">
                Type
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-white">
                Location
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-white">
                Start Date
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-white">
                End Date
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-white">
                Price
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-white">
                Status
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className={`border-t  ${
                  booking.id % 2 === 0 ? "bg-gray-100" : ""
                }`}
              >
                <td className="px-4 py-3">
                  <img
                    src={booking.photo}
                    alt={booking.name}
                    className="object-cover w-12 h-12 rounded-full"
                  />
                </td>
                <td className="px-4 py-3">{booking.carName}</td>
                <td className="px-4 py-3 ">{booking.type}</td>
                <td className="px-4 py-3">{booking.location}</td>
                <td className="px-4 py-3">{booking.startDate}</td>
                <td className="px-4 py-3">{booking.endDate}</td>
                <td className="px-4 py-3">{booking.price}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    className="px-3 py-1 text-sm font-medium text-white rounded bg-cyan-950 hover:bg-cyan-900"
                    onClick={() => alert(`Viewing details for ${booking.name}`)}
                  >
                    view
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsTable;
