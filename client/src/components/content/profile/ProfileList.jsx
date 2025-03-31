import React from "react";
import ProfileCard from "./ProfileCard";
import { AnimatedTestimonials } from "../../ui/animated-testimonials";

export default function ProfileList({ profiles }) {
  return (
    <ul className="flex flex-wrap gap-12">
      <AnimatedTestimonials testimonials={profiles} autoplay={ false} />
      {profiles.map((profile) => {
        return <ProfileCard key={profile._id} profile={profile} />;
      })}
    </ul>
  );
}
