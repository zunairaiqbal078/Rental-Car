import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <>
      <div className="sticky flex items-center justify-center w-full h-16 text-white shadow-lg bg-gradient-to-r from-cyan-900 to-blue-900">
        <h1 className="text-2xl font-bold text-center ">LuxeRental.com</h1>
      </div>
      <Outlet />
    </>
  );
}

export default AuthLayout;
