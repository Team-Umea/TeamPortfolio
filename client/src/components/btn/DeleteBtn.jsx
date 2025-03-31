import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";

export default function DeleteBtn({ onClick, iconSize = 24 }) {
  const [hasConfirmed, setHasConfirmed] = useState(false);

  const handleClick = () => {
    hasConfirmed && onClick && onClick();
    setHasConfirmed((prev) => !prev);
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-1 shadow-lg rounded-full bg-red-700! transition-all duration-300 ease hover:opacity-70 shadow-xl cursor-pointer">
      {hasConfirmed ? (
        <IoMdCheckmark size={iconSize} color="white" />
      ) : (
        <FaRegTrashCan size={iconSize} color="white" />
      )}
    </button>
  );
}
