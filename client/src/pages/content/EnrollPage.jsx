import { IoIosArrowRoundBack } from "react-icons/io";
import EnrollForm from "../../components/content/event/EnrollForm";
import PrimaryBtn from "../../components/btn/PrimaryBtn";
import { useNavigate } from "react-router";
import TransparentButton from "@/components/btn/TransparentButton";

export default function EnrollPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-y-12">
      <div className="w-fit p-4 mb">
        <TransparentButton onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack size={24} />
          Tillbaka
        </TransparentButton>
      </div>
      <EnrollForm />
    </div>
  );
}
