import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/api/members");

      if (!response.ok) {
        throw new Error("Error fetching members");
      }

      const result = await response.json();

      setMembers(result.members);
    })();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-6xl font-bold mb-24">Team Umeå</h1>
      <ul className="space-y-2">
        {members.map((member, index) => {
          return (
            <li key={index} className="text-2xl text-center text-gray-700 font-semibold">
              {member}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
