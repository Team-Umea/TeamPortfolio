import { ProjectCardCarousel } from "./ProjectCardCarousel";

export default function ProjectSection() {
  return (
    <div className="flex flex-col justify-center items-center gap-y-8 w-full bg-slate-800/20! py-8">
      <h1 className="max-w-8xl mx-auto md:text-5xl text-xl font-bold font-sans">Projekt sektion</h1>
      <ProjectCardCarousel />
    </div>
  );
}
