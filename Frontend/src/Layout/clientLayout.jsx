import React from "react";
import UserSidebar from "../Components/home/user/ClientSideBar";
import { Outlet } from "react-router-dom";

function ClientLayout() {
  return (
    <div className="flex h-screen">
      <UserSidebar />
      <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}

export default ClientLayout;
