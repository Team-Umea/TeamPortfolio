import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import UserPage from "../pages/UserPage";
import AdminLayout from "../layouts/admin/AdminLayout";
import AdminPage from "../pages/admin/AdminPage";
import QuestionPage from "../pages/admin/QuestionPage";
import ProjectPage from "../pages/admin/ProjectPage";
import EventsPage from "../pages/admin/EventsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="signin" element={<SignInPage />} />
      {/* <Route path="admin" element={<AdminPage />} /> */}
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="projects" element={<ProjectPage />} />
        <Route path="questions" element={<QuestionPage />} />
      </Route>
      <Route path="user" element={<UserPage />} />
    </Route>
  )
);

export default router;
