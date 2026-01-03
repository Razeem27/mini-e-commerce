import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.product_id || (!body.color && !body.variation_product_id)) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    return NextResponse.json({
      success: true,
      data: {
        message: "Order created successfully",
        order: {
          id: "ORD202512270001",
          total_amount: 899,
          payment_status: "Paid",
        },
      },
    });
  } catch (error) {
    console.error("Error in /api/purchase-product:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
