import { useNavigate } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import PrimaryBtn from "../../../components/btn/PrimaryBtn";
import ProfileForm from "../../../components/admin/profile/ProfileForm";
import useProfileStore from "../../../hooks/useProfileStore";

export default function ManageProfilePage() {
  const navigate = useNavigate();
  const { profile } = useProfileStore();

  return (
    <>
      <div className="w-fit p-4">
        {profile && (
          <PrimaryBtn onClick={() => navigate(-1)}>
            <IoIosArrowRoundBack size={24} />
            Tillbaka
          </PrimaryBtn>
        )}
      </div>
      <ProfileForm />
    </>
  );
}
