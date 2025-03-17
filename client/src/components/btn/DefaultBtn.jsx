import React from "react";

export default function DefaultBtn({ type = "button", onClick, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="cursor-pointer transition-all duration-300 ease hover:opacity-70">
      {children}
    </button>
  );
}
