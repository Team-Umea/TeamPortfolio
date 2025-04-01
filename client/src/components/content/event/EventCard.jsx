import React from "react";
import TransparentButton from "../../btn/TransparentButton";
import { IoCalendarOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import PrimaryBtn from "../../btn/PrimaryBtn";

export default function EventCard({ event }) {
  const navigate = useNavigate();

  const text = event.description.split(".");

  return (
    <div className="flex flex-col gap-y-2   rounded-2xl! text-gray-200">
      <div className="flex  items-center p-4    ">
        <div className="flex flex-col gap-y-2 px-1 justify-center">
          <p className="text-2xl font-semibold">{event.event}</p>
          <div className="flex items-center gap-x-1">
            <div className="flex items-center gap-x-1">
              <IoCalendarOutline size={24} />
              <p className="text-lg">{event.date}</p>
            </div>
            {event.time && event.time !== "undefined" && <p className="text-lg">: {event.time}</p>}
          </div>
          <p className="text-lg">{event.place}</p>
        </div>
      </div>
      <div className="relative ">
        <div className="">
          <img src={event.image} alt={event.event} className=" w-full rounded-2xl " />
        </div>
        <div
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          className="absolute top-0 left-0 flex justify-center items-center w-full h-full rounded-2xl">
          {event.isEnrolled ? (
            <div className="px-6 py-3 text-2xl font-bold text-white border-1 border-white rounded-lg bg-transparent transform transition-all duration-300 hover:text-green-400! hover:border-green-400! hover:scale-105">
              🎉 Du är anmäld 🎉
            </div>
          ) : (
            <TransparentButton onClick={() => navigate(`enroll/${event._id}`)}>
              <span className="text-xl font-semibold">Anmäl dig här</span>
            </TransparentButton>
          )}
        </div>
      </div>
      <div className="rounded-b-lg mb-[-40px] md:mb-0">
        <ul className="flex flex-col gap-y-4 text-gray-200 text-customColor1 font-serif text-xl p-8 pt-2 text-left md:my-12">
          {text.map((t, i) => {
            const endsWithLetterOrNumber = /[a-zA-Z0-9]$/.test(t);
            return (
              <li key={i}>
                {t}
                {endsWithLetterOrNumber ? "." : ""}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="py-6 px-10 ">
        {event.isEnrolled && (
          <PrimaryBtn onClick={() => navigate(`questions/${event._id}`)}>
            <span className="text-xl font-medium">Frågor eller Önskemål</span>
          </PrimaryBtn>
        )}
      </div>
    </div>
  );
}
