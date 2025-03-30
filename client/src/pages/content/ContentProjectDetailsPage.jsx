import { getProjectById } from "@/api/admin/project";
import ReadmeViewer from "@/components/admin/project/ReadmeViewer";
import TechBadge from "@/components/admin/project/TechBadge";
import TransparentButton from "@/components/btn/TransparentButton";
import Loader from "@/components/common/Loader";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { CiGlobe } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router";

export default function ContentProjectDetailsPage() {
  const navigate = useNavigate();
  const { projectid: projectID } = useParams();
  const {
    data: project,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getProjectById(projectID),
    queryKey: ["project", projectID],
    retry: false,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!project) {
    return (
      <div className="flex flex-col gap-y-12">
        <div className="w-fit p-4">
          <TransparentButton onClick={() => navigate(-1)}>
            <IoIosArrowRoundBack size={24} />
            Tillbaka
          </TransparentButton>
        </div>
        <h2 className=" px-4 text-2xl text-red-500 font-semibold">{error?.message}</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-12">
      <div className="w-fit p-4 py-6">
        <TransparentButton onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack size={24} />
          Tillbaka
        </TransparentButton>
      </div>
      <div className="flex flex-col gap-y-6 px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-6">
          <p className="text-5xl font-semibold">{project.project}</p>
        </div>
        <div className="flex gap-x-8 my-4">
          <a href={project.github} target="_blank" className="flex items-center gap-x-1">
            <FaGithub size={30} />
            <p className="text-lg font-medium">Github</p>
          </a>
          {project.website && (
            <a href={project.website} target="_blank" className="flex items-center gap-x-1">
              <CiGlobe size={30} />
              <p className="text-lg font-medium">Live demo</p>
            </a>
          )}
        </div>
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col md:flex-row gap-x-12">
            <div className="flex gap-x-1 text-lg">
              <p className=" font-semibold">Projektstart:</p>
              <p>{project.startDate}</p>
            </div>
            {project.endDate && (
              <div className="flex gap-x-1 text-lg">
                <p className=" font-semibold">Projektavslut:</p>
                <p>{project.endDate}</p>
              </div>
            )}
          </div>
          <ul className="flex flex-wrap gap-4">
            {project.techStack.map((tech, index) => {
              return <TechBadge key={tech + index} tech={tech} />;
            })}
          </ul>
        </div>
        <div>
          <p className="text-2xl font-semibold">Medlemmar</p>
          <ul className="flex flex-col gap-2 p-4">
            {project.colleagues.map((user, index) => {
              return (
                <p key={user + index} className="font-semibold text-gray-500">
                  {user}
                </p>
              );
            })}
          </ul>
        </div>
        {project.description && <p className="my-4 text-xl">{project.description}</p>}
        <div>
          <p className="text-xl font-medium text-gray-600">README</p>
          <div className="p-4">
            <ReadmeViewer githubUrl={project.github} />
          </div>
        </div>
        <ul className="flex flex-wrap justify-center gap-8 mt-12">
          {project.images.map((img, index) => {
            return (
              <li key={index}>
                <img src={img} alt={index} className="w-full max-w-[700px]" />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
