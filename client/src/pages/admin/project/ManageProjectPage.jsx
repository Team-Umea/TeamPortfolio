import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { getProjectById } from "../../../api/admin/project";
import Loader from "../../../components/common/Loader";
import PrimaryBtn from "../../../components/btn/PrimaryBtn";
import { IoIosArrowRoundBack } from "react-icons/io";
import ProjectForm from "../../../components/admin/project/ProjectForm";
import TransparentButton from "@/components/btn/TransparentButton";

export default function ManageProjectPage() {
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
      <div className="w-fit p-4">
        <TransparentButton onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack size={24} />
          Tillbaka
        </TransparentButton>
      </div>
      <ProjectForm project={project} />
    </div>
  );
}
