import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteBtn from "../../btn/DeleteBtn";
import PrimaryBtn from "../../btn/PrimaryBtn";
import { deleteEvent } from "../../../api/admin/event";

export default function EventCard({ event, onDelete }) {
  const naviagte = useNavigate();
  const queryClient = useQueryClient();

  const deleteEventMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      onDelete(`${event.event} har raderats`);
      queryClient.invalidateQueries(["events"]);
    },
    onError: () => {
      onDelete(`Det uppstod ett fel med att radera ${event.event}`);
    },
  });

  const handleDelete = () => {
    deleteEventMutation.mutate(event._id);
  };

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
          <DeleteBtn onClick={handleDelete} />
        </div>
      </div>
      <img src={event.image} alt={event.event} />
      <p>{event.description}</p>
    </div>
  );
}
