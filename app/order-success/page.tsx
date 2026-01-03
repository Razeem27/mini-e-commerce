"use client";

import React from "react";
import Container from "../components/Container";
import ProductOrderCard from "../components/ProductOrderCard";
import { useSearchParams } from "next/navigation";

export default function OrderSuccess() {
  const searchParams = useSearchParams();
  
  const orderData = {
    title: searchParams.get('title') || 'Product',
    color: searchParams.get('color') || 'N/A',
    size: searchParams.get('size') || 'N/A',
    price: parseFloat(searchParams.get('price') || '0'),
    imageUrl: searchParams.get('imageUrl') || '/images/nike_shoes.png'
  };
  return (
    <div className="py-8">
      <Container>
        <div className="container flex justify-center items-center max-w-lg mx-auto w-full px-4">
          <div className="min-h-96 sm:min-h-[450px] md:min-h-[500px] lg:h-144.5 w-full max-w-md sm:max-w-lg md:max-w-xl lg:min-w-136.25 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-8 mb-10">
              <div className="flex items-center m-1">
                <svg
                  width="106"
                  height="56"
                  viewBox="0 0 107 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M106.276 0L27.2102 52.0966C21.0594 54.6989 15.8944 56 11.715 56C6.98367 56 3.55344 54.344 1.42433 51.0321C0.0837843 48.903 -0.310495 46.2022 0.241496 42.9296C0.793487 39.6571 2.25232 36.1677 4.618 32.4615C6.58939 29.465 9.7042 24.0178 14.199 19.1287C12.6219 21.6521 11.6362 25.7588 11.0053 28.4399C9.82249 33.4866 10.887 37.1929 14.199 39.5586C15.7761 40.6625 17.9446 41.2145 20.7046 41.2145C22.9126 41.2145 25.3965 40.8597 28.1565 40.15L106.276 0Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-3">
                  Successfully Ordered!
                </p>
                <time className="text-xs sm:text-sm md:text-[13px] text-white/60">
                  12:34 PM, 20th Dec 2025
                </time>
              </div>
            </div>
            <ProductOrderCard showTimestamp={false} orderData={orderData} />
          </div>
        </div>
      </Container>
    </div>
  );
}
