import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // Clear the access_token cookie
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed' }, 
      { status: 500 }
    );
  }
}