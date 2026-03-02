import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on design, AI, embedded systems, and building things that work. Technical deep-dives and practical guides from 20+ years of engineering.",
  openGraph: {
    title: "Blog | ReillyDesignStudio",
    description: "Design, AI, and embedded systems — practical guides from 20+ years of engineering.",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
