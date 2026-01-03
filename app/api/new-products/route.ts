import { NextRequest, NextResponse } from 'next/server';

const mockProducts = [
  {
    id: "nike-air-max-001",
    title: "NIKE AIR MAX",
    basePrice: 129.99,
    category: "footwear",
    availableColors: ["green", "purple", "red"],
    availableSizes: [7, 8, 9, 10],
    variants: [
      {
        id: "var-green-7-001",
        sku: "NIKE-AIRMAX-GREEN-7",
        price: 129.99,
        options: { color: "green", size: 7 },
        image: {
          url: "/images/nike-green.png",
          alt: "Nike Air Max in Green Size 7",
        },
        available: true,
      },
      {
        id: "var-purple-7-001",
        sku: "NIKE-AIRMAX-PURPLE-7",
        price: 129.99,
        options: { color: "purple", size: 7 },
        image: {
          url: "/images/nike-purple.png",
          alt: "Nike Air Max in Purple Size 7",
        },
        available: true,
      },
      {
        id: "var-red-7-001",
        sku: "NIKE-AIRMAX-RED-7",
        price: 129.99,
        options: { color: "red", size: 7 },
        image: {
          url: "/images/nike-red.png",
          alt: "Nike Air Max in Red Size 7",
        },
        available: true,
      },
    ],
    theme: {
      green: {
        backgroundColor: "#9bdc28",
        swatchColor: "#9bdc28",
        circleColor: "#9ADA2A",
      },
      purple: {
        backgroundColor: "#7e3196",
        swatchColor: "#7e3196",
        circleColor: "#7e3196",
      },
      red: {
        backgroundColor: "#9c2d2d",
        swatchColor: "#9c2d2d",
        circleColor: "#9c2d2d",
      },
    },
  },
  {
    id: "nike-revolution-002",
    title: "NIKE REVOLUTION",
    basePrice: 139.99,
    category: "footwear",
    availableColors: ["green", "purple", "red"],
    availableSizes: [7, 8, 9, 10],
    variants: [
      {
        id: "var-green-7-002",
        sku: "NIKE-REV-GREEN-7",
        price: 139.99,
        options: { color: "green", size: 7 },
        image: {
          url: "/images/nike-green.png",
          alt: "Nike Revolution in Green Size 7",
        },
        available: true,
      },
      {
        id: "var-purple-7-002",
        sku: "NIKE-REV-PURPLE-7",
        price: 139.99,
        options: { color: "purple", size: 7 },
        image: {
          url: "/images/nike-purple.png",
          alt: "Nike Revolution in Purple Size 7",
        },
        available: true,
      },
      {
        id: "var-red-7-002",
        sku: "NIKE-REV-RED-7",
        price: 139.99,
        options: { color: "red", size: 7 },
        image: {
          url: "/images/nike-red.png",
          alt: "Nike Revolution in Red Size 7",
        },
        available: true,
      },
    ],
    theme: {
      green: {
        backgroundColor: "#9bdc28",
        swatchColor: "#9bdc28",
        circleColor: "#9ADA2A",
      },
      purple: {
        backgroundColor: "#7e3196",
        swatchColor: "#7e3196",
        circleColor: "#7e3196",
      },
      red: {
        backgroundColor: "#9c2d2d",
        swatchColor: "#9c2d2d",
        circleColor: "#9c2d2d",
      },
    },
  },
  {
    id: "nike-pegasus-003",
    title: "NIKE PEGASUS",
    basePrice: 149.99,
    category: "footwear",
    availableColors: ["green", "purple", "red"],
    availableSizes: [7, 8, 9, 10],
    variants: [
      {
        id: "var-green-7-003",
        sku: "NIKE-PEG-GREEN-7",
        price: 149.99,
        options: { color: "green", size: 7 },
        image: {
          url: "/images/nike-green.png",
          alt: "Nike Pegasus in Green Size 7",
        },
        available: true,
      },
      {
        id: "var-purple-7-003",
        sku: "NIKE-PEG-PURPLE-7",
        price: 149.99,
        options: { color: "purple", size: 7 },
        image: {
          url: "/images/nike-purple.png",
          alt: "Nike Pegasus in Purple Size 7",
        },
        available: true,
      },
      {
        id: "var-red-7-003",
        sku: "NIKE-PEG-RED-7",
        price: 149.99,
        options: { color: "red", size: 7 },
        image: {
          url: "/images/nike-red.png",
          alt: "Nike Pegasus in Red Size 7",
        },
        available: true,
      },
    ],
    theme: {
      green: {
        backgroundColor: "#9bdc28",
        swatchColor: "#9bdc28",
        circleColor: "#9ADA2A",
      },
      purple: {
        backgroundColor: "#7e3196",
        swatchColor: "#7e3196",
        circleColor: "#7e3196",
      },
      red: {
        backgroundColor: "#9c2d2d",
        swatchColor: "#9c2d2d",
        circleColor: "#9c2d2d",
      },
    },
  },
  {
    id: "nike-blazer-004",
    title: "NIKE BLAZER",
    basePrice: 159.99,
    category: "footwear",
    availableColors: ["green", "purple", "red"],
    availableSizes: [7, 8, 9, 10],
    variants: [
      {
        id: "var-green-7-004",
        sku: "NIKE-BLAZER-GREEN-7",
        price: 159.99,
        options: { color: "green", size: 7 },
        image: {
          url: "/images/nike-green.png",
          alt: "Nike Blazer in Green Size 7",
        },
        available: true,
      },
      {
        id: "var-purple-7-004",
        sku: "NIKE-BLAZER-PURPLE-7",
        price: 159.99,
        options: { color: "purple", size: 7 },
        image: {
          url: "/images/nike-purple.png",
          alt: "Nike Blazer in Purple Size 7",
        },
        available: true,
      },
      {
        id: "var-red-7-004",
        sku: "NIKE-BLAZER-RED-7",
        price: 159.99,
        options: { color: "red", size: 7 },
        image: {
          url: "/images/nike-red.png",
          alt: "Nike Blazer in Red Size 7",
        },
        available: true,
      },
    ],
    theme: {
      green: {
        backgroundColor: "#9bdc28",
        swatchColor: "#9bdc28",
        circleColor: "#9ADA2A",
      },
      purple: {
        backgroundColor: "#7e3196",
        swatchColor: "#7e3196",
        circleColor: "#7e3196",
      },
      red: {
        backgroundColor: "#9c2d2d",
        swatchColor: "#9c2d2d",
        circleColor: "#9c2d2d",
      },
    },
  },
  {
    id: "nike-cortez-005",
    title: "NIKE CORTEZ",
    basePrice: 169.99,
    category: "footwear",
    availableColors: ["green", "purple", "red"],
    availableSizes: [7, 8, 9, 10],
    variants: [
      {
        id: "var-green-7-005",
        sku: "NIKE-CORTEZ-GREEN-7",
        price: 169.99,
        options: { color: "green", size: 7 },
        image: {
          url: "/images/nike-green.png",
          alt: "Nike Cortez in Green Size 7",
        },
        available: true,
      },
      {
        id: "var-purple-7-005",
        sku: "NIKE-CORTEZ-PURPLE-7",
        price: 169.99,
        options: { color: "purple", size: 7 },
        image: {
          url: "/images/nike-purple.png",
          alt: "Nike Cortez in Purple Size 7",
        },
        available: true,
      },
      {
        id: "var-red-7-005",
        sku: "NIKE-CORTEZ-RED-7",
        price: 169.99,
        options: { color: "red", size: 7 },
        image: {
          url: "/images/nike-red.png",
          alt: "Nike Cortez in Red Size 7",
        },
        available: true,
      },
    ],
    theme: {
      green: {
        backgroundColor: "#9bdc28",
        swatchColor: "#9bdc28",
        circleColor: "#9ADA2A",
      },
      purple: {
        backgroundColor: "#7e3196",
        swatchColor: "#7e3196",
        circleColor: "#7e3196",
      },
      red: {
        backgroundColor: "#9c2d2d",
        swatchColor: "#9c2d2d",
        circleColor: "#9c2d2d",
      },
    },
  },
  {
    id: "nike-dunk-006",
    title: "NIKE DUNK",
    basePrice: 179.99,
    category: "footwear",
    availableColors: ["green", "purple", "red"],
    availableSizes: [7, 8, 9, 10],
    variants: [
      {
        id: "var-green-7-006",
        sku: "NIKE-DUNK-GREEN-7",
        price: 179.99,
        options: { color: "green", size: 7 },
        image: {
          url: "/images/nike-green.png",
          alt: "Nike Dunk in Green Size 7",
        },
        available: true,
      },
      {
        id: "var-purple-7-006",
        sku: "NIKE-DUNK-PURPLE-7",
        price: 179.99,
        options: { color: "purple", size: 7 },
        image: {
          url: "/images/nike-purple.png",
          alt: "Nike Dunk in Purple Size 7",
        },
        available: true,
      },
      {
        id: "var-red-7-006",
        sku: "NIKE-DUNK-RED-7",
        price: 179.99,
        options: { color: "red", size: 7 },
        image: {
          url: "/images/nike-red.png",
          alt: "Nike Dunk in Red Size 7",
        },
        available: true,
      },
    ],
    theme: {
      green: {
        backgroundColor: "#9bdc28",
        swatchColor: "#9bdc28",
        circleColor: "#9ADA2A",
      },
      purple: {
        backgroundColor: "#7e3196",
        swatchColor: "#7e3196",
        circleColor: "#7e3196",
      },
      red: {
        backgroundColor: "#9c2d2d",
        swatchColor: "#9c2d2d",
        circleColor: "#9c2d2d",
      },
    },
  },
  {
    id: "nike-jordan-007",
    title: "NIKE JORDAN",
    basePrice: 189.99,
    category: "footwear",
    availableColors: ["green", "purple", "red"],
    availableSizes: [7, 8, 9, 10],
    variants: [
      {
        id: "var-green-7-007",
        sku: "NIKE-JORDAN-GREEN-7",
        price: 189.99,
        options: { color: "green", size: 7 },
        image: {
          url: "/images/nike-green.png",
          alt: "Nike Jordan in Green Size 7",
        },
        available: true,
      },
      {
        id: "var-purple-7-007",
        sku: "NIKE-JORDAN-PURPLE-7",
        price: 189.99,
        options: { color: "purple", size: 7 },
        image: {
          url: "/images/nike-purple.png",
          alt: "Nike Jordan in Purple Size 7",
        },
        available: true,
      },
      {
        id: "var-red-7-007",
        sku: "NIKE-JORDAN-RED-7",
        price: 189.99,
        options: { color: "red", size: 7 },
        image: {
          url: "/images/nike-red.png",
          alt: "Nike Jordan in Red Size 7",
        },
        available: true,
      },
    ],
    theme: {
      green: {
        backgroundColor: "#9bdc28",
        swatchColor: "#9bdc28",
        circleColor: "#9ADA2A",
      },
      purple: {
        backgroundColor: "#7e3196",
        swatchColor: "#7e3196",
        circleColor: "#7e3196",
      },
      red: {
        backgroundColor: "#9c2d2d",
        swatchColor: "#9c2d2d",
        circleColor: "#9c2d2d",
      },
    },
  },
  {
    id: "nike-vapourmax-008",
    title: "NIKE VAPOURMAX",
    basePrice: 199.99,
    category: "footwear",
    availableColors: ["green", "purple", "red"],
    availableSizes: [7, 8, 9, 10],
    variants: [
      {
        id: "var-green-7-008",
        sku: "NIKE-VAPOUR-GREEN-7",
        price: 199.99,
        options: { color: "green", size: 7 },
        image: {
          url: "/images/nike-green.png",
          alt: "Nike Vapourmax in Green Size 7",
        },
        available: true,
      },
      {
        id: "var-purple-7-008",
        sku: "NIKE-VAPOUR-PURPLE-7",
        price: 199.99,
        options: { color: "purple", size: 7 },
        image: {
          url: "/images/nike-purple.png",
          alt: "Nike Vapourmax in Purple Size 7",
        },
        available: true,
      },
      {
        id: "var-red-7-008",
        sku: "NIKE-VAPOUR-RED-7",
        price: 199.99,
        options: { color: "red", size: 7 },
        image: {
          url: "/images/nike-red.png",
          alt: "Nike Vapourmax in Red Size 7",
        },
        available: true,
      },
    ],
    theme: {
      green: {
        backgroundColor: "#9bdc28",
        swatchColor: "#9bdc28",
        circleColor: "#9ADA2A",
      },
      purple: {
        backgroundColor: "#7e3196",
        swatchColor: "#7e3196",
        circleColor: "#7e3196",
      },
      red: {
        backgroundColor: "#9c2d2d",
        swatchColor: "#9c2d2d",
        circleColor: "#9c2d2d",
      },
    },
  },
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      data: mockProducts,
      count: mockProducts.length
    });
    
  } catch (error) {
    console.error('Error in /api/new-products:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}