import React, { useEffect } from "react";
import useAuthStore from "../../hooks/useAuthStore";
import { Navigate } from "react-router";
import { subscribe } from "../../api/user";

export default function UserPage() {
  const { isAuthenticated, isAdmin, username, email } = useAuthStore();

  useEffect(() => {
    (async () => {
      await subscribe();
    })();
  }, []);

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
