import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/quiz-login" />;
  }

  const decodedToken = jwtDecode(token);
  const expirationDate = decodedToken.exp * 1000;

  if (Date.now() >= expirationDate) {
    localStorage.removeItem("authToken");
    alert("Session expired, please log in again.");
    return <Navigate to="/quiz-login" />;
  }

  return children;
};

export default ProtectedRoute;
