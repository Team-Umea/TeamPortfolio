import React from "react";

export default function TechBadge({ tech }) {
  return (
    <div className="px-4 py-2 w-fit rounded-full font-medium text-white bg-blue-400">{tech}</div>
  );
}
