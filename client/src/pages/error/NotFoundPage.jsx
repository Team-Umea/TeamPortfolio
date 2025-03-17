import React from "react";
import PrimaryBtn from "../../components/btn/PrimaryBtn";
import { CiHome } from "react-icons/ci";
import { useNavigate } from "react-router";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center gap-y-12 h-screen">
      <h1 className="text-4xl text-red-500 font-medium">404 - Page Not Found</h1>
      <div>
        <PrimaryBtn onClick={() => navigate("/")}>
          <CiHome size={30} />
          <span className="text-xl">Gå till start</span>
        </PrimaryBtn>
      </div>
    </div>
  );
}
