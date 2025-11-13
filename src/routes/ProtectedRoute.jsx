import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import { Atom } from "react-loading-indicators";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const location = useLocation();
  // console.log(a)

  // console.log(loading)
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <Atom color="#32cd32" size="large" text="" textColor="" />
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to={"/login"} />;
};

export default ProtectedRoute;
