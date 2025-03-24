import { Navigate } from "react-router";
import useAuthStore from "../../../hooks/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../../api/admin/profile";
import Loader from "../../../components/common/Loader";
import Profile from "../../../components/admin/profile/Profile";
import { useEffect } from "react";
import useProfileStore from "../../../hooks/useProfileStore";

export default function ProfilePage() {
  const { isAuthenticated, isAdmin, userID } = useAuthStore();
  const { updateProfile } = useProfileStore();
  const { data: profile, isLoading } = useQuery({
    queryFn: () => getProfile(userID),
    queryKey: ["profile"],
    retry: false,
  });

  useEffect(() => {
    if (profile) {
      updateProfile(profile);
    }
  }, [profile]);

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

  if (!profile) {
    return <Navigate to="manageprofile" />;
  }

  return (
    <>
      <Profile profile={profile} />
    </>
  );
}
