import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../../store/car-slice";
import { fetchUsersThunk } from "../../../store/user-slice";
import { dashboardStats } from "../../../Data/CardData";
import DashboardCard from "../../common/DashboardCard";
import EnhancedDonutChart from "./Chart";
import RecentUsers from "./RecentUsers";

function Dashboard() {
  const dispatch = useDispatch();

  // Fetching data from Redux store
  const { users, loading: usersLoading } = useSelector((state) => state.users);
  const { cars, loading: carsLoading } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchUsersThunk());
    dispatch(fetchCars());
  }, [dispatch]);

  // Show loading state while fetching data
  if (usersLoading || carsLoading) {
    return <div className="text-lg font-semibold text-center">Loading...</div>;
  }

  // Attach Redux Data to Card Stats
  const statsWithData = dashboardStats.map((stat) => ({
    ...stat,
    count:
      stat.key === "users"
        ? users?.length || 0
        : stat.key === "cars"
        ? cars?.length || 0
        : 0, // No bookings or earnings yet
  }));

  return (
    <div className="container w-full px-4 pb-16 ">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Dashboard Overview
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {statsWithData.map((stat) => (
          <DashboardCard key={stat.id} stat={stat} />
        ))}
      </div>
      <div className="flex flex-col gap-6 mt-8 md:flex-row">
        {/* Recent Users - Takes 75% width */}
        <div className="w-full md:w-[68%]">
          <RecentUsers />
        </div>
        {/* EnhancedDonutChart - Takes 25% width */}
        <div className="w-full md:w-[30%]">
          <EnhancedDonutChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
