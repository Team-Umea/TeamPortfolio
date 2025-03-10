import React from "react";
import PrimaryBtn from "../../components/btn/PrimaryBtn";
import { useNavigate } from "react-router";
import { IoLogInOutline } from "react-icons/io5";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-slate-400">
      <ul>{/* Nav links */}</ul>
      <div>
        <PrimaryBtn onClick={() => navigate("/signin")}>
          <span className="text-lg">Logga in</span>
          <IoLogInOutline size={24} />
        </PrimaryBtn>
      </div>
    </nav>
  );
}
