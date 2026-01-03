"use server";
import { cookies } from "next/headers";

export async function getAccessToken() {
  const cookieStorage = await cookies();
  const token = cookieStorage?.get("access_token");
  return token?.value || null;
}

export async function isAuthenticated() {
  return !!getAccessToken();
}
