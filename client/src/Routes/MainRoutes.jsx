import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home";
import { Auth } from "../Pages/Auth/Auth";
import { UserProfile } from "../Pages/UserProfile";
import { PrivateRoute } from "./PrivateRoute";

export const MainRoutes = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  console.log(isAuthenticated)
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route
        path={`profile/:name/:id`}
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
