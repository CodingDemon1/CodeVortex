import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import InterviewPage from "../Pages/InterviewPage";
import ForgotPassword from "../Pages/ForgotPassword";
import PrivateRoute from "./PrivateRoute";
import Score from "../Pages/Score";
import TempPage from "../Pages/TempPage";

function AllRoutes() {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/interview"
        element={
          <PrivateRoute>
            <InterviewPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/score"
        element={
          <PrivateRoute>
            <Score />
          </PrivateRoute>
        }
      />
      <Route
        path="/temp"
        element={
          <PrivateRoute>
            <TempPage />
          </PrivateRoute>
        }
      />
      <Route path="/resetPass" element={<ForgotPassword />} />
    </Routes>
  );
}

export default AllRoutes;
