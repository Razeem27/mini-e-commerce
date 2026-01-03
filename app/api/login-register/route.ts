import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.phone_number) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      token: {
        access: "mock_jwt_token_new_user",
      },
      user_id: "ARM0001",
      name: body.name,
      phone_number: body.phone_number,
      message: "Login Successful",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 500 }
    );
  }
}
