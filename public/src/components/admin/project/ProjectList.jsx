import { useQuery } from "@tanstack/react-query";
import Loader from "../../common/Loader";
import ProjectCard from "./ProjectCard";
import { getProjects } from "../../../api/admin/project";

export default function ProjectList({ setToastMessage }) {
  const { data: projects = [], isLoading } = useQuery({
    queryFn: getProjects,
    queryKey: ["projects"],
    staleTime: 0,
  });

  const onDeleteEvent = (message) => {
    setToastMessage(message);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!projects.length) {
    return <h2 className="px-4 text-2xl text-red-500 font-semibold">Inga projekt tillagda</h2>;
  }

  return (
    <ul className="flex flex-col gap-y-32 m-auto w-[90%] max-w-[1100px]">
      {projects.map((project) => {
        return (
          <li key={project._id}>
            <ProjectCard project={project} onDelete={onDeleteEvent} />
          </li>
        );
      })}
    </ul>
  );
}
