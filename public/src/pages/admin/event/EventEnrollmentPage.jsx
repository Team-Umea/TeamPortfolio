import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import { getEventEnrollments } from "../../../api/admin/event";
import Loader from "../../../components/common/Loader";

export default function EventEnrollmentPage() {
  const { eventid: eventID } = useParams();
  const {
    data: enrollment,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getEventEnrollments(eventID),
    queryKey: ["eventEnrollments"],
  });

  if (error) {
    return <h2 className="p-4 text-2xl font-semibold text-red-500">{error.message}</h2>;
  }

  if (isLoading) {
    return <Loader />;
  }

  console.log("enrollment: ", enrollment);

  // Total enrollments
  const totalEnrollments = enrollment.length;

  return (
    <div className="flex justify-center pt-[120px] px-6">
      <table className="min-w-full text-left border-collapse">
        <thead>
          <tr>
            <th colSpan="2" className="border-b-2 border-gray-300 p-4">
              Total
            </th>
            <th className="border-b-2 border-gray-300 p-4">{totalEnrollments}</th>
          </tr>
          <tr>
            <th className="border-b border-gray-300 p-4">Namn</th>
            <th className="border-b border-gray-300 p-4">Organistion/Företag</th>
            <th className="border-b border-gray-300 p-4">Datum</th>
          </tr>
        </thead>
        <tbody>
          {enrollment.map((entry, index) => (
            <tr key={index}>
              <td className="border-b border-gray-200 p-4">{entry.name}</td>
              <td className="border-b border-gray-200 p-4">{entry.org}</td>
              <td className="border-b border-gray-200 p-4">{entry.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
