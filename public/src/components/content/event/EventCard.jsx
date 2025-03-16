import React from "react";
import TransparentButton from "../../btn/TransparentButton";
import { IoCalendarOutline } from "react-icons/io5";

export default function EventCard({ event }) {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <p className="text-2xl font-semibold">{event.event}</p>
        <div className="flex items-center gap-x-2">
          <IoCalendarOutline size={24} />
          <p className="text-lg">{event.date}</p>
        </div>
      </div>
      <div className="relative">
        <img src={event.image} alt={event.event} />
        <div
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          className="absolute top-0 left-0 flex justify-center items-center w-full h-full">
          <TransparentButton onClick={() => {}}>
            <span className="text-xl font-semibold">Anmäl dig här</span>
          </TransparentButton>
        </div>
      </div>
      <p className="text-lg">{event.description}</p>
    </div>
  );
}
