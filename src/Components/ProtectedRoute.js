import React from "react";

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ userShouldBe, children }) => {
  let canUserEnter = false;

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (userShouldBe === "logedin") {
    if (user != null && token != null) {
      if (user.email_verified_at != null || user.phone_verified_at != null) {
        canUserEnter = true;
      }
    }
  } else if (userShouldBe === "registered") {
    if (user != null && token != null) {
      canUserEnter = true;
    }
  }

  if (!canUserEnter) {
    // navigate("/login");
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
