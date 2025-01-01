import React from "react";
import AdminSideBar from "../Components/admin/AdminSideBar";

import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div>
      <AdminSideBar />

      <Outlet />
    </div>
  );
}

export default AdminLayout;
