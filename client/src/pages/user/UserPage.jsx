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
    <h1 className="pt-32 text-center text-3xl w-[90%] max-w-[800px] mx-auto">
      Du har nu prenumererat på vårt nyhetsbrev och kommer att få aviseringar via mejl när vi
      publicerar nya projekt och evenemang.
    </h1>
  );
}
