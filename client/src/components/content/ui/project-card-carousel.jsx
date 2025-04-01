import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import { useNavigate } from "react-router";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { cn } from "../../../lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { Img } from "react-image";

export const CarouselContext = createContext({
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }) => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l"></div>
          <div className="flex flex-row gap-4 max-w-7xl 2xl:pl-96">
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                    once: true,
                  },
                }}
                key={"card" + index}
                className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-end mx-auto items-end pr-10 max-w-[1200px] w-[90%]">
          <div className="flex gap-2">
            <button
              className="relative z-40 h-10 w-10 rounded-full flex items-center justify-center disabled:opacity-50"
              onClick={scrollLeft}
              disabled={!canScrollLeft}
            >
              <IoIosArrowDropleftCircle
                size={50}
                className="h-12 w-12 cursor-pointer rounded-full text-gray-500 hover:ring-1 hover:ring-offset-1"
              />
            </button>
            <button
              className="relative z-40 h-10 w-10 rounded-full flex items-center justify-center disabled:opacity-50"
              onClick={scrollRight}
              disabled={!canScrollRight}
            >
              <IoIosArrowDroprightCircle
                size={50}
                className="h-12 w-12 cursor-pointer rounded-full text-gray-500 hover:ring-1 hover:ring-offset-1"
              />
            </button>
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const BlurImage = ({ height, width, src, className, alt, ...rest }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Img
      className={cn(
        "h-full w-full opacity-50",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurdataurl={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};

export const Card = ({ card, index, layout = false }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 h-screen z-50 overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 h-fit z-[60] my-10 p-4 md:p-10 rounded-3xl font-sans relative"
            >
              <motion.p layoutId={layout ? `category-${card.title}` : undefined} className="text-base font-medium text-black dark:text-white">
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="text-2xl md:text-5xl font-semibold text-neutral-700 mt-4 dark:text-white"
              >
                {card.title}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.description}` : undefined}
                className="text-2xl md:text-5xl font-semibold text-neutral-700 mt-4 dark:text-white"
              >
                {card.description}
              </motion.p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button 
        layoutId={layout ? `card-${card.title}` : undefined} 
        className="test rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden flex flex-col relative z-10 cursor-pointer
        hover:bg-gradient-to-r from-blue-600 to-fuchsia-700 transition-all duration-300 ease-in-out focus:outline-2 focus:ring-3 focus:outline-white
        focus:bg-gradient-to-r"
        onClick={() => navigate('/projects/'+card.id)}
      >
  {/* Gradient overlay */}
  <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />

        {/* Content wrapper */}
        <div className="relative z-40 p-8 flex flex-col h-full justify-between">
          <div>
            <motion.p className="text-white  text-sm md:text-base font-medium font-sans text-left">
              {card.category}
            </motion.p>
            <motion.p className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2">
              {card.title}
            </motion.p>
          </div>

    <motion.p className="text-white hidden text-sm md:block md:text-base font-medium font-sans text-left mt-auto">
      {card.description}
    </motion.p>
  </div>

        {/* Background image */}
        <BlurImage
          src={card.src}
          alt={card.title}
          fill="true"
          className="object-cover absolute z-10 inset-0"
        />
      </motion.button>
    </>
  );
};
