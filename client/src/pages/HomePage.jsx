import useContentStore from "../hooks/useContentStore";
import Loader from "../components/common/Loader";
import Hero from "../components/content/layout/Hero";
import ProfileSection from "../components/content/layout/ProfileSection";
import EventSection from "../components/content/layout/EventSection";
import ProjectSection from "../components/content/layout/ProjectSection";
import WorflowBanner from "../components/content/layout/WorkflowBanner";

export default function HomePage() {
  const { loading } = useContentStore();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Hero />
      <ProfileSection />
      <EventSection />
      <ProjectSection />
      <WorflowBanner />
    </div>
  );
}
