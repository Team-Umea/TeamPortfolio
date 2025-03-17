import { IoIosArrowRoundBack } from "react-icons/io";
import EnrollForm from "../../components/content/event/EnrollForm";
import PrimaryBtn from "../../components/btn/PrimaryBtn";
import { useNavigate } from "react-router";

export default function EnrollPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-y-12">
      <div className="w-fit p-4 mb">
        <PrimaryBtn onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack size={24} />
          Tillbaka
        </PrimaryBtn>
      </div>
      <EnrollForm />
    </div>
  );
}
