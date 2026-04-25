import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const encoder = new TextEncoder();

async function hasSession(request) {
  const token = request.cookies.get("atmosgrid_session")?.value;
  if (!token) return false;

  try {
    await jwtVerify(
      token,
      encoder.encode(process.env.AUTH_SECRET ?? "development-auth-secret-change-me")
    );
    return true;
  } catch {
    return false;
  }
}

export async function proxy(request) {
  const isAuthenticated = await hasSession(request);
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/login") && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
