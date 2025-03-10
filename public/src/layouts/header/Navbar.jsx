import React from "react";
import PrimaryBtn from "../../components/btn/PrimaryBtn";
import { useNavigate } from "react-router";
import { IoLogInOutline } from "react-icons/io5";
import useAuthStore from "../../hooks/useAuthStore";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, resetAuth } = useAuthStore();

  const handleAuthAction = () => {
    if (isAuthenticated) {
      resetAuth();
      navigate("/");
    } else {
      navigate("/signin");
    }
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-slate-400">
      <ul>{/* Nav links */}</ul>
      <div>
        <PrimaryBtn onClick={handleAuthAction}>
          <span className="text-lg">{isAuthenticated ? "Logga ut" : "Logga in"}</span>
          <IoLogInOutline size={24} />
        </PrimaryBtn>
      </div>
    </nav>
  );
}
