import { Link } from "react-router";
import { FaCheckCircle } from "react-icons/fa";

export default function Footer() {
  const technologies = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "TailwindCSS",
    "Node.js",
    "PostgreSQL",
    "MongoDB",
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-white py-20 border-t-[1px] border-white!">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row! justify-between items-center text-center md:text-left">
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start mb-6 md:mb-0">
            <h3 className="text-lg font-semibold">Teknologier vi använder</h3>
            <ul className="flex flex-col gap-2 mt-2">
              {technologies.map((tech) => (
                <li key={tech} className="flex items-center gap-2">
                  <FaCheckCircle color="green" />
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
            <img
              src="/public/images/logo.png"
              alt="Team Umeå Logo"
              onClick={scrollToTop}
              className="h-30 scale-170 my-12 rounded-full p-1 cursor-pointer"
            />
          </div>

          <nav className="w-full md:w-1/3 flex flex-col items-center md:items-end gap-8 sm:gap-2">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <Link to="/" className="hover:text-white hover:underline underline-offset-4">
              Hem
            </Link>
            <Link to="projects" className="hover:text-white hover:underline underline-offset-4">
              Projekt
            </Link>
            <Link to="events" className="hover:text-white hover:underline underline-offset-4">
              Evenemang
            </Link>
          </nav>
        </div>

        <div className="text-center mt-18 sm:mt-6 text-gray-500">
          &copy; {new Date().getFullYear()} Copyright Team Umeå
        </div>
      </div>
    </footer>
  );
}
