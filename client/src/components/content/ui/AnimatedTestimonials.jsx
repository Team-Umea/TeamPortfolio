import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import useContentStore from "../../../hooks/useContentStore";
import { MdOutlineMailOutline, MdOutlinePhoneEnabled } from "react-icons/md";

export default function AnimatedTestimonials() {
  const { profiles } = useContentStore();
  const [active, setActive] = useState(0);
  const autoplay = false;

  const handleNext = () => {
    setActive((prev) => (prev + 1) % profiles.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + profiles.length) % profiles.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 15000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="mx-auto! overflow-x-hidden max-w-sm! px-4! py-20! font-sans! antialiased! md:max-w-5xl! md:px-8! lg:px-12!">
      <div className="relative! grid! grid-cols-1! gap-x-20! md:grid-cols-2!">
        <div className="flex flex-col items-center gap-y-10">
          <div className="relative! h-100 w-full!">
            <AnimatePresence>
              {profiles.map((profile, index) => (
                <div key={profile._id}>
                  <motion.div
                    key={profile._id}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: randomRotateY(),
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      z: isActive(index) ? 0 : -100,
                      rotate: isActive(index) ? 0 : randomRotateY(),
                      zIndex: isActive(index) ? 40 : profiles.length + 2 - index,
                      y: isActive(index) ? [0, -80, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: randomRotateY(),
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute! inset-0 origin-bottom!">
                    <img
                      src={profile.profileImage}
                      alt={profile.name}
                      width={500}
                      height={500}
                      draggable={false}
                      className="h-full! w-full! rounded-3xl! object-cover! object-top!"
                    />
                  </motion.div>
                </div>
              ))}
            </AnimatePresence>
          </div>
          <div className="flex gap-6">
            <button
              className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
              onClick={handlePrev}>
              <IoIosArrowDropleftCircle
                size={50}
                className="h-12 w-12 cursor-pointer text-gray-500 hover:ring-2 rounded-full hover:ring-offset-1"
              />
            </button>
            <button
              className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
              onClick={handleNext}>
              <IoIosArrowDroprightCircle
                size={50}
                className="h-12 w-12 cursor-pointer text-gray-500 hover:ring-2 rounded-full hover:ring-offset-1"
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}>
            <div>
              <div className="flex flex-wrap gap-x-4">
                <h2 className="text-2xl font-bold">{profiles[active].name}</h2>
                <p className="text-2xl font-bold text-gray-200!">{profiles[active].age}</p>
              </div>
              <p className="text-lg text-gray-400! font-bold">{profiles[active].title}</p>
            </div>
            <div className="flex flex-col md:flex-row! items-start gap-x-8 gap-y-2 md:gap-y-8! my-4">
              <div className="flex items-center gap-x-2">
                <MdOutlineMailOutline size={24} />
                <p className="font-medium">{profiles[active].email}</p>
              </div>
              <div className="flex items-center gap-x-2">
                <MdOutlinePhoneEnabled size={24} />
                <p className="font-medium">{profiles[active].phone}</p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2 my-4">
              <a
                href={profiles[active].linkedin}
                target="_blank"
                className="flex gap-x-2 cursor-pointer">
                <FaLinkedin size={24} />
                <span className="break-words max-w-[90%]">Linkedin</span>
              </a>
              <a
                href={profiles[active].github}
                target="_blank"
                className="flex gap-x-2 cursor-pointer">
                <FaGithub size={24} />
                <span className="break-words max-w-[90%]">Github</span>
              </a>
              {profiles[active].portfolio && (
                <a
                  href={profiles[active].portfolio}
                  target="_blank"
                  className="flex gap-x-2 cursor-pointer">
                  <FaRegStar size={24} />
                  <span className="break-words max-w-[90%]">Portfölj</span>
                </a>
              )}
            </div>
            <motion.p className="mt-8 text-lg text-gray-500 dark:text-neutral-300 min-h-[400px]">
              {profiles[active].bio.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block  max-w-[400px] break-words">
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
