import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/auth/SignInPage";
import UserPage from "../pages/user/UserPage";
import AdminLayout from "../layouts/admin/AdminLayout";
import QuestionPage from "../pages/admin/QuestionPage";
import ProjectPage from "../pages/admin/project/ProjectPage";
import AddProjectPage from "../pages/admin/project/AddProjectPage";
import ManageProjectPage from "../pages/admin/project/ManageProjectPage";
import EventsPage from "../pages/admin/event/EventsPage";
import ProfilePage from "../pages/admin/profile/ProfilePage";
import ManageProfilePage from "../pages/admin/profile/ManageProfilePage";
import AddEventPage from "../pages/admin/event/AddEventPage";
import ManageEventPage from "../pages/admin/event/ManageEventPage";

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
          <Route path=":eventid" element={<ManageEventPage />} />
        </Route>
        <Route path="projects" element={<ProjectPage />}>
          <Route path="addproject" element={<AddProjectPage />} />
          <Route path=":projectid" element={<ManageProjectPage />} />
        </Route>
        <Route path="questions" element={<QuestionPage />} />
      </Route>
      <Route path="user" element={<UserPage />} />
    </Route>
  )
);

export default router;
