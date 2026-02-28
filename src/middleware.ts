import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_EMAILS = [
  "rdreilly2010@gmail.com",
  "robert.reilly@reillydesignstudio.com",
];

export async function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || !token.email || !ADMIN_EMAILS.includes(token.email)) {
    const baseUrl = "https://reillydesignstudio.com";
    const signinUrl = new URL("/api/auth/signin", baseUrl);
    signinUrl.searchParams.set("callbackUrl", `${baseUrl}${req.nextUrl.pathname}`);
    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
