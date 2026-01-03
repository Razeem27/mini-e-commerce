import Image from "next/image";
import ProductCard from "./components/ProductCard";
import { redirect } from "next/navigation";
interface Product {
  id: string | number;
  name: string;
  image?: string;
  product_image?: string;
  brand_logo?: string;
  sizes?: (string | number)[];
}

const dummyProduct: Product = {
  id: 12321,
  name: "Nike shoes",
  image: "/images/nike_shoes.png",
  brand_logo: "NIKE",
  sizes: [6, 7, 8, 9, 10],
};
export default function Home() {
  redirect("/products");
}
