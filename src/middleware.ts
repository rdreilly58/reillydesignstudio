import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // With database sessions, we can't use getToken() in middleware (no JWT).
  // Check for the session cookie instead, and let the admin layout
  // handle the actual auth check via useSession().
  const sessionToken = req.cookies.get("__Secure-next-auth.session-token")
    || req.cookies.get("next-auth.session-token");

  if (!sessionToken) {
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
