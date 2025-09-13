import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, roleType, isLoginPage = false }) => {
  const location = useLocation();
  
  // Checking the current URL string parameters reliably across any mounting layer
  const searchParams = new URLSearchParams(location.search);
  const isStaffMode = searchParams.get("mode") === "staff";
  const isAuthenticated = localStorage.getItem(roleType);

  // LOOP A: Guarding the Login forms themselves from curious visitors
  if (isLoginPage) {
    if (isStaffMode) {
      return children; // They have the physical key parameter in the URL
    }
    return <Navigate to="/" replace />; // No key? Bounce them straight to the main landing page
  }

  // LOOP B: Guarding internal dashboards
  if (!isAuthenticated) {
    // Dynamically append the key parameter back into the redirect path format string
    const paramSuffix = isStaffMode ? "?mode=staff" : "";
    const redirectPath = roleType === "admin" 
      ? `/admin/login${paramSuffix}` 
      : `/admin/reception/login${paramSuffix}`;
      
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;