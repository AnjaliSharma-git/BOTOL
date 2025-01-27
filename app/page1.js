"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "./components/Navbar";

export default function Home(){
const images = [
  "/images/roadmap final.png",
  "/images/02.png",
  "/images/03.png",
  "/images/04.png",
  "/images/05.png",
  "/images/06.png",
];
const [currentIndex, setCurrentIndex] = useState(0);

const handleNext = () => {
  setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
};

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
            animation: zoomIn 1.5s ease-in-out forwards;
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

          /* Apply animation at the same time */
          .bottle-cap, .bottle-bottom, .gradient-border {
            animation-duration: 1.5s;
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

          /* Zoom-in for h1, p, and small bottle images */
          .zoom-in {
            animation: zoomInContent 1.5s ease-in-out forwards;
          }

          /* Slide-in for Inquiry button */
          .slide-in-button {
            animation: slideInFromBottom 1.5s ease-in-out forwards;
          }
        `}
      </style>
      <main className="flex flex-col items-center justify-center h-screen relative">
        <div className="gradient-border flex items-center justify-center"></div>

        {/* Bottle Cap */}
        <img
          src="/images/bottlescap.png"
          alt="A bottle cap"
          className="absolute top-[40%] transform -translate-y-1/2 bottle-cap z-20"
          height="793px"
          width="186px"
        />

        {/* Bottle Bottom */}
        <img
          src="/images/bottle_bottom_complete.png"
          alt="A bottle bottom"
          className="absolute top-[78%] transform -translate-y-1/2 bottle-bottom z-20"
          height="793px"
          width="186px"
        />
      </main>
      <div className="absolute inset-0 flex flex-col items-center justify-center w-3/4 mx-auto my-2">
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
      <div className="flex justify-between w-full mt-16 px-16">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center mt-[-18rem] zoom-in">
          <img alt="Small water bottle image" height="125px" src="/images/bottle_left.png" width="125px" />
        </div>
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center mt-[-18rem] zoom-in">
          <img alt="Small water bottle image" height="125px" src="/images/bottle_right.png" width="125px" />
        </div>
      </div>

      <img src="/images/special_Features.png" height="860px" width="1512px" />
      <img src="/images/product.png" className="m-[100px]" height="1250px" width="1320px" />
      
      <div className="flex justify-center items-center overflow-hidden relative w-[1512px] h-[552px]">
        <motion.div
          className="flex"
          initial={{ x: 0 }}
          animate={{ x: `-${currentIndex * 1512}px` }}
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
