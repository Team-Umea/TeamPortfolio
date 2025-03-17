import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import { getEventQuestions } from "../../../api/admin/event";
import Loader from "../../../components/common/Loader";
import InquiryCard from "../../../components/admin/event/InquiryCard";

export default function EventInquiryPage() {
  const { eventid: eventID } = useParams();
  const {
    data: inquries,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getEventQuestions(eventID),
    queryKey: ["eventInquiries"],
  });

  if (error) {
    return <h2 className="p-4 text-2xl font-semibold text-red-500">{error.message}</h2>;
  }

  if (isLoading) {
    return <Loader />;
  }

  const isEmpty = inquries.length === 0;

  if (isEmpty) {
    return (
      <h2 className="p-4 mt-6 text-2xl font-semibold">Inga frågor inskickade till detta event</h2>
    );
  }

  return (
    <div className="flex justify-center pt-[120px]">
      <ul className="flex flex-col gap-y-32">
        {inquries.map((inquiry, index) => {
          return <InquiryCard key={index} inquiry={inquiry} />;
        })}
      </ul>
    </div>
  );
}
