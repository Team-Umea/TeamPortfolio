export default function PrimaryBtn({ type = "button", onClick, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex justify-center items-center w-full gap-x-2 px-6 py-2 text-white rounded-full bg-blue-700 transition-all duration-300 ease hover:bg-blue-600 shadow-xl cursor-pointer"
    >
      {children}
    </button>
  );
}
