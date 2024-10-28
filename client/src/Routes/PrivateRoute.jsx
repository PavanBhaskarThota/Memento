import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  console.log(isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/auth" />;
};
