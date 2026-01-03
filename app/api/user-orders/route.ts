import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    // Try to get token from Authorization header first, then from cookies
    const authHeader = req.headers.get("authorization");
    const cookieStorage = await cookies();
    const cookieToken = cookieStorage.get("access_token")?.value;
    
    const token = authHeader?.replace("Bearer ", "") || cookieToken;

    // 2️⃣ Reject if no token
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 3️⃣ Mock user order history
    const orders = [
      {
        id: "ORD202512270001",
        product_name: "Classic Hoodie",
        variation: "Black / M",
        total_amount: 899,
        payment_status: "Paid",
        created_at: "2025-12-27T10:30:00Z",
      },
      {
        id: "ORD202512270002",
        product_name: "Running Shoes",
        variation: null,
        total_amount: 2499,
        payment_status: "Paid",
        created_at: "2025-12-28T14:15:00Z",
      },
    ];

    // 4️⃣ Return orders
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("User orders API error:", error);

    return NextResponse.json(
      { message: "Failed to fetch user orders" },
      { status: 500 }
    );
  }
}
