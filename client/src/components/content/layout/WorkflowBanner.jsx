import { HiOutlineLightBulb } from "react-icons/hi";
import { MdDone } from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";
import { LuCodeXml } from "react-icons/lu";

export default function WorkflowBanner() {
  return (
    <div className="flex flex-col items-center w-[90%] max-w-[1200px] my-24 pt-8 pb-32 rounded-lg bg-black">
      <p className="text-3xl lg:text-4xl md:mb-12 text-gray-300 text-center font-medium">
        The Team Umeå Workflow
      </p>
      <div className="hidden md:flex! relative justify-between mt-16 mx-8 w-full">
        <div className="relative flex flex-col items-center z-2">
          <p className="absolute top-[-27px] text-lg text-gray-400 font-bold">1</p>
          <HiOutlineLightBulb size={44} className="p-2 rounded-full bg-black" />
          <div className="flex flex-col items-center absolute top-[40px] text-lg text-gray-400 font-bold">
            <p>Kreativitet</p>
            <p>&</p>
            <p>AI</p>
          </div>
        </div>
        <div className="relative flex flex-col items-center z-2">
          <p className="absolute top-[-27px] text-lg text-gray-400 font-bold">2</p>
          <PiUsersThree size={44} className="p-2 rounded-full bg-black" />
          <div className="flex flex-col items-center absolute top-[40px] text-lg text-gray-400 font-bold">
            <p>Sammarbete</p>
            <p>&</p>
            <p>Agil/Scrum</p>
          </div>
        </div>
        <div className="relative flex flex-col items-center z-2">
          <p className="absolute top-[-27px] text-lg text-gray-400 font-bold">3</p>
          <LuCodeXml size={44} className="p-2 rounded-full bg-black" />
          <div className="flex flex-col items-center absolute top-[40px] text-lg text-gray-400 font-bold">
            <p>Kod</p>
            <p>&</p>
            <p>Versionshantering</p>
          </div>
        </div>
        <div className="relative flex flex-col items-center z-2">
          <p className="absolute top-[-27px] text-lg text-gray-400 font-bold">4</p>
          <MdDone size={44} className="p-2 rounded-full bg-black" />
          <div className="flex flex-col items-center absolute top-[40px] text-lg text-gray-400 font-bold">
            <p>Deadline</p>
            <p>&</p>
            <p>Leverans</p>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-[95%] bg-gradient-to-r from-blue-500 to-fuchsia-600" />
      </div>

      <div className="flex md:hidden! relative flex-col gap-y-54 mt-16 mx-8 w-full">
        <div className="relative flex flex-col items-center z-2">
          <HiOutlineLightBulb size={44} className="p-2 rounded-full bg-black" />
          <div className="flex flex-col items-center absolute top-[40px] text-lg text-gray-400 font-bold bg-black">
            <p>Kreativitet</p>
            <p>&</p>
            <p>AI</p>
          </div>
        </div>
        <div className="relative flex flex-col items-center z-2">
          <PiUsersThree size={44} className="p-2 rounded-full bg-black" />
          <div className="flex flex-col items-center absolute top-[40px] text-lg text-gray-400 font-bold bg-black">
            <p>Sammarbete</p>
            <p>&</p>
            <p>Agil/Scrum</p>
          </div>
        </div>
        <div className="relative flex flex-col items-center z-2">
          <LuCodeXml size={44} className="p-2 rounded-full bg-black" />
          <div className="flex flex-col items-center absolute top-[40px] text-lg text-gray-400 font-bold bg-black">
            <p>Kod</p>
            <p>&</p>
            <p>Versionshantering</p>
          </div>
        </div>
        <div className="relative flex flex-col items-center z-2">
          <MdDone size={44} className="p-2 rounded-full bg-black" />
          <div className="flex flex-col items-center absolute top-[40px] text-lg text-gray-400 font-bold bg-black">
            <p>Deadline</p>
            <p>&</p>
            <p>Leverans</p>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-2 bg-gradient-to-r from-blue-500 to-fuchsia-600" />
      </div>
    </div>
  );
}
