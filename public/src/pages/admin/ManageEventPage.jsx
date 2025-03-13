import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { getEventById } from "../../api/admin/event";
import Loader from "../../components/common/Loader";
import PrimaryBtn from "../../components/btn/PrimaryBtn";
import { IoIosArrowRoundBack } from "react-icons/io";
import EventForm from "../../components/admin/event/EventForm";

export default function ManageEventPage() {
  const navigate = useNavigate();
  const { eventid: eventID } = useParams();
  const {
    data: event,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getEventById(eventID),
    queryKey: ["event", eventID],
    retry: false,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!event) {
    return (
      <div className="flex flex-col gap-y-12">
        <div className="w-fit p-4">
          <PrimaryBtn onClick={() => navigate(-1)}>
            <IoIosArrowRoundBack size={24} />
            Tillbaka
          </PrimaryBtn>
        </div>
        <h2 className=" px-4 text-2xl text-red-500 font-semibold">{error?.message}</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-12">
      <div className="w-fit p-4">
        <PrimaryBtn onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack size={24} />
          Tillbaka
        </PrimaryBtn>
      </div>
      <EventForm event={event} />
    </div>
  );
}
