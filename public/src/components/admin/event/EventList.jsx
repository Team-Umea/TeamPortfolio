import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getEvents } from "../../../api/admin/event";
import Loader from "../../common/Loader";
import EventCard from "./EventCard";

export default function EventList({ setToastMessage }) {
  const {
    data: events = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryFn: getEvents,
    queryKey: ["events"],
    staleTime: 0,
  });

  const onDeleteEvent = (message) => {
    setToastMessage(message);
  };

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (!events.length) {
    return <h2 className="px-4 text-2xl text-red-500 font-semibold">Inga evenemang tillagda</h2>;
  }

  return (
    <ul className="flex flex-col gap-y-32 m-auto w-[90%] max-w-[1100px]">
      {events.map((event) => {
        return (
          <li key={event._id}>
            <EventCard event={event} onDelete={onDeleteEvent} />
          </li>
        );
      })}
    </ul>
  );
}
