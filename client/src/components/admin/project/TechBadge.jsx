import React from "react";

export default function TechBadge({ tech }) {
  return (
    <div className="px-4 py-2 border-3 w-fit rounded-full font-medium text-gray-300! border-blue-600!">
      {tech}
    </div>
  );
}
