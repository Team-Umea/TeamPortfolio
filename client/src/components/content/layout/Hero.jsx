import { Link } from "react-router";
import BlurText from "../../../layouts/animations/BlurText";
import { ShinyButton } from "@/components/magicui/shiny-button";

export default function Hero() {
  return (
    <section
      className="relative flex overflow-hidden w-full h-auto min-h-60 sm:min-h-100 xl:min-h-screen justify-center items-center text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/heroportfolio.webp')" }}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative text-white px-6 max-w-lg md:max-w-2xl">
        <BlurText
          text="Team Umeå"
          delay={250}
          animateBy="words"
          direction="top"
          className="text-5xl sm:text-7xl font-bold mb-8"
        />
        <BlurText
          text="Möt framtidens utvecklare"
          delay={250}
          animateBy="words"
          direction="top"
          className="text-2xl font-bold mb-8"
        />
        <Link to="/events">
          <ShinyButton className="bg-blue-700/50 hover:bg-blue-700/30 transition-all duration-300 ease md:px-8 md:py-3 cursor-pointer">
            <span className="text-white">Kommande evenemang</span>
          </ShinyButton>
        </Link>
      </div>
    </section>
  );
}
