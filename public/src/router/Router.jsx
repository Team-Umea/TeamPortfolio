import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import UserPage from "../pages/UserPage";
import AdminLayout from "../layouts/admin/AdminLayout";
import QuestionPage from "../pages/admin/QuestionPage";
import ProjectPage from "../pages/admin/ProjectPage";
import EventsPage from "../pages/admin/EventsPage";
import ProfilePage from "../pages/admin/ProfilePage";
import ManageProfilePage from "../pages/admin/ManageProfilePage";
import AddEventPage from "../pages/admin/AddEventPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="signin" element={<SignInPage />} />
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<ProfilePage />} />
        <Route path="manageprofile" element={<ManageProfilePage />} />
        <Route path="events" element={<EventsPage />}>
          <Route path="addevent" element={<AddEventPage />} />
        </Route>
        <Route path="projects" element={<ProjectPage />} />
        <Route path="questions" element={<QuestionPage />} />
      </Route>
      <Route path="user" element={<UserPage />} />
    </Route>
  )
);

export default router;
