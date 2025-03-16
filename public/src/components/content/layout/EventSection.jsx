import { useNavigate } from "react-router";
import PrimaryBtn from "../../btn/PrimaryBtn";

export default function EventSection() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center gap-y-8 h-screen">
      <h1 className="text-3xl md:text-4xl font-semibold">Evenemang sektion</h1>
      <div className="w-fit">
        <PrimaryBtn onClick={() => navigate("events")}>
          <span className="text-lg font-semibold">Evenemang projekt</span>
        </PrimaryBtn>
      </div>
    </div>
  );
}
