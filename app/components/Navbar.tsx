"use client";

import { useAuth } from "../context/AuthContext";
import Container from "./Container";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const { isAuthenticated, isHydrated } = useAuth();

  return (
    <Container className="bg-[#191919]">
      <div className="flex items-center justify-between py-2">
        {/* Left - Logo or Login Text */}
        <div className="flex items-center gap-2">
          <svg
            width="52"
            height="52"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-13 lg:h-13"
          >
            <g>
              <path
                d="M54.1667 6.5L13.8667 33.0539C10.7316 34.3803 8.09893 35.0435 5.96869 35.0435C3.5571 35.0435 1.80869 34.1994 0.723473 32.5113C0.0401876 31.4261 -0.160779 30.0495 0.120574 28.3815C0.401927 26.7134 1.1455 24.9349 2.3513 23.0458C3.35613 21.5185 4.94376 18.742 7.23478 16.25C6.43091 17.5362 5.9285 19.6294 5.60695 20.9959C5.00405 23.5683 5.54666 25.4574 7.23478 26.6632C8.03864 27.2259 9.14396 27.5072 10.5507 27.5072C11.6761 27.5072 12.9422 27.3264 14.349 26.9646L54.1667 6.5Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_603_197">
                <rect width="52" height="52" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>

        {/* Right - User Icon + Auth Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* User Icon */}
          {isAuthenticated && isHydrated ? (
            <>
              <Link
                href="/Profile"
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link
              href="/login"
              className="text-white p-1 cursor-pointer rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </Container>
  );
}
