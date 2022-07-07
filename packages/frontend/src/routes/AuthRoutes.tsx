import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthGoogle from "../pages/AuthGoogle";
import Page404 from "../pages/Page404";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/sign-in" />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="auth/google" element={<AuthGoogle />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default AuthRoutes;
