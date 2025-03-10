import React from "react";
import useAuthStore from "../hooks/useAuthStore";

export default function UserPage() {
  const { username, email } = useAuthStore();
  return (
    <div>
      <p>Welcome {username}</p>
      <p>{email}</p>
    </div>
  );
}
