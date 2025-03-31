export default function OutlineBtn({ type = "button", fullWidth = false, onClick, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ width: fullWidth ? "100%" : "fit-content" }}
      onMouseLeave={(e) => e.target.blur()}
      className="flex justify-center items-center h-fit text-zinc-400 font-semibold py-2 px-4 rounded-full border-2 border-zinc-400 transition-opacity duration-500 cursor-pointer group hover:opacity-60 bg-transparent">
      {children && (
        <span className="flex items-center justify-center gap-x-2 transition-transform duration-300 group-hover:translate-x-[5px]">
          {children}
        </span>
      )}
    </button>
  );
}
