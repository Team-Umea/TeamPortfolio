import React from "react";
import useContentStore from "../../hooks/useContentStore";
import Loader from "../../components/common/Loader";
import Timeline from "@/components/content/ui/Timeline";
import { Outlet, useParams } from "react-router";

export default function ContentProjectPage() {
  const { projectid: projectID } = useParams();
  const { loading } = useContentStore();

  if (projectID) {
    return <Outlet />;
  }

  if (loading) {
    return <Loader />;
  }

  return <Timeline />;
}
