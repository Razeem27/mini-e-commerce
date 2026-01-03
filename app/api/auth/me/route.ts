import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// List of valid mock JWT tokens from the system
const VALID_MOCK_TOKENS = [
  "mock_jwt_token_existing_user",
  "mock_jwt_token_new_user"
];

export async function GET() {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("access_token");
    
    if (!tokenCookie) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    
    const token = tokenCookie.value;
    
    if (!VALID_MOCK_TOKENS.includes(token)) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    

    return NextResponse.json({ authenticated: true });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}