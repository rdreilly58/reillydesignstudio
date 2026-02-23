import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = { title: "Project" };

export default async function PortfolioItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/portfolio" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm mb-8 transition-colors">
        <ArrowLeft size={14} /> Back to Work
      </Link>
      <div className="aspect-video rounded-2xl bg-zinc-900 border border-zinc-800 mb-8" />
      <span className="text-xs text-violet-400 font-medium">Branding</span>
      <h1 className="text-4xl font-bold text-white mt-2 mb-4">Project Title</h1>
      <p className="text-zinc-400 leading-relaxed">
        Full project case study coming soon. Slug: {slug}
      </p>
    </div>
  );
}
