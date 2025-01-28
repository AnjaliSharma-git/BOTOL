"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";

export default function Home() {
  const images = [
    "/images/roadmap final.png",
    "/images/02.png",
    "/images/03.png",
    "/images/04.png",
    "/images/05.png",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200); // Default value for SSR
  const [windowHeight, setWindowHeight] = useState(800); // Default value for SSR
  const bottleRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    handleResize(); // Call on mount to get the initial window size

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const bottletopPosition = Math.min(scrollY * 0.9, 1020);
  const bottleBottomPosition = Math.min(scrollY * 0.6, 620);

  const getAnimationSpeed = () => {
    if (windowWidth < 480) {
      return 1; // Slower speed for smaller screens
    } else if (windowWidth < 768) {
      return 1.2;
    } else if (windowWidth < 1024) {
      return 1.5;
    } else {
      return 2; // Faster speed for larger screens
    }
  };

  const animationSpeed = getAnimationSpeed();

  // Calculate scalable sizes for the bottle cap and bottom
  const getScaledSize = (baseSize) => {
    if (windowWidth < 480) return baseSize * 0.6; // Smaller screens
    if (windowWidth < 768) return baseSize * 0.8; // Medium screens
    if (windowWidth < 1024) return baseSize; // Large screens
    return baseSize * 1.2; // Extra large screens
  };

  const bottleCapSize = getScaledSize(180);
  const bottleBottomSize = getScaledSize(180);

  // Calculate scalable sizes for content images
  const getScaledContentSize = (baseWidth, baseHeight) => {
    if (windowWidth < 480) return { width: baseWidth * 0.8, height: baseHeight * 0.8 }; // Small screens
    if (windowWidth < 768) return { width: baseWidth * 0.9, height: baseHeight * 0.9 }; // Medium screens
    if (windowWidth < 1024) return { width: baseWidth, height: baseHeight }; // Large screens
    return { width: baseWidth * 1.2, height: baseHeight * 1.2 }; // Extra large screens
  };

  const specialFeaturesSize = getScaledContentSize(1512, 860);
  const productSize = getScaledContentSize(1320, 1250);
  const carouselSize = getScaledContentSize(1512, 552);

  return (
    <div>
      <Navbar />
      <style>
        {`
          .gradient-border {
            position: relative;
            width: 24rem;
            height: 24rem;
            border-radius: 50%;
            background: linear-gradient(to bottom, cyan, blue);
            margin-top: -2rem;
            animation: zoomIn ${animationSpeed}s ease-in-out forwards;
          }
          .gradient-border::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: calc(100% - 0.8rem);
            height: calc(100% - 0.8rem);
            background: white;
            border-radius: 50%;
            transform: translate(-50%, -50%);
          }

          @keyframes zoomIn {
            0% { transform: scale(1); }
            100% { transform: scale(1.4); }
          }

          @keyframes slideUp {
            0% { transform: translateY(-40%); }
            100% { transform: translateY(-280px); }
          }

          @keyframes slideDown {
            0% { transform: translateY(-46%); }
            100% { transform: translateY(-5%); }
          }

          @keyframes zoomInContent {
            0% { transform: scale(0.5); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }

          @keyframes slideInFromBottom {
            0% { transform: translateY(50%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }

          .bottle-cap, .bottle-bottom, .gradient-border {
            animation-duration: ${animationSpeed}s;
            animation-timing-function: ease-in-out;
            animation-delay: 0s;
            animation-fill-mode: forwards;
          }

          .bottle-cap {
            animation-name: slideUp;
          }

          .bottle-bottom {
            animation-name: slideDown;
          }

          .zoom-in {
            animation: zoomInContent ${animationSpeed}s ease-in-out forwards;
          }

          .slide-in-button {
            animation: slideInFromBottom ${animationSpeed}s ease-in-out forwards;
          }

          .scroll-section {
            position: relative;
            height: 100vh;
          }

          .scroll-bottle {
            position: fixed;
            left: 45%;
            transition: top 0.1s ease-out;
          }

          /* Prevent overflow for content images */
          .content-img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            display: block;
          }

          /* Flex container for content images to avoid overflow */
          .content-container {
            width: 100%;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>

      {/* Hero Section with Initial Animations */}
      <main className="flex flex-col items-center justify-center h-screen relative">
        <div className="gradient-border flex items-center justify-center"></div>

        <img
          src="/images/bottlescap.png"
          alt="A bottle cap"
          className="absolute top-[40%] transform -translate-y-1/2 bottle-cap z-20"
          width={bottleCapSize}
          style={{
            top: scrollY === 0 ? '40%' : `calc(40% + ${bottletopPosition}px)`,
          }}
        />

        <img
          src="/images/bottle_bottom_complete.png"
          alt="A bottle bottom"
          className="absolute top-[78%] transform -translate-y-1/2 bottle-bottom z-20"
          height={bottleBottomSize}
          width={bottleBottomSize}
          style={{
            top: scrollY === 0 ? '78%' : `calc(78% + ${bottleBottomPosition}px)`,
          }}
          ref={bottleRef}
        />
      </main>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center w-3/4 mx-auto my-4 ">
        <h1 className="text-7xl font-bold text-center w-[1512px] font-Familjen Grotesk mt-[2rem] zoom-in">
          The Ultimate Companion
          <br /> for Hydration
        </h1>
        <p className="text-lg mt-4 text-center w-[1512px] zoom-in">
          We believe in the power of hydration.
          <br />
          Our mission is simple yet vital
        </p>
        <a className="bg-gradient-to-r from-cyan-400 to-blue-600 w-[175px] h-[49px] text-center text-white py-2 px-6 rounded-full mt-6 slide-in-button" href="#">
          Inquiry Now
        </a>
      </div>

       {/* Small Bottles */}
       <div className="flex justify-between w-full mt-16 px-16">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center mt-[-18rem] zoom-in">
          <img alt="Small water bottle image" height="125px" src="/images/bottle_left.png" width="125px" />
        </div>
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center mt-[-18rem] zoom-in">
          <img alt="Small water bottle image" height="125px" src="/images/bottle_right.png" width="125px" />
        </div>
      </div>

      {/* Content Sections */}
      <div className="content-container">
        <img
          src="/images/special_Features.png"
          className="content-img"
          alt="Special Features"
          width={specialFeaturesSize.width}
          height={specialFeaturesSize.height}
        />
      </div>
      <div className="content-container">
        <img
          src="/images/product.png"
          className="content-img"
          alt="Product"
          width={productSize.width}
          height={productSize.height}
        />
      </div>

      {/* Image Carousel */}
      <div className="flex justify-center items-center overflow-hidden relative w-full h-full">
        <motion.div
          className="flex"
          initial={{ x: 0 }}
          animate={{ x: `-${currentIndex * carouselSize.width}px` }}
          transition={{ type: "spring", mass: 1, stiffness: 10.24, damping: 4.8 }}
        >
          {images.map((src, index) => (
            <motion.img
              key={index}
              src={src}
              className="cursor-pointer flex-shrink-0"
              onClick={handleNext}
              width={carouselSize.width}
              height={carouselSize.height}
            />
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="content-container">
        <img src="/images/footer.png" className="content-img" alt="Footer" />
      </div>
    </div>
  );
}
