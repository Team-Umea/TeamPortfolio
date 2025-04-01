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
      <div className="mt-0 mb-6 px-12 pt-30 py-14 font-serif ">
        <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-gray-200 max-w-[800px] m-auto bg-clip-text bg-gradient-to-r text-center relative animate-fadeIn">
          <span className="before:text-gray-500 before:absolute before:left-0 before:top-1/2 before:transform before:translate-y-[-50%]">
            Välkommen till vår evenemangssida!
          </span>
          <br />
          <span className="after:text-gray-500 after:absolute after:right-0 after:top-1/2 after:transform after:translate-y-[-50%]">
            Här kan du ta del av kommande evenemang som Team Umeå arrangerar.
          </span>
          <span className="block mt-6 text-lg text-red-300!">
            Kom ihåg att anmäla dig och säkra din plats till de tillgängliga
            evenemangen!
            <br />
            Vi ser fram emot att ha dig med!
          </span>
        </h1>
      </div>
      <EventList events={events} />
    </>
  );
}
