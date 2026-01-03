"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";
import { apiFetch } from "@/lib/apiClient";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        const data = await apiFetch('/api/new-products');
        setProducts(data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  if (loading) {
    return (
      <Container className="py-8">
        <div className="flex justify-center items-center min-h-96">
          <div className="text-white text-xl">Loading products...</div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
        <>
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-4 sm:mb-5">
            Men's Jordan Shoes
          </p>
          <div className="flex flex-wrap justify-center sm:justify-between gap-4 sm:gap-y-8 md:gap-y-13">
            {products.map((product: any, index: number) => {
              return <ProductCard key={product.id} product={product} colorIndex={index} />;
            })}
          </div>
        </>
      </Container>
  );
}
