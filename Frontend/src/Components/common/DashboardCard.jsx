import React from "react";
import { FaArrowUp } from "react-icons/fa";

function DashboardCard({ stat }) {
  const IconComponent = stat.icon;
  return (
    <div
      className={`relative overflow-hidden ${stat.lightBg} rounded-2xl shadow-lg ${stat.borderColor} border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
    >
      {/* Card Content */}
      <div className="p-6">
        {/* Icon */}
        <div
          className={`${stat.bgColor} w-14 h-14 rounded-xl flex items-center justify-center shadow-lg mb-6 transform transition-transform duration-300 hover:scale-110`}
        >
          <IconComponent className="text-2xl text-white" />
        </div>

        {/* Stats Content */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-600">{stat.title}</h2>
          <div className="flex items-baseline space-x-2">
            <p className="text-3xl font-bold tracking-tight text-gray-900">
              {stat.count}
            </p>
            <div
              className={`flex items-center ${stat.growthColor} text-sm font-medium`}
            >
              <FaArrowUp className="w-3 h-3 mr-1" />
              {stat.growth}
            </div>
          </div>
          {/* Trend Indicator */}
          <p className="text-sm text-gray-500">vs. previous month</p>
        </div>
      </div>

      {/* Decorative Element */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 opacity-10 transform translate-x-16 -translate-y-8 ${stat.bgColor} rounded-full`}
      ></div>
    </div>
  );
}

export default DashboardCard;
