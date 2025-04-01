import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import PrimaryBtn from "../../../components/btn/PrimaryBtn";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import useScrollTo from "../../../hooks/useScrollTo";
import Toast from "../../../components/common/Toast";
import ProjectList from "../../../components/admin/project/ProjectList";
import TransparentButton from "@/components/btn/TransparentButton";

export default function ProjectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectid: projectID } = useParams();
  const { scrollToTopSmooth } = useScrollTo();
  const [toastMessage, setToastMessage] = useState("");

  const isAddProjectPage = location.pathname.includes("addproject");
  const isManageProjectPage = !!projectID;

  useEffect(() => {
    scrollToTopSmooth();
  }, []);

  if (isAddProjectPage || isManageProjectPage) {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col gap-y-12">
      <div className="w-fit p-4">
        <TransparentButton onClick={() => navigate("addproject")}>
          <GoPlus size={24} />
          Lägg till projekt
        </TransparentButton>
      </div>
      <ProjectList setToastMessage={setToastMessage} />
      <Toast message={toastMessage} show={!!toastMessage} onClose={() => setToastMessage("")} />
    </div>
  );
}
