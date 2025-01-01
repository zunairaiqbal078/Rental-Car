import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
function CheckAuth() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log(isAuthenticated, user);
  const location = useLocation();
  const publicRoutes = ["/", "/about", "/contact"];

  if (
    !isAuthenticated &&
    !publicRoutes.includes(location.pathname) &&
    !location.pathname.startsWith("/auth")
  ) {
    return <Navigate to="/auth/login" />;
  }
  if (!isAuthenticated && !location.pathname.startsWith("/auth")) {
    return <Navigate to="/auth/login" />;
  }
  if (isAuthenticated && location.pathname.startsWith("/auth")) {
    if (user?.role == "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/" />;
    }
  }
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/noFound" />;
  }
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }
}
export default CheckAuth;
