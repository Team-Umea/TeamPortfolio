import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function FadeInOnScroll({ children }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        setIsVisible(true);
        window.removeEventListener("scroll", handleScroll);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 3.2 }}>
      {children}
    </motion.div>
  );
}
