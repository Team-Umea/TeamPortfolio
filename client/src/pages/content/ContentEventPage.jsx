import useContentStore from "../../hooks/useContentStore";
import Loader from "../../components/common/Loader";
import EventList from "../../components/content/event/EventList";
import { Outlet, useParams } from "react-router";
import { useEffect } from "react";

export default function ContentEventPage() {
  const { eventid: eventID } = useParams();
  const { fetchContent, events, loading } = useContentStore();

  const isEnrollPage = eventID;

  useEffect(() => {
    fetchContent();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (isEnrollPage) {
    return <Outlet />;
  }

  return (
    <>
      <div className="mb-24 px-12 py-6 bg-customColor1 p-22! font-serif">
        <h1 className="text-xl text-gray-900 font-medium text-center ">
          Välkommen till vår evenemangssida! Här kan du ta del av kommande
          evenemang som Team Umeå arrangerar. Du kan även anmäla dig och säkra
          din plats till de tillgängliga evenemangen.
        </h1>
      </div>
      <EventList events={events} />
    </>
  );
}
