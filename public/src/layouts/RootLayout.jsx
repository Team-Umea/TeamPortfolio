import Header from "./header/Header";
import { Outlet } from "react-router";
import Footer from "./footer/Footer";
import PageTransition from "./animations/PageTransition";
import { useEffect } from "react";
import useAuthStore from "../hooks/useAuthStore";

export default function RootLayout() {
  const { verifySession } = useAuthStore();

  useEffect(() => {
    verifySession();
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
