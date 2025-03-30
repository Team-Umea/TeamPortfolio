import React from "react";
import ProjectList from "../../components/content/project/ProjectList";
import useContentStore from "../../hooks/useContentStore";
import Loader from "../../components/common/Loader";

export default function ContentProjectPage() {
  const { projects, loading } = useContentStore();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="mb-24 px-12 py-12">
        <h1 className="text-xl text-gray-300 font-medium">
          Här presenterar vi de projekt som vi utvecklar som en grupp med agila arbetsmetoder. Vi
          strävar efter att maximera vårt samarbete och leverera högkvalitativa resultat, samtidigt
          som vi utvecklas och lär oss nya koncept.
        </h1>
      </div>
      <ProjectList projects={projects} />
    </>
  );
}
