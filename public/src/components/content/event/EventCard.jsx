import React from "react";
import TransparentButton from "../../btn/TransparentButton";
import { IoCalendarOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import PrimaryBtn from "../../btn/PrimaryBtn";

export default function EventCard({ event }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-y-2">
          <p className="text-2xl font-semibold">{event.event}</p>
          <div className="flex items-center gap-x-2">
            <IoCalendarOutline size={24} />
            <p className="text-lg">{event.date}</p>
          </div>
        </div>
        <div>
          {event.isEnrolled && (
            <PrimaryBtn onClick={() => navigate(`questions/${event._id}`)}>
              <span>Frågor eller Önskemål</span>
            </PrimaryBtn>
          )}
        </div>
      </div>
      <div className="relative">
        <img src={event.image} alt={event.event} />
        <div
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          className="absolute top-0 left-0 flex justify-center items-center w-full h-full">
          {event.isEnrolled ? (
            <div className="px-4 py-2 text-xl font-semibold text-green-400 border-2 border-green-400 rounded-md">
              🎉 Du är anmäld 🎉
            </div>
          ) : (
            <TransparentButton onClick={() => navigate(`enroll/${event._id}`)}>
              <span className="text-xl font-semibold">Anmäl dig här</span>
            </TransparentButton>
          )}
        </div>
      </div>
      <p className="text-lg">{event.description}</p>
    </div>
  );
}
