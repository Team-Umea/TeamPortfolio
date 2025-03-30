import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { NavLink, Outlet, useNavigate, useParams } from "react-router";
import TransparentButton from "@/components/btn/TransparentButton";

export default function EventLayout() {
  const navigate = useNavigate();
  const { eventid: eventID } = useParams();

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between gap-y-8">
        <div className="w-fit">
          <TransparentButton onClick={() => navigate("/admin/events")}>
            <IoIosArrowRoundBack size={24} />
            Tillbaka
          </TransparentButton>
        </div>
        <div className="flex gap-x-12 px-4">
          <NavLink
            to={`/admin/events/event/${eventID}/enrollments`}
            className="text-lg transition-all duration-300 ease hover:opacity-70">
            Anmälningar
          </NavLink>
          <NavLink
            to={`/admin/events/event/${eventID}/inquiries`}
            className="text-lg transition-all duration-300 ease hover:opacity-70">
            Frågor
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
