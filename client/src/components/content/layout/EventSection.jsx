import { useNavigate } from "react-router";
import PrimaryBtn from "../../btn/PrimaryBtn";
import useContentStore from "@/hooks/useContentStore";
import { sortByTodayDate } from "@/utils/helpers";
import { IoCalendarOutline } from "react-icons/io5";
import FadeInOnScroll from "@/layouts/animations/FadeInOnScroll";

export default function EventSection() {
  const navigate = useNavigate();
  const { events } = useContentStore();

  const sortedEvents = sortByTodayDate(events, "date");

  const firstEvent = sortedEvents && sortedEvents.length > 0 ? sortedEvents[0] : null;

  return (
    <div className="bg-slate-800/20 my-24 w-screen">
      <FadeInOnScroll>
        <div className="flex md:grid! md:grid-cols-[repeat(2,1fr)]! flex-col items-center md:items-start! gap-6 py-6 px-22! mx-auto w-[90%] max-w-[1200px] my-22 border-y-2 md:border-x-2 md:border-y-0!">
          <h3 className="mx-auto md:text-4xl text-xl font-bold font-sans text-gray-200!">
            Är du nyfiken på våra evenemang?
          </h3>
          <p className="text-lg text-white! text-left! col-start-1 row-start-2 px-4 md:px-0! max-w-screen md:w-auto! w-screen  md:w-auto!">
            Vi arrangerar evenemang för att utöka vårt kontaktnät genom att knyta an till
            branschkollegor. Målet är både att ta till oss ny kunskap och att dela med oss av den
            expertis vi besitter. Tillsammans arbetar vi som ett team för att skapa betydelsefulla
            och användbara projekt som verkligen kan göra skillnad.
          </p>
          {firstEvent && (
            <div className="flex flex-col items-end col-start-2 row-start-1">
              <h4 className="flex items-center gap-x-2 text-xl">
                Nästa Evenemang
                <IoCalendarOutline size={24} />
              </h4>
              <div className="px-2 mt-2">
                <p>
                  <span className="text-gray-400! font-semibold">Vad? </span>
                  {firstEvent.event}
                </p>
                <p>
                  <span className="text-gray-400! font-semibold">När? </span>
                  {firstEvent.date}
                </p>
                <p>
                  <span className="text-gray-400! font-semibold">Tid? </span>
                  {firstEvent.time}
                </p>
                <p>
                  <span className="text-gray-400! font-semibold">Var? </span>
                  {firstEvent.place}
                </p>
              </div>
            </div>
          )}
          <div className="flex justify-end items-end col-start-2 row-start-2 h-full">
            <div className="w-fit">
              <PrimaryBtn onClick={() => navigate("events")}>
                <span className="text-lg font-semibold">Se alla evenemang</span>
              </PrimaryBtn>
            </div>
          </div>
        </div>
      </FadeInOnScroll>
    </div>
  );
}
