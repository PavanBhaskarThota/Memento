import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home";
import { Auth } from "../Pages/Auth/Auth";
import { UserProfile } from "../Pages/UserProfile";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path={`profile/:name/:id`} element={<UserProfile />} />
    </Routes>
  );
};
