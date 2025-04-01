import React from "react";
import { useNavigate } from "react-router";
import PrimaryBtn from "../../btn/PrimaryBtn";
import { ProjectCardCarousel } from "./ProjectCardCarousel";

export default function ProjectSection() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center gap-y-8 h-screen w-full">
      <h1 className="max-w-8xl mx-auto md:text-5xl text-xl font-bold font-sans">
        Projekt sektion
      </h1>
      <ProjectCardCarousel/>
    </div>
  );
}
