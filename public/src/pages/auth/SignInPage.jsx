import React from "react";
import SignInForm from "../../components/auth/SignInForm";
import useAuthStore from "../../hooks/useAuthStore";
import { Navigate } from "react-router";

export default function SignInPage() {
  const { isAuthenticated, isAdmin } = useAuthStore();

  if (isAuthenticated) {
    if (isAdmin) {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/user" />;
    }
  }

  return <SignInForm />;
}
