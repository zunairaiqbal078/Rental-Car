// src/constants/CardData.js
import {
  FaUsers,
  FaCar,
  FaCalendarCheck,
  FaMoneyBillWave,
} from "react-icons/fa";

export const dashboardStats = [
  {
    id: 1,
    title: "Total Users",
    key: "users",
    growth: "5.2%",
    icon: FaUsers, // JSX nahi pass karein, sirf function reference
    bgColor: "bg-blue-600",
    lightBg: "bg-blue-100",
    borderColor: "border-blue-600",
    growthColor: "text-green-600",
  },
  {
    id: 2,
    title: "Total Cars",
    key: "cars",
    growth: "3.8%",
    icon: FaCar,
    bgColor: "bg-green-600",
    lightBg: "bg-green-100",
    borderColor: "border-green-600",
    growthColor: "text-green-600",
  },
  {
    id: 3,
    title: "Total Bookings",
    key: "bookings",
    growth: "7.1%",
    icon: FaCalendarCheck,
    bgColor: "bg-purple-600",
    lightBg: "bg-purple-100",
    borderColor: "border-purple-600",
    growthColor: "text-green-600",
  },
  {
    id: 4,
    title: "Total Earnings",
    key: "earnings",
    growth: "4.5%",
    icon: FaMoneyBillWave,
    bgColor: "bg-yellow-600",
    lightBg: "bg-yellow-100",
    borderColor: "border-yellow-600",
    growthColor: "text-green-600",
  },
];

export default dashboardStats;
