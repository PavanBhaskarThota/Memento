import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home";
import { Auth } from "../Pages/Auth/Auth";
import { UserProfile } from "../Pages/UserProfile";
import { PrivateRoute } from "./PrivateRoute";
import { SinglePostPage } from "../Pages/SinglePosPage/SinglePostPage";


export const MainRoutes = () => {
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
      <Route
        path={`posts/:userName/:id`}
        element={
          <PrivateRoute>
            <SinglePostPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
