import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/auth/SignInPage";
import UserPage from "../pages/user/UserPage";
import ContentEventPage from "../pages/content/ContentEventPage";
import ContentProjectPage from "../pages/content/ContentProjectPage";
import AdminLayout from "../layouts/admin/AdminLayout";
import ProjectPage from "../pages/admin/project/ProjectPage";
import AddProjectPage from "../pages/admin/project/AddProjectPage";
import ManageProjectPage from "../pages/admin/project/ManageProjectPage";
import EventsPage from "../pages/admin/event/EventsPage";
import EventsEnrollmentPage from "../pages/admin/event/EventEnrollmentPage";
import ProfilePage from "../pages/admin/profile/ProfilePage";
import ManageProfilePage from "../pages/admin/profile/ManageProfilePage";
import AddEventPage from "../pages/admin/event/AddEventPage";
import ManageEventPage from "../pages/admin/event/ManageEventPage";
import NotFoundPage from "../pages/error/NotFoundPage";
import EnrollPage from "../pages/content/EnrollPage";
import EventQuestionPage from "../pages/content/EventQuestionPage";
import EventLayout from "../layouts/admin/EventLayout";
import EventInquiryPage from "../pages/admin/event/EventInquiryPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="signin" element={<SignInPage />} />
      <Route path="events" element={<ContentEventPage />}>
        <Route path="enroll/:eventid" element={<EnrollPage />} />
        <Route path="questions/:eventid" element={<EventQuestionPage />} />
      </Route>
      <Route path="projects" element={<ContentProjectPage />} />
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<ProfilePage />} />
        <Route path="manageprofile" element={<ManageProfilePage />} />
        <Route path="events" element={<EventsPage />}>
          <Route path="addevent" element={<AddEventPage />} />
          <Route path=":eventid" element={<ManageEventPage />} />
          <Route path="event/:eventid" element={<EventLayout />}>
            <Route path="enrollments" element={<EventsEnrollmentPage />} />
            <Route path="inquiries" element={<EventInquiryPage />} />
          </Route>
        </Route>
        <Route path="projects" element={<ProjectPage />}>
          <Route path="addproject" element={<AddProjectPage />} />
          <Route path=":projectid" element={<ManageProjectPage />} />
        </Route>
      </Route>
      <Route path="user" element={<UserPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export default router;
