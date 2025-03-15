import React from "react";

export default function ProfileCard({ profile }) {
  return (
    <div className="flex flex-col items-center gap-y-6">
      <p>{profile.name}</p>
      <img src={profile.profileImage} alt={profile.name} className="w-[90%] max-w-[400px]" />
    </div>
  );
}
