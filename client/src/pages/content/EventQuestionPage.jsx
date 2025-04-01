import React from "react";
import EventQuestionForm from "../../components/content/event/EventQuestionForm";
import { useNavigate } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import TransparentButton from "@/components/btn/TransparentButton";

export default function EventQuestionPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-fit p-4">
        <TransparentButton onClick={() => navigate("/events")}>
          <IoIosArrowRoundBack size={24} />
          Tillbaka
        </TransparentButton>
      </div>
      <div className="mt-32">
        <EventQuestionForm />
      </div>
    </>
  );
}
