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
    }),
  ],
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
