import ProfileList from "../components/content/profile/ProfileList";
import useContentStore from "../hooks/useContentStore";

export default function HomePage() {
  const { profiles } = useContentStore();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-6xl font-bold mb-24">Team Umeå</h1>
      <ProfileList profiles={profiles} />
    </div>
  );
}
