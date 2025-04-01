import Header from "./header/Header";
import { Outlet, useLocation } from "react-router";
import Footer from "./footer/Footer";
import PageTransition from "./animations/PageTransition";
import { useEffect } from "react";
import useAuthStore from "../hooks/useAuthStore";
import useContentStore from "../hooks/useContentStore";
import useScrollTo from "../hooks/useScrollTo";

export default function RootLayout() {
  const location = useLocation();
  const { scrollToTopSmooth } = useScrollTo();
  const { verifySession } = useAuthStore();
  const { fetchContent } = useContentStore();

  useEffect(() => {
    verifySession();
    fetchContent();
  }, []);

  useEffect(() => {
    scrollToTopSmooth();
  }, [location.pathname, location.key]);

  const isAdminPage = location.pathname.includes("admin");

  return (
    <>
      <Header />
      <main
        className={`${
          isAdminPage ? "pb-[200px]" : "pt-[90px]"
        } relative min-h-screen bg-black text-white`}>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}
