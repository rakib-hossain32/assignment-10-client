import React from "react";

import { Outlet, useNavigation } from "react-router";
// import Header from "../components/Header";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation/Navigation";
import useAuth from "../hooks/useAuth";
import { ToastContainer } from "react-toastify";
import { Atom } from "react-loading-indicators";

const RootLayout = () => {
  const { isDarkMode } = useAuth();

  const loading = useNavigation();
  // console.log(loading.state);

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      {/* <Header /> */}
      <Navigation />
      {loading.state === "loading" ? (
        <div className="flex items-center justify-center min-h-screen ">
          <Atom color="#32cd32" size="large" text="" textColor="" />
        </div>
      ) : (
        <div className="flex-1 ">
          <Outlet />
        </div>
      )}

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default RootLayout;
