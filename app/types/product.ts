export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  options: {
    color: string;
    size: number;
  };
  image: {
    url: string;
    alt: string;
  };
  available: boolean;
}

export interface Product {
  id: string;
  title: string;
  basePrice: number;
  category: string;
  variants: ProductVariant[];
  availableColors: string[];
  availableSizes: number[];
  theme: {
    [color: string]: {
      backgroundColor: string;
      swatchColor: string;
      circleColor: string;
    };
  };
}