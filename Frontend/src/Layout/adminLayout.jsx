import React from "react";
import AdminSideBar from "../Components/admin/AdminSideBar";

import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex h-screen">
      <AdminSideBar />

      <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
