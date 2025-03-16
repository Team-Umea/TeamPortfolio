import React from "react";
import useAuthStore from "../../hooks/useAuthStore";
import { LuUserRound } from "react-icons/lu";
import { MdOutlineEventNote } from "react-icons/md";
import { AiOutlineProject } from "react-icons/ai";
import { BsQuestionSquare } from "react-icons/bs";
import AdminTab from "./AdminTab";

const ADMIN_LINKS = [
  {
    link: "/admin",
    text: "Profil",
    icon: <LuUserRound size={24} />,
  },
  {
    link: "/admin/events",
    text: "Evenemang",
    icon: <MdOutlineEventNote size={24} />,
  },
  {
    link: "/admin/projects",
    text: "Projekt",
    icon: <AiOutlineProject size={24} />,
  },
];

export default function AdminHeader() {
  const { username, email } = useAuthStore();

  return (
    <div className="flex flex-col md:flex-row justify-between gap-y-4 py-4 md:py-2 px-4 bg-slate-300">
      <div className="flex flex-col">
        <h2 className="text-lg text-gray-800 font-semibold">Välkommen {username}</h2>
        <h3 className="text-gray-700 font-medium">{email}</h3>
        <h4 className="text-md text-gray-700">Admin</h4>
      </div>
      <ul className="flex items-center gap-x-12 py-2 md:p-0 overflow-x-scroll md:overflow-x-auto">
        {ADMIN_LINKS.map((link, index) => {
          return (
            <AdminTab key={link.link + index} link={link.link}>
              <span className="text-lg">{link.text}</span>
              {link.icon}
            </AdminTab>
          );
        })}
      </ul>
    </div>
  );
}
