import React, { useEffect, useState } from "react";
import PrimaryBtn from "../../components/btn/PrimaryBtn";
import { NavLink, useLocation, useNavigate } from "react-router";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import useAuthStore from "../../hooks/useAuthStore";
import { RiAdminLine } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import { signOut } from "../../api/authecho";
import TransparentButton from "@/components/btn/TransparentButton";

const NAV_LINKS = [
  {
    text: "Projekt",
    link: "projects",
  },
  {
    text: "Evenemang",
    link: "events",
  },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isAdmin, resetAuth } = useAuthStore();
  const [isExtended, setIsExtended] = useState(false);

  const isAdminPage = location.pathname.includes("admin");

  useEffect(() => {
    setIsExtended(false);
  }, [location.key]);

  const handleAuthAction = async () => {
    if (!isAdminPage && isAuthenticated && isAdmin) {
      navigate("/admin");
      return;
    }

    if (isAuthenticated) {
      resetAuth();
      await signOut();
      navigate("/");
    } else {
      navigate("/signin");
    }
  };

  const signInButtonBody =
    !isAdminPage && isAdmin && isAuthenticated ? (
      <>
        <span className="text-lg">Admin</span>
        <RiAdminLine size={24} />
      </>
    ) : isAuthenticated ? (
      <>
        <span className="text-lg">Logga ut</span>
        <IoLogOutOutline size={24} />
      </>
    ) : (
      <>
        <span className="text-lg">Logga in</span>
        <IoLogInOutline size={24} />
      </>
    );

  return (
    <nav className="fixed z-1000 w-screen flex justify-between items-center px-6 bg-black shadow-[0_-5px_30px_rgb(255,255,255,0.2)]">
      <NavLink to="/">
        <img src="/images/logo.png" alt="Team Umeå Logo" className="h-20 w-30 scale-170 my-2" />
      </NavLink>
      <button
        onClick={() => setIsExtended((prev) => !prev)}
        className="absolute right-8 top-6 lg:hidden z-2 cursor-pointer">
        {isExtended ? (
          <MdOutlineClose size={40} color="white" />
        ) : (
          <FiMenu size={40} color="white" />
        )}
      </button>
      <div
        className={`fixed! top-[64px]! ${
          isExtended ? "right-0!" : "right-[-200px]!"
        } lg:static! flex! flex-col! lg:flex-row! lg:justify-between! items-center! gap-y-32! h-screen! lg:h-auto! w-50! lg:w-full! pt-20! lg:p-0! lg:ml-16! lg:mr-8! bg-black! lg:bg-transparent! z-1!`}>
        <ul className="flex! flex-col! lg:flex-row! gap-x-20 gap-y-12! text-white">
          {NAV_LINKS.map((link, index) => {
            return (
              <NavLink
                to={link.link}
                key={link.link + index}
                onClick={() => setIsExtended(false)}
                className="text-xl font-medium transition-all duration-300 ease hover:opacity-70">
                {link.text}
              </NavLink>
            );
          })}
        </ul>
        <div>
          <TransparentButton onClick={handleAuthAction}>{signInButtonBody}</TransparentButton>
        </div>
      </div>
    </nav>
  );
}
