import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

const data = [
  {
    name: "Booked",
    value: 245,
    color: "#10B981", // Green
    icon: <FaCheckCircle className="w-4 h-4" />,
  },
  {
    name: "Rejected",
    value: 54,
    color: "#EF4444", // Red
    icon: <FaTimesCircle className="w-4 h-4" />,
  },
  {
    name: "Pending",
    value: 89,
    color: "#F59E0B", // Amber
    icon: <FaClock className="w-4 h-4" />,
  },
];

const total = data.reduce((sum, entry) => sum + entry.value, 0);
const activeBookingPercentage = ((data[0].value / total) * 100).toFixed(0);

const DonutChartCard = () => {
  return (
    <div className="p-8 bg-white shadow-xl rounded-3xl ">
      {/* Header */}
      <div className="mb-4 text-center">
        <h3 className="text-2xl font-bold text-gray-800">Booking Analytics</h3>
        <p className="text-gray-500">Current booking status overview</p>
      </div>

      {/* Chart Container */}
      <div className="relative flex items-center justify-center mb-6">
        <PieChart width={250} height={200}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            dataKey="value"
            stroke="none"
            startAngle={90}
            endAngle={450}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                className="transition-all duration-300 hover:opacity-80"
              />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="px-4 py-2 bg-white border border-gray-100 rounded-lg shadow-lg ">
                    <p className="font-semibold text-gray-800">{data.name}</p>
                    <p className="text-gray-600 ">{data.value} bookings</p>
                  </div>
                );
              }
              return null;
            }}
          />
        </PieChart>

        {/* Center Stats */}
        <div className="absolute text-center ">
          <p className="text-3xl font-bold text-gray-800">
            {activeBookingPercentage}%
          </p>
          <p className="text-sm text-gray-500">Booked</p>
        </div>
      </div>

      {/* Legend with Enhanced Stats */}
      <div className="space-y-4">
        {data.map((entry, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 transition-all duration-300 rounded-xl hover:bg-gray-50"
            style={{ borderLeft: `4px solid ${entry.color}` }}
          >
            <div className="flex items-center gap-3">
              <span
                className="flex items-center justify-center w-8 h-8 rounded-lg"
                style={{
                  backgroundColor: `${entry.color}15`,
                  color: entry.color,
                }}
              >
                {entry.icon}
              </span>
              <div>
                <p className="font-medium text-gray-800">{entry.name}</p>
                <p className="text-sm text-gray-500">
                  {((entry.value / total) * 100).toFixed(1)}% of total
                </p>
              </div>
            </div>
            <span className="text-lg font-semibold text-gray-700">
              {entry.value}
            </span>
          </div>
        ))}
      </div>

      {/* Total Bookings */}
      <div className="pt-6 mt-6 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Total Bookings</span>
          <span className="text-xl font-bold text-gray-800">{total}</span>
        </div>
      </div>
    </div>
  );
};

export default DonutChartCard;
