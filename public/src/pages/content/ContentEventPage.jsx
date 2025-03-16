import useContentStore from "../../hooks/useContentStore";
import Loader from "../../components/common/Loader";
import EventList from "../../components/content/event/EventList";
import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";

export default function ContentEventPage() {
  const location = useLocation();
  const { fetchContent, events, loading } = useContentStore();

  const isEnrollPage = location.pathname.includes("enroll");

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    console.log("THis is some events: ", events);
  }, [events]);

  if (loading) {
    return <Loader />;
  }

  if (isEnrollPage) {
    return <Outlet />;
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
