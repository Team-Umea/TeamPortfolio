import React from "react";

export default function InquiryCard({ inquiry }) {
  return (
    <div>
      <div className="flex flex-col gap-y-1">
        <div className="flex gap-x-2">
          <p className="font-semibold">Namn</p>
          <p>{inquiry.name}</p>
        </div>
        <div className="flex gap-x-2">
          <p className="font-semibold">Organisation eller företag</p>
          <p>{inquiry.name}</p>
        </div>
        <div className="flex gap-x-2">
          <p className="font-semibold">Inskickat</p>
          <p>{inquiry.date}</p>
        </div>
      </div>
      <p className="mt-6 px-6 italic">"{inquiry.question}"</p>
    </div>
  );
}
