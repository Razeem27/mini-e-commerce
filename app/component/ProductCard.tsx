"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";

interface ProductVariation {
  id: string | number;
  color_code: string;
  color_name?: string;
}

interface Product {
  id: string | number;
  name: string;
  image?: string;
  product_image?: string;
  brand_logo?: string;
  sizes?: (string | number)[];
  variations?: ProductVariation[];
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string | number | null>(
    null
  );
  const [selectedColor, setSelectedColor] = useState<string | number | null>(
    null
  );

  // Refs for GSAP
  const cardRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sizeRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set default selections
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0]);
    }
    if (product.variations && product.variations.length > 0 && !selectedColor) {
      setSelectedColor(product.variations[0].id);
    }
  }, [product, selectedSize, selectedColor]);

  useEffect(() => {
    const card = cardRef.current;
    const imageContainer = imageContainerRef.current;
    const title = titleRef.current;
    const sizeSection = sizeRef.current;
    const colorSection = colorRef.current;
    const buyButton = buttonRef.current;

    if (!card || !imageContainer || !title) return;

    // Initial state: hide interactive elements
    if (sizeSection) {
      gsap.set(sizeSection, { opacity: 0, y: 20, visibility: "hidden" });
    }
    if (colorSection) {
      gsap.set(colorSection, { opacity: 0, y: 20, visibility: "hidden" });
    }
    if (buyButton) {
      gsap.set(buyButton, { opacity: 0, y: 20, visibility: "hidden" });
    }

    const handleMouseEnter = (): void => {
      const tl = gsap.timeline();

      // Move image and circle up
      tl.to([imageContainer, title], {
        y: -50,
        duration: 0.5,
        ease: "power2.out",
      });

      // Show size section
      if (sizeSection) {
        tl.to(
          sizeSection,
          {
            opacity: 1,
            y: 0,
            visibility: "visible",
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }

      // Show color section
      if (colorSection) {
        tl.to(
          colorSection,
          {
            opacity: 1,
            y: 0,
            visibility: "visible",
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }

      // Show buy button
      if (buyButton) {
        tl.to(
          buyButton,
          {
            opacity: 1,
            y: 0,
            visibility: "visible",
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }
    };

    const handleMouseLeave = (): void => {
      const tl = gsap.timeline();

      // Hide interactive elements
      const elements = [buyButton, colorSection, sizeSection].filter(Boolean);
      if (elements.length > 0) {
        tl.to(elements, {
          opacity: 0,
          y: 20,
          visibility: "hidden",
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.in",
        });
      }

      // Move image back
      tl.to(
        [imageContainer, title],
        {
          y: 0,
          duration: 0.4,
          ease: "power2.inOut",
        },
        "-=0.2"
      );
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handlePurchase = async (): Promise<void> => {
    alert(
      `Purchasing: ${product.name}, Size: ${selectedSize}, Color: ${selectedColor}`
    );
    // try {
    //   const purchaseData = selectedColor
    //     ? { variation_product_id: selectedColor }
    //     : { product_id: product.id }
    //   const { data } = await productAPI.purchaseProduct(purchaseData)
    //   router.push(`/order-success?orderId=${data.order.id}&amount=${data.order.total_amount}`)
    // } catch (error) {
    //   alert('Please login to purchase')
    //   router.push('/login')
    // }
  };

  return (
    <div
      ref={cardRef}
      className="relative w-[312px] h-[405px] bg-neutral-900 overflow-hidden cursor-pointer shadow-2xl"
    >
      {/* Image Container with Circle Background */}
      <div
        ref={imageContainerRef}
        className="absolute top-8 left-1/2 -translate-x-1/2 w-[280px] h-[280px]"
      >
        {/* Red Circle Background */}
        <div className="absolute -top-40 left-30 bg-gradient-to-br from-[#D85C5C] to-[#B84444] rounded-full shadow-lg h-[450px] w-[450px]" />

        {/* Shoe Image */}
        <img
          src={product.image || product.product_image || "/placeholder.png"}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain p-6 -rotate-12 drop-shadow-2xl "
        />
      </div>

      {/* Product Title */}
      <h2
        ref={titleRef}
        className="absolute top-[320px] left-1/2 -translate-x-1/2 text-white text-2xl font-bold tracking-[0.15em] whitespace-nowrap"
      >
        {product.name.toUpperCase()}
      </h2>

      {/* Size Section */}
      {product.sizes && product.sizes.length > 0 && (
        <div
          ref={sizeRef}
          className="absolute bottom-[140px] left-0 right-0 px-8"
        >
          <div className="flex items-center justify-between">
            <span className="text-white text-sm font-semibold tracking-wider">
              SIZE:
            </span>
            <div className="flex gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
                    selectedSize === size
                      ? "bg-white text-black scale-110"
                      : "bg-transparent text-white border-2 border-gray-600 hover:border-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Color Section */}
      {product.variations && product.variations.length > 0 && (
        <div
          ref={colorRef}
          className="absolute bottom-[80px] left-0 right-0 px-8"
        >
          <div className="flex items-center justify-between">
            <span className="text-white text-sm font-semibold tracking-wider">
              COLOR:
            </span>
            <div className="flex gap-3">
              {product.variations.map(variant => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedColor(variant.id)}
                  className={`w-7 h-7 rounded-full transition-all ${
                    selectedColor === variant.id
                      ? "ring-2 ring-white ring-offset-2 ring-offset-neutral-900 scale-110"
                      : "hover:scale-110"
                  }`}
                  style={{ backgroundColor: variant.color_code }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div ref={buttonRef} className="absolute bottom-6 left-0 right-0 px-8">
        <button
          onClick={handlePurchase}
          className="w-full bg-white text-black font-bold text-base py-3.5 rounded-xl hover:bg-gray-100 active:scale-95 transition-all shadow-lg"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
