import { Link } from "react-router";
import PrimaryBtn from "../../btn/PrimaryBtn";

export default function Hero() {
  return (
    <section
      className="relative flex overflow-hidden w-full h-auto min-h-60 sm:min-h-100 xl:min-h-screen justify-center items-center text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/heroportfolio.webp')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative text-white px-6 max-w-lg md:max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-bold">Team Umeå</h1>
        <h2 className="text-lg md:text-2xl m-2">Möt framtidens utvecklare</h2>
        <Link to="/events">
          <PrimaryBtn>Kommande evenemang</PrimaryBtn>
        </Link>
      </div>
    </section>
  );
}
