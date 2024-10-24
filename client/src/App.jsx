import React from "react";
import { NavBar } from "./Pages/NavBar";
import { MainRoutes } from "./Routes/MainRoutes";
import { useLocation } from "react-router-dom";

export const App = () => {
  const location = useLocation();
  const HideNavBar = location.pathname === "/auth";
  return (
    <>
      {!HideNavBar && <NavBar />}
      <MainRoutes />
    </>
  );
};
