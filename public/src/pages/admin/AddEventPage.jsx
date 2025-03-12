import React from "react";
import { useNavigate } from "react-router";
import PrimaryBtn from "../../components/btn/PrimaryBtn";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function AddEventPage() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-fit p-4">
        <PrimaryBtn onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack size={24} />
          Tillbaka
        </PrimaryBtn>
      </div>
    </div>
  );
}
