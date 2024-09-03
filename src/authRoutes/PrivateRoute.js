import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/quiz-login" />;
  }

  try {
    const decoded = jwtDecode(token);

    if (allowedRoles.includes(decoded.role)) {
      // If user role is allowed, render the component
      return <Outlet />;
    } else {
      // If user role is not allowed, redirect to unauthorized page or login
      return <Navigate to="/unauthorized" />;
    }
  } catch (error) {
    // If token is invalid or decoding fails, redirect to login
    console.error("Token error:", error);
    return <Navigate to="/quiz-login" />;
  }
};

export default PrivateRoute;
