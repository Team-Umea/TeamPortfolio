import React from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import { Navigate, Outlet } from "react-router";
import useAuthStore from "../../hooks/useAuthStore";

export default function AdminLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  );
}
