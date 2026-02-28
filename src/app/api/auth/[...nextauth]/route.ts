import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

if (!process.env.NEXTAUTH_URL || process.env.NEXTAUTH_URL.includes("localhost")) {
  process.env.NEXTAUTH_URL = "https://reillydesignstudio.com";
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  // Use JWT sessions instead of database sessions to avoid cookie issues on mobile Safari
  session: {
    strategy: "jwt",
  },
  // Use simple cookie names without __Host- or __Secure- prefixes
  // Mobile Safari ITP aggressively blocks prefixed cookies in cross-origin OAuth flows
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax" as const,
        path: "/",
        secure: true,
      },
    },
    csrfToken: {
      name: "next-auth.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "lax" as const,
        path: "/",
        secure: true,
      },
    },
    callbackUrl: {
      name: "next-auth.callback-url",
      options: {
        httpOnly: true,
        sameSite: "lax" as const,
        path: "/",
        secure: true,
      },
    },
  },
  debug: true,
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("[AUTH] signIn callback", { email: user.email, provider: account?.provider });
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  logger: {
    error(code, metadata) {
      console.error("[AUTH ERROR]", code, metadata);
    },
    warn(code) {
      console.warn("[AUTH WARN]", code);
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
