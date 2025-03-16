import useContentStore from "../../hooks/useContentStore";
import Loader from "../../components/common/Loader";
import EventList from "../../components/content/event/EventList";

export default function ContentEventPage() {
  const { events, loading } = useContentStore();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="mb-24 px-12 py-6 bg-gray-200">
        <h1 className="text-xl text-gray-700 font-medium">
          Välkommen till vår evenemangssida! Här kan du ta del av kommande evenemang som Team Umeå
          arrangerar. Du kan även anmäla dig och säkra din plats till de tillgängliga evenemangen.
        </h1>
      </div>
      <EventList events={events} />
    </>
  );
}
