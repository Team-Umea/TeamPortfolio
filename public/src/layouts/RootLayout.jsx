import Header from "./header/Header";
import { Outlet } from "react-router";
import Footer from "./footer/Footer";
import PageTransition from "./animations/PageTransition";
import { useEffect } from "react";
import useAuthStore from "../hooks/useAuthStore";
import useContentStore from "../hooks/useContentStore";

export default function RootLayout() {
  const { verifySession } = useAuthStore();
  const { fetchContent } = useContentStore();

  useEffect(() => {
    verifySession();
    fetchContent();
  }, []);

  return (
    <>
      <Header />
      <main className="relative pb-[100px] min-h-screen">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}
