import React from "react";
import AdminSideBar from "../Components/admin/AdminSideBar";
import { Outlet } from "react-router-dom";
import AdminHeader from "../Components/admin/AdminHeader";

function AdminLayout() {
  return (
    <div className="flex h-screen">
      <AdminSideBar />

      <div className="flex flex-col flex-grow">
        <AdminHeader />

        <div className="flex-grow p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
