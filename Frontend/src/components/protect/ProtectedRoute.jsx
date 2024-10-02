import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";
import React from "react";

export const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  if (!auth) {
    return <Navigate to="/signin" replace />;
  }
  if (!auth.user) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};