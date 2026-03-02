import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["nodemailer"],
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "https://reillydesignstudio.com",
  },
};

export default nextConfig;
