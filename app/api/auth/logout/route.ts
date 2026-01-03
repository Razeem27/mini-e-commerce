import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStorage = await cookies();
  cookieStorage.delete("access_token");

  return NextResponse.json({ message: "Logged out" });
}
