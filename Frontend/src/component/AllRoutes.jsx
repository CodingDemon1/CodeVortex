import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import InterviewPage from "../Pages/InterviewPage";
import ForgotPassword from "../Pages/ForgotPassword";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/interview" element={<InterviewPage />} />
      <Route path="/resetPass" element={<ForgotPassword />} />
    </Routes>
  );
}

export default AllRoutes;
