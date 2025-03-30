import React, { useEffect, useState } from "react";
import { Timeline } from "primereact/timeline";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "../../../components/content/ui/Timeline.css";
import { useNavigate } from "react-router";
import useContentStore from "@/hooks/useContentStore";
import TechBadge from "@/components/admin/project/TechBadge";
import PrimaryBtn from "@/components/btn/PrimaryBtn";

export default function TemplateDemo() {
  const navigate = useNavigate();
  const { projects } = useContentStore();

  const reversedProjects = [...projects].reverse();

  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const items = document.querySelectorAll(".timeline-item");
    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setVisibleItems((prev) => [...prev, index]);
      }
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const items = document.querySelectorAll(".timeline-item");
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setVisibleItems((prev) => [...prev, index]);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const customizedMarker = (project) => {
    return <p className="whitespace-nowrap text-lg my-4">{project.startDate}</p>;
  };

  const customizedContent = (project, index) => {
    return (
      <Card
        className={`timeline-item ${visibleItems.includes(index) ? "visible" : ""} bg-transparent`}
        title={project.project}
        subTitle={`${project.startDate} - ${project.endDate ? project.endDate : "Now"}`}>
        <ul className="flex flex-wrap justify-center gap-4 my-3">
          {project.techStack.map((tech, index) => {
            return <TechBadge key={tech + index} tech={tech} />;
          })}
        </ul>
        <p className="text-lg mb-4">{project.description}</p>
        <img alt="img" src={project.images[0].url} className="w-full opacity-80" />
        <div className="w-fit mx-auto mt-4">
          <PrimaryBtn onClick={() => navigate(project._id)}>
            <span className="text-lg font-semibold">Se mer</span>
          </PrimaryBtn>
        </div>
      </Card>
    );
  };

  return (
    <div className="card">
      <div className="mt-0 mb-6 px-12 py-14 font-serif ">
        <h1 className="flex flex-col gap-y-2 text-3xl sm:text-4xl md:text-4xl font-bold text-gray-200 bg-clip-text bg-gradient-to-r text-center relative animate-fadeIn">
          <span className="before:text-gray-500 before:absolute before:left-0 before:top-1/2 before:transform before:translate-y-[-50%]">
            Vår Resa
          </span>
          <span className="after:text-gray-500 after:absolute after:right-0 after:top-1/2 after:transform after:translate-y-[-50%]">
            En översikt av vår utvecklingsresa och viktiga milstolpar.
          </span>
        </h1>
      </div>
      <div className="timeline-container">
        <div className="timeline-line" />
        <div className="w-[90%] m-auto">
          <Timeline
            value={reversedProjects}
            align="alternate"
            className="customized-timeline"
            marker={customizedMarker}
            content={customizedContent}
          />
        </div>
      </div>
    </div>
  );
}
