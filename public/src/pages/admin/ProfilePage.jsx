import { Navigate } from "react-router";
import useAuthStore from "../../hooks/useAuthStore";
import ProfileForm from "../../components/admin/profile/ProfileForm";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../api/admin";
import Loader from "../../components/common/Loader";

export default function ProfilePage() {
  const { isAuthenticated, isAdmin } = useAuthStore();
  const { data: profile, isLoading } = useQuery({
    queryFn: getProfile,
    queryKey: ["profile"],
  });

  if (!isAdmin) {
    if (!isAuthenticated) {
      return <Navigate to="/signin" />;
    } else {
      return <Navigate to="/user" />;
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ProfileForm />
    </>
  );
}
