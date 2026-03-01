import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Blog" };

const posts = [
  { title: "The Art of Embedded Board Bring-Up", date: "Mar 2026", tag: "Embedded", slug: "embedded-board-bring-up", excerpt: "What really happens when a new board arrives from the fab house. A practitioner's guide to the methodical (and occasionally profane) process of making hardware and software work together." },
  { title: "What Is OpenClaw and How to Set It Up", date: "Mar 2026", tag: "AI", slug: "what-is-openclaw", excerpt: "A practical guide to setting up your own AI assistant that manages email, calendar, messaging, and more — from an engineer who uses it daily." },
  { title: "How to Add AI to Your Small Business in 2026", date: "Mar 2026", tag: "AI", slug: "ai-for-small-business", excerpt: "You don't need a data science team. Here's a no-nonsense guide to AI tools that actually deliver ROI for small businesses." },
  { title: "RAG Pipelines Explained for Business Owners", date: "Mar 2026", tag: "AI", slug: "rag-pipelines-explained", excerpt: "What retrieval-augmented generation actually is, why it matters, and how it lets AI answer questions about your own documents." },
  { title: "Why White Space Is the Most Underrated Design Tool", date: "Feb 2026", tag: "Design Theory", slug: "white-space-design", excerpt: "A deep dive into the silent power of negative space." },
  { title: "Building a Design System from Scratch in 2026", date: "Jan 2026", tag: "Process", slug: "design-system-2026", excerpt: "From token chaos to a coherent, scalable system." },
  { title: "Typography Rules Every Designer Should Know", date: "Jan 2026", tag: "Typography", slug: "typography-rules", excerpt: "The fundamentals that never go out of style." },
];

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-white mb-2">Blog</h1>
      <p className="text-zinc-500 mb-16">Thoughts on design, AI, and building things that work.</p>
      <div className="space-y-12">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <span className={`text-xs font-medium ${post.tag === "AI" ? "text-emerald-400" : post.tag === "Embedded" ? "text-amber-400" : "text-violet-400"}`}>{post.tag}</span>
            <h2 className="text-xl font-semibold text-white mt-1 group-hover:text-violet-300 transition-colors">{post.title}</h2>
            <p className="text-zinc-500 text-sm mt-2">{post.excerpt}</p>
            <p className="text-zinc-600 text-xs mt-3">{post.date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
