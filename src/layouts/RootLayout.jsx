import React from "react";

import { Outlet, useNavigation } from "react-router";
// import Header from "../components/Header";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation/Navigation";
import useAuth from "../hooks/useAuth";

const RootLayout = () => {

  const { isDarkMode } = useAuth();

  const loading = useNavigation()
  console.log(loading.state)
  
  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      {/* <Header /> */}
      <Navigation />
      <div className="flex-1 ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
