import { ProjectCardCarousel } from "./ProjectCardCarousel";

export default function ProjectSection() {
  return (
    <div className="flex flex-col justify-center items-center gap-y-8 w-full bg-slate-800/20! py-8">
      <h2 className="max-w-8xl mx-auto md:text-5xl text-2xl font-bold font-sans text-center w-[90%] max-w-[1000px] text-gray-200!">
        Följ med på vår utvecklingsresa och upptäck våra projekt
      </h2>
      <ProjectCardCarousel />
    </div>
  );
}
