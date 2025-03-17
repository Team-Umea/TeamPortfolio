import React from "react";
import { useNavigate } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import EventForm from "../../../components/admin/event/EventForm";
import PrimaryBtn from "../../../components/btn/PrimaryBtn";

export default function AddEventPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-y-12">
      <div className="w-fit p-4 mb">
        <PrimaryBtn onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack size={24} />
          Tillbaka
        </PrimaryBtn>
      </div>
      <EventForm />
    </div>
  );
}
