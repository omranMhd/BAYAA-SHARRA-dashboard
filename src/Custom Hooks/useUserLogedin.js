import React from "react";

function useUserLogedin() {
  let isUserLogedin = false;

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (user != null && token != null) {
    if (user.email_verified_at != null || user.phone_verified_at != null) {
      isUserLogedin = true;
    }
  }

  return isUserLogedin;
}

export default useUserLogedin;
