import React from "react";
import PrimaryBtn from "../../components/btn/PrimaryBtn";
import { NavLink, useLocation, useNavigate } from "react-router";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import useAuthStore from "../../hooks/useAuthStore";
import { RiAdminLine } from "react-icons/ri";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, resetAuth } = useAuthStore();

  const isAdminPage = location.pathname.includes("admin");

  const handleAuthAction = () => {
    if (!isAdminPage && isAuthenticated) {
      navigate("/admin");
      return;
    }

    if (isAuthenticated) {
      resetAuth();
      navigate("/");
    } else {
      navigate("/signin");
    }
  };

  const signInButtonBody =
    !isAdminPage && isAuthenticated ? (
      <>
        <span>Admin</span>
        <RiAdminLine size={24} />
      </>
    ) : isAuthenticated ? (
      <>
        <span>Logga ut</span>
        <IoLogOutOutline size={24} />
      </>
    ) : (
      <>
        <span>Logga in</span>
        <IoLogInOutline size={24} />
      </>
    );

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-slate-400">
      <NavLink className="text-2xl font-semibold" to="/">
        Team Umeå
      </NavLink>
      <div>
        <PrimaryBtn onClick={handleAuthAction}>{signInButtonBody}</PrimaryBtn>
      </div>
    </nav>
  );
}
