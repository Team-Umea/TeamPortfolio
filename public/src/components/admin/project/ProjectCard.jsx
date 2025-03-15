import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteBtn from "../../btn/DeleteBtn";
import PrimaryBtn from "../../btn/PrimaryBtn";
import { deleteProject } from "../../../api/admin/project";
import ReadmeViewer from "./ReadmeViewer";
import TechBadge from "./TechBadge";
import { FaGithub } from "react-icons/fa6";

export default function ProjectCard({ project, onDelete }) {
  const naviagte = useNavigate();
  const queryClient = useQueryClient();

  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      onDelete(`${project.project} har raderats`);
      queryClient.invalidateQueries(["projects"]);
    },
    onError: () => {
      onDelete(`Det uppstod ett fel med att radera ${project.project}`);
    },
  });

  const handleDelete = () => {
    deleteProjectMutation.mutate(project._id);
  };

  const users = [
    "userOneIShere",
    "userOneIShere",
    "userOneIShere",
    "userOneIShere",
    "userOneIShere",
    "userOneIShere",
    "userOneIShere",
    "userOneIShere",
  ];

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-6">
        <p className="text-5xl font-semibold">{project.project}</p>
        <div className="flex gap-x-4">
          <PrimaryBtn onClick={() => naviagte(project._id)}>
            <span className="font-medium">Hantera Projekt</span>
          </PrimaryBtn>
          <DeleteBtn onClick={handleDelete} />
        </div>
      </div>
      <a href={project.github} target="_blank" className="flex gap-x-2">
        <FaGithub size={24} />
        <p>Github</p>
      </a>
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
    </div>
  );
}
