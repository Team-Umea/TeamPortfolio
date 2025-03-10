import { Navigate } from "react-router";
import useAuthStore from "../../hooks/useAuthStore";
import ProfileForm from "../../components/admin/profile/ProfileForm";

export default function AdminPage() {
  const { isAuthenticated, isAdmin, username, email } = useAuthStore();

  if (!isAdmin) {
    if (!isAuthenticated) {
      return <Navigate to="/signin" />;
    } else {
      return <Navigate to="/user" />;
    }
  }

  return (
    <>
      <ProfileForm />
    </>
  );
}
