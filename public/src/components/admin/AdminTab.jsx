import React from "react";
import { NavLink } from "react-router";

export default function AdminTab({ link, children }) {
  return (
    <NavLink
      to={link}
      end
      className={({ isActive }) =>
        `flex justify-center items-center gap-x-2 h-fit pb-1 ${
          isActive
            ? "border-b-2 border-gray-500"
            : "transition-all duration-300 ease border-b-2 border-transparent hover:border-gray-500 hover:opacity-70"
        }`
      }>
      {children}
    </NavLink>
  );
}
