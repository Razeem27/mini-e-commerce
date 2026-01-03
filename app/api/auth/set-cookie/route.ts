import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { token } = await req.json();
  const cookieStorage = await cookies()

  if (!token) {
    return NextResponse.json({ message: "Token missing" }, { status: 400 });
  }

  cookieStorage.set({
    name: "access_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return NextResponse.json({ message: "Token stored" });
}
