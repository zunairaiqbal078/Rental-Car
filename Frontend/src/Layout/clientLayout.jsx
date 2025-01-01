import React from "react";
import UserSidebar from "../Components/home/clientDashboard/ClientSideBar";
import { Outlet } from "react-router-dom";

function ClientLayout() {
  return (
    <div>
      <UserSidebar />
      <Outlet />
    </div>
  );
}

export default ClientLayout;
