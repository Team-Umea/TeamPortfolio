import React from "react";
import { GoPlus } from "react-icons/go";
import PrimaryBtn from "../../components/btn/PrimaryBtn";
import { Outlet, useLocation, useNavigate } from "react-router";

export default function EventsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isAddEventPage = location.pathname.includes("addevent");

  if (isAddEventPage) {
    return <Outlet />;
  }

  return (
    <div>
      <div className="w-fit p-4">
        <PrimaryBtn onClick={() => navigate("addevent")}>
          <GoPlus size={24} />
          Lägg till evenemang
        </PrimaryBtn>
      </div>
    </div>
  );
}
