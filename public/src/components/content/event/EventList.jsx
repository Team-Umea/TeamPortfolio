import React from "react";
import EventCard from "./EventCard";

export default function EventList({ events }) {
  return (
    <ul className="flex flex-col gap-y-32 mx-auto w-[90%] max-w-[1000px]">
      {events.map((event) => {
        return <EventCard event={event} key={event._id} />;
      })}
    </ul>
  );
}
