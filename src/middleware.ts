import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_EMAILS = [
  "rdreilly2010@gmail.com",
  "robert.reilly@reillydesignstudio.com",
];

export async function middleware(req: NextRequest) {
  // Only protect /admin routes (except /admin/login)
  if (!req.nextUrl.pathname.startsWith("/admin") || req.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || !token.email || !ADMIN_EMAILS.includes(token.email)) {
    const loginUrl = new URL("/admin/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
