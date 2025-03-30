import React from "react";
import { useNavigate } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import PrimaryBtn from "../../../components/btn/PrimaryBtn";
import ProjectForm from "../../../components/admin/project/ProjectForm";
import TransparentButton from "@/components/btn/TransparentButton";

export default function AddProjectPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-y-12">
      <div className="w-fit p-4 mb">
        <TransparentButton onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack size={24} />
          Tillbaka
        </TransparentButton>
      </div>
      <ProjectForm />
    </div>
  );
}
