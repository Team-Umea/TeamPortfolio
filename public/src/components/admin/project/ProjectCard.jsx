import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteBtn from "../../btn/DeleteBtn";
import PrimaryBtn from "../../btn/PrimaryBtn";
import { deleteProject } from "../../../api/admin/project";
import ReadmeViewer from "./ReadmeViewer";

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

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex justify-between">
        <div className="flex items-end gap-x-2">
          <p className="text-2xl font-semibold">{project.project}</p>
          {/* <p className="text-lg">{event.date}</p> */}
        </div>
        <div className="flex gap-x-4">
          <PrimaryBtn onClick={() => naviagte(project._id)}>
            <span className="font-medium">Hantera Projekt</span>
          </PrimaryBtn>
          <DeleteBtn onClick={handleDelete} />
        </div>
      </div>
      <ReadmeViewer githubUrl={project.github} />
      {/* <img src={event.image} alt={event.event} />
      <p>{event.description}</p> */}
    </div>
  );
}
