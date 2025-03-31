import React from "react";
import { useNavigate } from "react-router";
import PrimaryBtn from "../../btn/PrimaryBtn";
import { ProjectCardCarousel } from "./ProjectCardCarousel";

export default function ProjectSection() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center gap-y-8 h-screen">
      <h1 className="text-3xl md:text-4xl font-semibold">Projekt sektion</h1>
      
      <div className="w-full h-full py-20">
      
        {/* <div className="w-fit">
          <PrimaryBtn onClick={() => navigate("projects")}>
            <span className="text-lg font-semibold">Se projekt</span>
          </PrimaryBtn>
        </div> */}
      </div>
      <ProjectCardCarousel/>

      
    </div>
  );
}
