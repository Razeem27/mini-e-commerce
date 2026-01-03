import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { phone_number } = await req.json();

    if (!phone_number) {
      return NextResponse.json({
        otp: "5678",
        user: false,
      });
    }

    const isExistingUser = phone_number === "9876543210";

    if (isExistingUser) {
      return NextResponse.json({
        otp: "1234",
        user: true,
        token: {
          access: "mock_jwt_token_existing_user",
        },
      });
    }

    return NextResponse.json({
      otp: "5678",
      user: false,
    });
  } catch (error) {
    return NextResponse.json({ message: "Invalid request" }, { status: 500 });
  }
}
