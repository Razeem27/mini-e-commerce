import React from "react";
import Container from "../components/Container";
import ProductOrderCard from "../components/ProductOrderCard";
import { redirect } from "next/navigation";
import { getAccessToken } from "@/lib/auth";


export default async function Profile() {
    // Check if user is authenticated first
    const token = await getAccessToken();
      if (!token) {
       redirect("/login");
     }

    // Use server-side fetch to get user orders
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/user-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

  return (
    <div className="py-8">
      <Container>
        <div className="w-full max-w-5xl min-h-80">
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-4 sm:mb-5">My Orders</p>
          {Array(2)
            .fill(0)
            .map((val, index) => {
              return <ProductOrderCard key={index} />;
            })}
        </div>
      </Container>
    </div>
  );
}
