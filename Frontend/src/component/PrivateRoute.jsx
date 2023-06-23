import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const auth = useSelector((store) => store.reducer.auth);
  const location = useLocation();

  if (auth) {
    return children;
  }

  return <Navigate to={"/"} state={location.pathname} />;
};

export default PrivateRoute;
