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
  }, [location.key]);

  return (
    <>
      <Header />
      <main className="relative pt-[110px] pb-[100px] min-h-screen bg-black text-white">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}
