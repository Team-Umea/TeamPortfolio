import { HiOutlineLightBulb } from "react-icons/hi";
import { MdDone } from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";
import { LuCodeXml } from "react-icons/lu";

export default function WorkflowBanner() {
  return (
    <div className="flex flex-col items-center my-24 w-[90%] max-w-[1200px] p-8 rounded-lg  shadow-[0_-5px_30px_rgb(255,255,255,0.2)] bg-black">
      <p className="text-2xl text-gray-300 font-medium">The Team Umeå Workflow</p>
      <div className="relative flex justify-between mt-16 mx-8 w-full">
        <div className="relative flex flex-col items-center z-2">
          <p className="absolute top-[-27px] text-lg text-gray-400 font-bold">1</p>
          <HiOutlineLightBulb size={44} className="p-2 rounded-full bg-black" />
        </div>
        <div className="relative flex flex-col items-center z-2">
          <p className="absolute top-[-27px] text-lg text-gray-400 font-bold">2</p>
          <PiUsersThree size={44} className="p-2 rounded-full bg-black" />
        </div>
        <div className="relative flex flex-col items-center z-2">
          <p className="absolute top-[-27px] text-lg text-gray-400 font-bold">3</p>
          <LuCodeXml size={44} className="p-2 rounded-full bg-black" />
        </div>
        <div className="relative flex flex-col items-center z-2">
          <p className="absolute top-[-27px] text-lg text-gray-400 font-bold">4</p>
          <MdDone size={44} className="p-2 rounded-full bg-black" />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-full bg-gradient-to-r from-blue-500 to-fuchsia-600" />
      </div>
    </div>
  );
}
