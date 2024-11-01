import React from "react";
import { NavBar } from "./Pages/NavBar";
import { MainRoutes } from "./Routes/MainRoutes";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export const App = () => {
  const location = useLocation();
  const HideNavBar = location.pathname === "/auth";
  const NavBarColor = location.pathname === "/";
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {!HideNavBar && <NavBar NavBarColor={NavBarColor} />}
      <MainRoutes />
    </>
  );
};
