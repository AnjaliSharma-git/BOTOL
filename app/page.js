"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Image from "next/image"; // Import next/image for image optimization

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
  const bottleRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth); // Updates the width
    };

    const handleScroll = () => {
      setScrollY(window.scrollY); // Update scrollY position
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

  const bottletopPosition = Math.min(scrollY * 0.9, 880);
  const bottleBottomPosition = Math.min(scrollY * 0.6, 500);

  // Dynamic sizing for bottle cap and bottom height based on scroll position and screen size
  const getBottleSize = () => {
    let baseWidth = 180; // Default width for the bottle
    let baseHeight = 300; // Default height for the bottle

    // Scale down for smaller screens
    if (windowWidth < 480) {
      baseWidth = 140;
      baseHeight = 240;
    } else if (windowWidth < 768) {
      baseWidth = 160;
      baseHeight = 270;
    }

    // Calculate dynamic height based on scroll position
    const scrollFactor = scrollY * 0.2; // Adjust scroll effect
    const dynamicHeight = baseHeight + scrollFactor;

    return { width: baseWidth, height: dynamicHeight };
  };

  const { width: bottleCapSize, height: bottleHeight } = getBottleSize(); // Dynamic width and height for bottle

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
            animation: zoomIn 2s ease-in-out forwards;
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
            animation-duration: 2s;
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
            animation: zoomInContent 2s ease-in-out forwards;
          }

          .slide-in-button {
            animation: slideInFromBottom 2s ease-in-out forwards;
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

        <Image
          src="/images/bottlescap.png"
          alt="A bottle cap"
          className="absolute top-[40%] transform -translate-y-1/2 bottle-cap z-20"
          width={bottleCapSize}
          height={bottleHeight}  // Dynamic height and width
          style={{
            top: scrollY === 0 ? '40%' : `calc(40% + ${bottletopPosition}px)`,
          }}
        />

        <Image
          src="/images/bottle_bottom_complete.png"
          alt="A bottle bottom"
          className="absolute top-[78%] transform -translate-y-1/2 bottle-bottom z-20"
          width={bottleCapSize} // Dynamic width
          height={bottleHeight}  // Dynamic height
          style={{
            top: scrollY === 0 ? '78%' : `calc(78% + ${bottleBottomPosition}px)`,
          }}
          ref={bottleRef}
        />
      </main>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center w-3/4 mx-auto my-4 ">
        <h1 className="text-7xl font-bold text-center w-[1512px] font-Familjen Grotesk mt-[4rem] zoom-in">
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
          <Image alt="Small water bottle image" height={125} src="/images/bottle_left.png" width={125} />
        </div>
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center mt-[-18rem] zoom-in">
          <Image alt="Small water bottle image" height={125} src="/images/bottle_right.png" width={125} />
        </div>
      </div>

      {/* Content Sections */}
      <div className="content-container">
        <Image
          src="/images/special_Features.png"
          className="content-img"
          alt="Special Features"
          width={1512}
          height={860}
        />
      </div>
      <div className="content-container">
        <Image
          src="/images/product.png"
          className="content-img"
          alt="Product"
          width={1320}
          height={1250}
        />
      </div>

      {/* Image Carousel */}
      <div className="flex justify-center items-center overflow-hidden relative w-full h-full">
        <motion.div
          className="flex"
          initial={{ x: 0 }}
          animate={{ x: `-${currentIndex * 1512}px` }}
          transition={{ type: "spring", mass: 1, stiffness: 10.24, damping: 4.8 }}
        >
          {images.map((src, index) => (
            <motion.div
              key={index}
              onClick={handleNext}
              className="cursor-pointer flex-shrink-0"
            >
              <Image
                src={src}
                alt={`Carousel image ${index}`}
                width={1512}
                height={552}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="content-container">
      <Image
  src="/images/footer.png"
  className="content-img"
  alt="Footer"
  width={1512}  // You can adjust this based on your desired image width
  height={300}  // Adjust the height according to the aspect ratio of the image
/>

      </div>
    </div>
  );
}
