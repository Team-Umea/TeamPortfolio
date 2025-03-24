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
    "PostgreSQL",
    "MongoDB",
  ];

  return (
    <footer className="bg-slate-400 dark:bg-slate-950 text-gray-800 dark:text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start mb-6 md:mb-0">
            <h3 className="text-lg font-semibold dark:text-white">
              Teknologier vi använder
            </h3>
            <ul className="grid grid-cols-1 gap-2 mt-2">
              {technologies.map((tech) => (
                <li key={tech} className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
            <img
              src="LOGOGOESHERE"
              alt="Logo"
              className="h-10 bg-amber-600 rounded-full p-1"
            />
            <span className="text-2xl font-semibold dark:text-white mt-2">
              Team Umeå
            </span>
          </div>

          <nav className="w-full md:w-1/3 flex flex-col items-center md:items-end gap-8 sm:gap-2">
            <h3 className="text-lg font-semibold dark:text-white">
              Navigation
            </h3>
            <Link
              to="/"
              className="hover:text-gray-900 dark:hover:text-white hover:underline underline-offset-4"
            >
              Hem
            </Link>
            <Link
              to="projects"
              className="hover:text-gray-900 dark:hover:text-white hover:underline underline-offset-4"
            >
              Projekt
            </Link>
            <Link
              to="events"
              className="hover:text-gray-900 dark:hover:text-white hover:underline underline-offset-4"
            >
              Evenemang
            </Link>
          </nav>
        </div>

        <div className="text-center mt-12 sm:mt-6 text-xs text-gray-700 dark:text-gray-300">
          &copy; {new Date().getFullYear()} Copyright Team Umeå
        </div>
      </div>
    </footer>
  );
}
