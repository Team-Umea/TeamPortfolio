import React from "react";
import PrimaryBtn from "../../components/btn/PrimaryBtn";
import { useLocation, useNavigate } from "react-router";
import { IoLogInOutline } from "react-icons/io5";
import useAuthStore from "../../hooks/useAuthStore";

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

  const signInButtonText = !isAdminPage || !isAuthenticated ? "Logga in" : "Logga ut";

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-slate-400">
      <ul>{/* Nav links */}</ul>
      <div>
        <PrimaryBtn onClick={handleAuthAction}>
          <span className="text-lg">{signInButtonText}</span>
          <IoLogInOutline size={24} />
        </PrimaryBtn>
      </div>
    </nav>
  );
}
