import React from "react";
import ProfileCard from "./ProfileCard";

export default function ProfileList({ profiles }) {
  return (
    <ul className="flex flex-wrap gap-12">
      {profiles.map((profile) => {
        return <ProfileCard key={profile._id} profile={profile} />;
      })}
    </ul>
  );
}
