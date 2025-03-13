import { useNavigate } from "react-router";
import DeleteBtn from "../../btn/DeleteBtn";
import PrimaryBtn from "../../btn/PrimaryBtn";

export default function EventCard({ event }) {
  const naviagte = useNavigate();
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex justify-between">
        <div className="flex items-end gap-x-2">
          <p className="text-2xl font-semibold">{event.event}</p>
          <p className="text-lg">{event.date}</p>
        </div>
        <div className="flex gap-x-4">
          <PrimaryBtn onClick={() => naviagte(event._id)}>
            <span className="font-medium">Hantera Evenemang</span>
          </PrimaryBtn>
          <DeleteBtn />
        </div>
      </div>
      <img src={event.image} alt={event.event} />
      <p>{event.description}</p>
    </div>
  );
}
