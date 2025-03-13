import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getEvents } from "../../../api/admin/event";
import Loader from "../../common/Loader";
import EventCard from "./EventCard";

export default function EventList() {
  const { data: events, isLoading } = useQuery({
    queryFn: getEvents,
    queryKey: ["events"],
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!events) {
    return <h2 className=" px-4 text-2xl text-red-500 font-semibold">Inga evenemang tillagda</h2>;
  }

  console.log("Events: ", events);

  return (
    <ul className="flex flex-col gap-y-32 m-auto w-[90%] max-w-[1100px]">
      {events.map((event, index) => {
        return (
          <li key={event + index}>
            <EventCard event={event} />
          </li>
        );
      })}
    </ul>
  );
}
