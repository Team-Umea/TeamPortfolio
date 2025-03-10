import React from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  );
}
