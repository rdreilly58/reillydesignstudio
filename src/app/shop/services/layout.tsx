import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "14 professional services: design, AI & automation, embedded software development, and cybersecurity. From brand identity to board bring-up to penetration testing.",
  openGraph: {
    title: "Services | ReillyDesignStudio",
    description: "Design, AI, embedded systems, and cybersecurity services. 14 offerings from $250/hr to full engagements.",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
