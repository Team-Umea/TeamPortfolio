import React from "react";
import useAuthStore from "../hooks/useAuthStore";
import { Navigate } from "react-router";

export default function AdminPage() {
  const { isAuthenticated, isAdmin, username, email } = useAuthStore();

  if (!isAdmin) {
    if (!isAuthenticated) {
      return <Navigate to="/signin" />;
    } else {
      return <Navigate to="/user" />;
    }
  }

  return (
    <div>
      <p>Welcome Admin {username}</p>
      <p>{email}</p>
    </div>
  );
}
