import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

if (!process.env.NEXTAUTH_URL || process.env.NEXTAUTH_URL.includes("localhost")) {
  process.env.NEXTAUTH_URL = "https://reillydesignstudio.com";
}

const useSecureCookies = process.env.NEXTAUTH_URL?.startsWith("https://");
const cookiePrefix = useSecureCookies ? "__Secure-" : "";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  cookies: {
    csrfToken: {
      name: `${cookiePrefix}next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "none" as const,
        path: "/",
        secure: useSecureCookies,
      },
    },
    callbackUrl: {
      name: `${cookiePrefix}next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: "none" as const,
        path: "/",
        secure: useSecureCookies,
      },
    },
    pkceCodeVerifier: {
      name: `${cookiePrefix}next-auth.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: "none" as const,
        path: "/",
        secure: useSecureCookies,
        maxAge: 900,
      },
    },
  },
  debug: true,
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("[AUTH] signIn callback", { email: user.email, provider: account?.provider });
      return true;
    },
    async session({ session, user }) {
      console.log("[AUTH] session callback", { email: user.email });
      if (session.user) {
        (session.user as any).id = user.id;
        (session.user as any).role = (user as any).role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log("[AUTH] redirect callback", { url, baseUrl });
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
