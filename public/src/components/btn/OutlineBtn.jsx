export default function OutlineBtn({ type = "button", onClick, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      onMouseLeave={(e) => e.target.blur()}
      className="flex justify-center items-center h-fit text-zinc-600 font-semibold py-[10px] px-[25px] rounded-full border-2 border-zinc-600 transition-opacity duration-500 cursor-pointer group hover:opacity-60 bg-transparent">
      {children && (
        <span className="flex items-center justify-center gap-x-2 transition-transform duration-300 group-hover:translate-x-[5px]">
          {children}
        </span>
      )}
    </button>
  );
}
