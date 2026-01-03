"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

// Type definitions for the product data
interface ProductTheme {
  name: string;
  colorHex: string; // The specific color of the background circle
  shoeImage: string; // Path to the shoe image
  filter?: string; // fallback CSS filter if images aren't available (remove in production)
}

const ProductCard: React.FC = () => {
  // --- State & Config ---
  const [activeColor, setActiveColor] = useState<string>("red");

  // Data configuration matching the video colors
  const themes: Record<string, ProductTheme> = {
    red: {
      name: "red",
      colorHex: "#9c2d2d", // Deep red/burgundy from video
      shoeImage: "/images/nike-red.png", // Replace with your actual asset
      filter: "hue-rotate(0deg)", // Fallback for demo
    },
    green: {
      name: "green",
      colorHex: "#9bdc28", // Vibrant lime green
      shoeImage: "/images/nike-green.png",
      filter: "hue-rotate(100deg) saturate(2)",
    },
    purple: {
      name: "purple",
      colorHex: "#7e3196", // Deep purple
      shoeImage: "/images/nike-purple.png",
      filter: "hue-rotate(240deg)",
    },
  };

  const currentTheme = themes[activeColor];

  // --- Refs for GSAP ---
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const shoeRef = useRef<HTMLImageElement>(null);
  const bgCircleRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null); 

  // --- GSAP Animation Context ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(detailsRef.current, { autoAlpha: 0, y: 30 });
      gsap.set(shoeRef.current, { y: 0, scale: 1 });
      gsap.set(titleRef.current, { y: 0 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    const ctx = gsap.context(() => {

      gsap.to(shoeRef.current, {
        y: -50,
        scale: 1.05,
        duration: 0.5,
        ease: "power3.out",
      });

     
      gsap.to(titleRef.current, {
        y: -40,
        duration: 0.5,
        ease: "power3.out",
      });

      // 3. Reveal Details (Size, Color, Button)
      gsap.to(detailsRef.current, {
        autoAlpha: 1, // Opacity + Visibility
        y: -30, // Slide up
        duration: 0.4,
        delay: 0.1, // Slight delay after shoe starts moving
        ease: "back.out(1.7)", // Subtle bounce effect
      });

      // 4. Subtle background circle expansion (optional, based on feel)
      gsap.to(bgCircleRef.current, {
        scale: 1.1,
        duration: 0.5,
        ease: "power3.out",
      });
    }, containerRef);
  };

  const handleMouseLeave = () => {
    const ctx = gsap.context(() => {
      // Reset all to initial state
      gsap.to(shoeRef.current, {
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "power3.inOut",
      });

      gsap.to(titleRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power3.inOut",
      });

      gsap.to(detailsRef.current, {
        autoAlpha: 0,
        y: 30,
        duration: 0.4,
        ease: "power3.in",
      });

      gsap.to(bgCircleRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    }, containerRef);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900">
      {/* --- Main Card Container --- */}
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-[320px] h-[450px] bg-[#1a1a1a] rounded-[20px] overflow-hidden shadow-2xl cursor-pointer"
      >
        {/* 1. Background "NIKE" Text (Faint) */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="text-[180px] font-extrabold text-[#ffffff] opacity-[0.04] tracking-tighter -rotate-12 select-none transform translate-x-[-20px] translate-y-[-40px]">
            NIKE
          </span>
        </div>

        {/* 2. Background Circle (Dynamic Color) */}
        {/* Positioned absolutely at the top to create the semi-circle look */}
        <div
          ref={bgCircleRef}
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[100%] rounded-full transition-colors duration-500 ease-in-out z-0"
          style={{ backgroundColor: currentTheme.colorHex }}
        />

        <div className="relative z-10 w-full h-[60%] flex items-center justify-center mt-4">
          <img
            ref={shoeRef}
            src="https://pngimg.com/d/running_shoes_PNG5823.png"
            alt="Nike Shoe"
            className="w-[90%] drop-shadow-2xl object-contain -rotate-[25deg] transition-all duration-500"
            style={{
              filter: currentTheme.filter,
            }}
          />
        </div>

        {/* 4. Content Area */}
        <div className="absolute bottom-0 w-full h-[40%] z-20 flex flex-col items-center justify-end pb-8">
          {/* Title */}
          <h2
            ref={titleRef}
            className="text-white text-3xl font-bold tracking-wide mb-1"
          >
            NIKE SHOES
          </h2>

          {/* Hidden Details (Size, Color, Button) */}
          <div
            ref={detailsRef}
            className="flex flex-col items-center gap-4 w-full px-6 opacity-0"
          >
            {/* Size Selector */}
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-xs font-semibold tracking-wider">
                SIZE:
              </span>
              <div className="flex gap-2">
                {[7, 8, 9, 10].map((size) => (
                  <button
                    key={size}
                    className="w-7 h-7 bg-white rounded text-black text-xs font-bold hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-xs font-semibold tracking-wider">
                COLOR:
              </span>
              <div className="flex gap-3">
                {/* Green Button */}
                <button
                  onClick={() => setActiveColor("green")}
                  className={`w-4 h-4 rounded-full bg-[#9bdc28] border-2 transition-all duration-300 ${
                    activeColor === "green"
                      ? "border-white scale-125"
                      : "border-transparent"
                  }`}
                />
                {/* Purple Button */}
                <button
                  onClick={() => setActiveColor("purple")}
                  className={`w-4 h-4 rounded-full bg-[#7e3196] border-2 transition-all duration-300 ${
                    activeColor === "purple"
                      ? "border-white scale-125"
                      : "border-transparent"
                  }`}
                />
                {/* Red Button */}
                <button
                  onClick={() => setActiveColor("red")}
                  className={`w-4 h-4 rounded-full bg-[#9c2d2d] border-2 transition-all duration-300 ${
                    activeColor === "red"
                      ? "border-white scale-125"
                      : "border-transparent"
                  }`}
                />
              </div>
            </div>

            {/* Buy Now Button */}
            <button className="bg-white text-black font-semibold text-sm py-2 px-6 rounded shadow-md hover:bg-gray-200 transition-transform active:scale-95 mt-1">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
