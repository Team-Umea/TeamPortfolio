import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import PrimaryBtn from "../../../components/btn/PrimaryBtn";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import EventList from "../../../components/admin/event/EventList";
import useScrollTo from "../../../hooks/useScrollTo";
import Toast from "../../../components/common/Toast";
import TransparentButton from "@/components/btn/TransparentButton";

export default function EventsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventid: eventID } = useParams();
  const { scrollToTopSmooth } = useScrollTo();
  const [toastMessage, setToastMessage] = useState("");

  const isAddEventPage = location.pathname.includes("addevent");
  const isEnrollmentPage = location.pathname.includes("enrollments");
  const isInquiriesPage = location.pathname.includes("inquiries");
  const isManageEventPage = !!eventID;

  useEffect(() => {
    scrollToTopSmooth();
  }, []);

  if (isAddEventPage || isManageEventPage || isEnrollmentPage || isInquiriesPage) {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col gap-y-12">
      <div className="w-fit p-4">
        <TransparentButton onClick={() => navigate("addevent")}>
          <GoPlus size={24} />
          Lägg till evenemang
        </TransparentButton>
      </div>
      <EventList setToastMessage={setToastMessage} />
      <Toast message={toastMessage} show={!!toastMessage} onClose={() => setToastMessage("")} />
    </div>
  );
}
