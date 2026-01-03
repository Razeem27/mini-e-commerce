"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product } from "../types/product";
import { apiFetch } from "@/lib/apiClient";
import { useAuth } from "../context/AuthContext";

interface ProductCardProps {
  product: Product;
  colorIndex?: number;
}

export default function ProductCard({ product, colorIndex = 0 }: ProductCardProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const container = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const sizeTextRef = useRef<HTMLDivElement>(null);
  const colorTextRef = useRef<HTMLDivElement>(null);
  const buyNowButtonRef = useRef<HTMLButtonElement>(null);
  // Use different default color based on colorIndex
  const defaultColorIndex = colorIndex % product.availableColors.length;
  const [selectedColor, setSelectedColor] = useState<string>(product.availableColors[defaultColorIndex]);
  const [selectedSize, setSelectedSize] = useState<number>(product.availableSizes[0]);

  // Get color-dependent values (only change when color changes)
  const currentCircleColor = useMemo(() => 
    product.theme[selectedColor]?.circleColor || "#9ADA2A",
    [selectedColor, product.theme]
  );
  const currentSwatchColor = useMemo(() => 
    product.theme[selectedColor]?.swatchColor || "#9bdc28",
    [selectedColor, product.theme]
  );

  // Get color-specific image URL
  const currentImageUrl = useMemo(() => {
    // Find first variant matching selected color (any size)
    const colorVariant = product.variants.find(variant => 
      variant.options.color === selectedColor
    );
    return colorVariant?.image.url || product.variants[0]?.image.url || "/images/nike-green.png";
  }, [selectedColor, product.variants]);



  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size: number) => {
    setSelectedSize(size);
  };

  const handleBuyNow = async () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    try {
      await apiFetch("/api/purchase-product", {
        method: "POST",
        body: JSON.stringify({
          product_id: product.id,
          color: selectedColor,
          size: selectedSize,
        }),
      });
      
      // Create query parameters with product data
      const queryParams = new URLSearchParams({
        title: product.title,
        color: selectedColor,
        size: selectedSize.toString(),
        price: (product.variants.find(v => v.options.color === selectedColor)?.price || product.basePrice).toString(),
        imageUrl: currentImageUrl
      });
      
      router.push(`/order-success?${queryParams.toString()}`);
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  const { contextSafe } = useGSAP({ scope: container });

  // Animate circle color change when color changes
  useEffect(() => {
    gsap.to(circleRef.current, {
      backgroundColor: currentCircleColor,
      duration: 0.4,
      ease: "power2.inOut",
    });
  }, [currentCircleColor]);

  const onMouseEnter = contextSafe(() => {
    gsap.killTweensOf([
      container.current,
      nameRef.current,
      circleRef.current,
      sizeTextRef.current,
      colorTextRef.current,
      buyNowButtonRef.current,
    ]);

    gsap.to(container.current, {
      y: -220,
      duration: 0.4,
      ease: "power3.inout",
    });
    gsap.to(nameRef.current, {
      y: -100,
      duration: 0.4,
      ease: "power3.inout",
    });
    gsap.to(circleRef.current, {
      x: 30,
      duration: 0.3,
      ease: "power3.inout",
    });

    // Animate text elements with sequential autoAlpha
    gsap.fromTo(
      [sizeTextRef.current, colorTextRef.current, buyNowButtonRef.current],
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.4,
        ease: "sin.in",
      }
    );
  });

  const onMouseLeave = contextSafe(() => {
    // Kill any existing animations to prevent conflicts
    gsap.killTweensOf([
      container.current,
      nameRef.current,
      circleRef.current,
      sizeTextRef.current,
      colorTextRef.current,
      buyNowButtonRef.current,
    ]);

    gsap.to(container.current, {
      y: -133,
      duration: 0.4,
      ease: "sin.Out",
    });
    gsap.to(nameRef.current, {
      y: 0,
      duration: 0.4,
      ease: "sin.Out",
    });
    gsap.to(circleRef.current, {
      x: -8,
      duration: 0.3,
      ease: "sin.out",
    });

    // Fade out text elements
    gsap.to(
      [sizeTextRef.current, colorTextRef.current, buyNowButtonRef.current],
      {
        autoAlpha: 0,
        duration: 0.3,
        ease: "power3.out",
      }
    );
  });

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative flex flex-col h-80 w-64 sm:h-96 sm:w-72 md:h-101.25 md:w-83 lg:h-101.25 lg:w-83 bg-[#232323] overflow-hidden"
    >
      <div ref={container} className="h-full -translate-y-32 move-up">
        <div
          ref={circleRef}
          className="absolute w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full -translate-y-5 -translate-x-2"
          style={{ backgroundColor: currentCircleColor }}
        ></div>
        {/* NIKE Text (Faint) */}
        <div className="w-full h-full flex justify-end items-end pointer-events-none overflow-hidden">
          <span className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[155px] italic font-extrabold leading-[0.8] text-[#ffffff] opacity-[0.04] tracking-tighter select-none flex items-end">
            NIKE
          </span>
        </div>

        <div className="absolute z-3 w-full h-[60%] mt-4 -translate-y-75">
          <img
            src={currentImageUrl}
            alt={`${product.title} in ${selectedColor} color`}
            className="w-[90%] drop-shadow-2xl object-contain -rotate-25"
          />
        </div>
      </div>
      <div
        ref={nameRef}
        className="absolute w-full -bottom-15 h-40 flex flex-col items-center justify-center gap-5"
      >
        <p className="text-white text-center text-sm sm:text-base md:text-lg lg:text-xl tracking-wide mb-1 --font-inter font-semibold">
          {product.title}
        </p>
        <div className="flex flex-col items-center justify-center gap-4">
          <div
            ref={sizeTextRef}
            className="flex items-center justify-center gap-3 opacity-0"
          >
            <span className="text-gray-400 text-xs sm:text-sm md:text-md tracking-wider">SIZE:</span>
            <div className="flex gap-2">
              {product.availableSizes.map((size) => {
                const isAvailable = product.variants.some(
                  (variant) =>
                    variant.options.color === selectedColor &&
                    variant.options.size === size &&
                    variant.available
                );
                const isSelected = selectedSize === size;

                return (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className={`w-7 h-7 rounded text-black text-xs font-bold flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-black text-white"
                        : isAvailable
                        ? "bg-white hover:bg-gray-200"
                        : "bg-gray-300 text-gray-500"
                    }`}
                    // disabled={!isAvailable}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Color Selector */}
          <div ref={colorTextRef} className="flex items-center gap-3 opacity-0">
            <span className="text-gray-400 text-xs sm:text-sm md:text-md tracking-wider">COLOR:</span>
            <div className="flex gap-3">
              {product.availableColors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    selectedColor === color
                      ? "border-white scale-125"
                      : "border-transparent"
                  }`}
                  style={{
                    backgroundColor: product.theme[color].swatchColor,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Buy Now Button */}
          <button
            ref={buyNowButtonRef}
            onClick={handleBuyNow}
            disabled={!isAuthenticated}
            className={`bg-white text-black font-semibold text-xs sm:text-sm py-2 sm:py-3 px-4 sm:px-6 rounded shadow-md hover:bg-gray-200 transition-transform active:scale-95 mt-1 opacity-0 ${
              !isAuthenticated ? 'opacity-50 bg-white' : ''
            }`}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
