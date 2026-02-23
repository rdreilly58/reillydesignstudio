import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = { title: "Post" };

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm mb-8 transition-colors">
        <ArrowLeft size={14} /> Back to Blog
      </Link>
      <span className="text-xs text-violet-400 font-medium">Design Theory</span>
      <h1 className="text-4xl font-bold text-white mt-2 mb-2">Post Title</h1>
      <p className="text-zinc-500 text-sm mb-10">February 2026 · 6 min read</p>
      <div className="prose prose-invert prose-zinc max-w-none">
        <p>Full MDX content for <code>{slug}</code> will render here.</p>
      </div>
    </article>
  );
}
