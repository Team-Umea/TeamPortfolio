import ProfileList from "../components/content/profile/ProfileList";
import useContentStore from "../hooks/useContentStore";
import Loader from "../components/common/Loader";
import PrimaryBtn from "../components/btn/PrimaryBtn";
import { useNavigate } from "react-router";
import Hero from "../components/content/layout/Hero";
import ProfileSection from "../components/content/layout/ProfileSection";
import EventSection from "../components/content/layout/EventSection";
import ProjectSection from "../components/content/layout/ProjectSection";
import Timeline from '../components/content/ui/Timeline'



export default function HomePage() {
  const navigate = useNavigate();
  const { loading } = useContentStore();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Hero />
      < Timeline />
      <ProfileSection />
      <EventSection />
      <ProjectSection />
    </div>
  );
}
