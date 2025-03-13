import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getEvents } from "../../../api/admin/event";

export default function EventList() {
  const { data: events, isLoading } = useQuery({
    queryFn: getEvents,
    queryKey: ["events"],
  });

  console.log("Events: ", events);

  return <div></div>;
}
