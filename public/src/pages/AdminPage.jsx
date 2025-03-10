import React from "react";
import useAuthStore from "../hooks/useAuthStore";

export default function AdminPage() {
  const { username, email } = useAuthStore();
  return (
    <div>
      <p>Welcome Admin {username}</p>
      <p>{email}</p>
    </div>
  );
}
