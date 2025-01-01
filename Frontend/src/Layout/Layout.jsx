import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Components/common/Footer";
import Header from "../Components/common/Header";
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
