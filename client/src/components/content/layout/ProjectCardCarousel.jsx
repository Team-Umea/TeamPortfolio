import { Carousel, Card } from "../ui/project-card-carousel";
import useContentStore from "@/hooks/useContentStore";

export function ProjectCardCarousel() {
  const {projects} = useContentStore();

  const cards = projects.map((project, index) => (
    <Card
      key={project._id}
      card={{
        category: project.techStack?.join(", ") || "Unknown",
        title: project.project,
        src: project.images?.[1]?.url || project.images?.[0]?.url, // Fallback image
        description: project.description,
        id: project._id
      }}
      index={index}
    />
  ));

  return (
    <div className="w-full h-full">
      <Carousel items={cards} />
    </div>
  );
}
