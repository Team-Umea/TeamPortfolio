import { useNavigate } from "react-router";
import ProfileForm from "../../components/admin/profile/ProfileForm";
import PrimaryBtn from "../../components/btn/PrimaryBtn";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function ManageProfilePage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-fit p-4">
        <PrimaryBtn onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack size={24} />
          Tillbaka
        </PrimaryBtn>
      </div>
      <ProfileForm />
    </>
  );
}
