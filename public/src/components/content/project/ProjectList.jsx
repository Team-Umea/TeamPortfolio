import React from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectList({ projects }) {
  return (
    <ul className="flex flex-col gap-y-44 m-auto w-[90%] max-w-[1100px]">
      {projects.map((project) => {
        return <ProjectCard key={project._id} project={project} />;
      })}
    </ul>
  );
}
