export default function TransparentButton({ type = "button", onClick, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex justify-center items-center gap-x-2 px-4 py-2 text-white rounded-md border-2 border-white bg-transparent transition-all duration-300 ease hover:opacity-60 cursor-pointer">
      {children}
    </button>
  );
}
