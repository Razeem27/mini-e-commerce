"use client";

import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import ProductOrderCard from "../components/ProductOrderCard";
import { redirect } from "next/navigation";
import { getAccessToken } from "@/lib/auth";

export default function profile() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const token = await getAccessToken();
        if (!token) {
          setError("Please log in to view orders");
          setLoading(false);
          return;
        }

        const res = await fetch("/api/user-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        } else {
          setError("Failed to load orders");
          setOrders([]);
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Failed to load orders");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="py-8">
        <Container>
          <div className="flex justify-center items-center min-h-96">
            <div className="text-white text-xl">Loading orders...</div>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <Container>
          <div className="flex justify-center items-center min-h-96">
            <div className="text-white text-center">
              <p className="text-xl mb-4">{error}</p>
              <button 
                onClick={() => window.location.href = '/login'}
                className="mt-4 px-6 py-2 bg-white text-black rounded hover:bg-gray-200"
              >
                Go to Login
              </button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Container>
        <div className="w-201.5 min-h-93.75">
          <p className="text-[40px] font-semibold text-white mb-5">My Orders</p>
          {orders.map((order, index) => {
            return <ProductOrderCard key={order.id} orderData={{
              title: order.product_name || "Product",
              color: order.variation?.split(' / ')[0] || "N/A",
              size: order.variation?.split(' / ')[1] || "N/A",
              price: order.total_amount,
              imageUrl: "/images/Product-order-nike-green.png"
            }} />;
          })}
        </div>
      </Container>
    </div>
  );
}