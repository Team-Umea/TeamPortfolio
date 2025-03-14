import React from "react";
import useAuthStore from "../../hooks/useAuthStore";
import { Navigate } from "react-router";

export default function UserPage() {
  const { isAuthenticated, isAdmin, username, email } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  if (isAdmin) {
    return <Navigate to="/admin" />;
  }

  return (
    <div>
      <p>Welcome {username}</p>
      <p>{email}</p>
    </div>
  );
}
