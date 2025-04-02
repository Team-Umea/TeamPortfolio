import AnimatedTestimonials from "../ui/AnimatedTestimonials";

export default function ProfileSection() {
  return (
    <div className="bg-slate-800/20! w-screen pt-8">
      <h2 className="max-w-8xl mx-auto md:text-5xl text-2xl font-bold font-sans text-center w-[90%] max-w-[1000px] text-gray-200!">
        Bli bekant med våra passionerade utvecklare
      </h2>
      <AnimatedTestimonials />
    </div>
  );
}
