import { Product } from '../types/product';

export const mockProduct: Product = {
  id: "nike-shoes-001",
  title: "NIKE SHOES",
  basePrice: 129.99,
  category: "footwear",
  availableColors: ["green", "purple", "red"],
  availableSizes: [7, 8, 9, 10],
  variants: [
    // Green variants
    {
      id: "var-green-7",
      sku: "NIKE-GREEN-7",
      price: 129.99,
      options: { color: "green", size: 7 },
      image: { url: "/images/nike-green.png", alt: "Nike Shoes in Green Size 7" },
      available: true
    },
    // Purple variants
    {
      id: "var-purple-7",
      sku: "NIKE-PURPLE-7",
      price: 129.99,
      options: { color: "purple", size: 7 },
      image: { url: "/images/nike-purple.png", alt: "Nike Shoes in Purple Size 7" },
      available: true
    },
    // Red variants
    {
      id: "var-red-7",
      sku: "NIKE-RED-7",
      price: 129.99,
      options: { color: "red", size: 7 },
      image: { url: "/images/nike-red.png", alt: "Nike Shoes in Red Size 7" },
      available: true
    },
  ],
  theme: {
    green: {
      backgroundColor: "#9bdc28",
      swatchColor: "#9bdc28",
      circleColor: "#9ADA2A"
    },
    purple: {
      backgroundColor: "#7e3196",
      swatchColor: "#7e3196",
      circleColor: "#7e3196"
    },
    red: {
      backgroundColor: "#9c2d2d",
      swatchColor: "#9c2d2d",
      circleColor: "#9c2d2d"
    }
  }
};