import React from "react";
import EventQuestionForm from "../../components/content/event/EventQuestionForm";
import { useNavigate } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import PrimaryBtn from "../../components/btn/PrimaryBtn";

export default function EventQuestionPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-fit p-4 mb ">
        <PrimaryBtn onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack size={24} />
          Tillbaka
        </PrimaryBtn>
      </div>
      <EventQuestionForm />
    </>
  );
}
