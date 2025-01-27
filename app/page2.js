"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Page2() {
  const images = [
    "/images/roadmap final.png",
    "/images/02.png",
    "/images/03.png",
    "/images/04.png",
    "/images/05.png",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const bottleRef = useRef(null);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Calculate the slide offset based on the current index
  const slideOffset = -currentIndex * 1512; // This will move the images horizontally

  // Handle the scroll position to move the bottle bottom
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const bottletopPosition = Math.min(
    scrollY * 1, 
    1000
  );

  const bottleBottomPosition = Math.min(
    scrollY * 0.6, 
    520
  );

  return (
    <div>
      <div className="relative">
        <img src="/images/Frame.png" height="860px" width="1512px" />
        <img
          src="/images/bottlescap.png"
          alt="Bottlescap"
          className="absolute top-[12%] left-[45%] z-10"
          width="150px"
          height="150px"
          style={{
            top: `calc(12% + ${bottletopPosition}px)`, // Adjust the top position dynamically
          }}
        />
        <img
          ref={bottleRef}
          src="/images/bottle_bottom_complete.png"
          alt="Bottle Bottom"
          className="absolute top-[80%] left-[45%] z-10"
          width="150px"
          height="150px"
          style={{
            top: `calc(80% + ${bottleBottomPosition}px)`, // Adjust the top position dynamically
          }}
        />
      </div>

      <img src="/images/special_Features.png" height="860px" width="1512px" />
      <img src="/images/product.png" className="m-[100px]" height="1250px" width="1320px" />

      <div className="flex justify-center items-center overflow-hidden relative w-[1512px] h-[552px]">
        <motion.div
          className="flex"
          initial={{ x: 0 }}
          animate={{ x: slideOffset }} // Use the pre-calculated slideOffset value
          transition={{ type: "spring", mass: 1, stiffness: 10.24, damping: 4.8 }}
        >
          {images.map((src, index) => (
            <motion.img
              key={index}
              src={src}
              className="cursor-pointer flex-shrink-0"
              onClick={handleNext}
              width="1512px"
              height="552px"
            />
          ))}
        </motion.div>
      </div>

      <img src="/images/footer.png" height="256px" width="1512px" />
    </div>
  );
}
