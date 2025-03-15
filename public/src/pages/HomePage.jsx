import ProfileList from "../components/content/profile/ProfileList";
import useContentStore from "../hooks/useContentStore";
import Loader from "../components/common/Loader";
import PrimaryBtn from "../components/btn/PrimaryBtn";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();
  const { profiles, loading } = useContentStore();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-6xl font-bold mb-24">Team Umeå</h1>
      <ProfileList profiles={profiles} />
      <div className="flex flex-col items-center gap-y-12 my-22">
        <PrimaryBtn onClick={() => navigate("events")}>
          <span className="text-lg font-medium">Se evenemang</span>
        </PrimaryBtn>
        <PrimaryBtn onClick={() => navigate("projects")}>
          <span className="text-lg font-medium">Se projekt</span>
        </PrimaryBtn>
      </div>
    </div>
  );
}
