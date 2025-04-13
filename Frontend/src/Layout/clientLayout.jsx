import React from "react";
import UserSidebar from "../Components/home/user/ClientSideBar";
import { Outlet } from "react-router-dom";
import UserHeader from "../Components/home/user/userHeader";
function ClientLayout() {
  return (
    <div className="flex h-screen">
      <UserSidebar />

      <div className="flex flex-col flex-grow">
        <UserHeader />

        <div className="flex-grow p-4 overflow-y-auto bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ClientLayout;
