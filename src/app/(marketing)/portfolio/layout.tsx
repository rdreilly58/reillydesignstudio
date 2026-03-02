import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected work from Reilly Design Studio — brand identity, full-stack web platforms, and kids coloring sites. Real projects with real results.",
  openGraph: {
    title: "Portfolio | ReillyDesignStudio",
    description: "Selected work — brand identity, web platforms, and more.",
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
