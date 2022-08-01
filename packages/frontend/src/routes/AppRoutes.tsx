import * as React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Page404 from "../pages/Page404";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/sign-in" element={<Navigate to="/home" />} />
      <Route path="/sign-up" element={<Navigate to="/home" />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default AppRoutes;
