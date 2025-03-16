import React from "react";
import useContentStore from "../../../hooks/useContentStore";
import ProfileList from "../profile/ProfileList";

export default function ProfileSection() {
  const { profiles } = useContentStore();

  return (
    <div className="flex flex-col items-center gap-y-16 w-full p-8">
      <h1 className="w-full text-3xl md:text-4xl font-semibold">Team medlemmar </h1>
      <ProfileList profiles={profiles} />
    </div>
  );
}
