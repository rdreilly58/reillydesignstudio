import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = { 
  title: "Blog | ReillyDesignStudio",
  description: "Thoughts on design, AI, embedded systems, and building things that work. Technical insights from 30+ years of engineering experience."
};

const posts = [
  { title: "Secure Credit Card Storage for AI Assistants: A Developer's Guide", date: "Mar 2026", tag: "AI Security", slug: "secure-credit-card-storage", hero: "🔐", excerpt: "Enterprise-grade secure storage for payment automation with AI assistants. Hardware-backed encryption, multi-backend architecture, and PCI DSS aligned practices for developers.", featured: true },
  { title: "From JSON to Cloud: How I Achieved a 20x Performance Boost Migrating 2,000 Contacts to PostgreSQL + AWS", date: "Mar 2026", tag: "AI", slug: "contacts-migration-case-study", hero: "🚀", excerpt: "A real-world case study in enterprise database migration, cloud architecture, and AI assistant integration. Complete technical breakdown of achieving 20x faster searches.", featured: true },
  { title: "AI Implementation for DC Area Businesses: What Actually Works in 2026", date: "Mar 2026", tag: "AI", slug: "ai-implementation-dc-businesses", hero: "🚀", excerpt: "Practical AI implementation guide for DC Metro businesses. Real ROI examples, costs, and implementation framework from an MIT engineer with 30+ years experience.", featured: true },
  { title: "The Art of Embedded Board Bring-Up", date: "Mar 2026", tag: "Embedded", slug: "embedded-board-bring-up", hero: "🔧", excerpt: "What really happens when a new board arrives from the fab house. A practitioner's guide to the methodical (and occasionally profane) process of making hardware and software work together.", featured: false },
  { title: "What Is OpenClaw and How to Set It Up", date: "Mar 2026", tag: "AI", slug: "what-is-openclaw", hero: "🤖", excerpt: "A practical guide to setting up your own AI assistant that manages email, calendar, messaging, and more — from an engineer who uses it daily.", featured: false },
  { title: "How to Add AI to Your Small Business in 2026", date: "Mar 2026", tag: "AI", slug: "ai-for-small-business", hero: "💡", excerpt: "You don't need a data science team. Here's a no-nonsense guide to AI tools that actually deliver ROI for small businesses.", featured: false },
  { title: "RAG Pipelines Explained for Business Owners", date: "Mar 2026", tag: "AI", slug: "rag-pipelines-explained", hero: "📚", excerpt: "What retrieval-augmented generation actually is, why it matters, and how it lets AI answer questions about your own documents.", featured: false },
  { title: "Why White Space Is the Most Underrated Design Tool", date: "Feb 2026", tag: "Design Theory", slug: "white-space-design", hero: "◻️", excerpt: "A deep dive into the silent power of negative space.", featured: false },
  { title: "Building a Design System from Scratch in 2026", date: "Jan 2026", tag: "Process", slug: "design-system-2026", hero: "🧱", excerpt: "From token chaos to a coherent, scalable system.", featured: false },
  { title: "Typography Rules Every Designer Should Know", date: "Jan 2026", tag: "Typography", slug: "typography-rules", hero: "Aa", excerpt: "The fundamentals that never go out of style.", featured: false },
];

const featuredPosts = posts.filter(post => post.featured);
const allPosts = posts;

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-16">
        <div className="flex items-center gap-2 text-sm text-violet-400 mb-4">
          <Link href="/" className="hover:text-violet-300 transition-colors">Home</Link>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400">Blog</span>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-4">All Posts</h1>
        <p className="text-zinc-400 text-lg">Thoughts on design, AI, embedded systems, and building things that work.</p>
        
        {/* Navigation buttons */}
        <div className="flex items-center gap-3 mt-8">
          <Link href="/blog/featured" className="text-violet-400 hover:text-violet-300 text-sm flex items-center gap-1 transition-colors">
            Featured
          </Link>
          <div className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-violet-600 text-white text-sm font-medium">
            All posts
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Featured Posts</h2>
          <Link href="/blog/featured" className="text-violet-400 hover:text-violet-300 text-sm flex items-center gap-1 transition-colors">
            View all featured <ArrowRight size={14} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-900/20 border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-600/5 border border-violet-500/20 flex items-center justify-center text-xl mb-4">
                  {post.hero}
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  post.tag === "AI Security" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" :
                  post.tag === "AI" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                  "bg-violet-500/10 text-violet-400 border border-violet-500/20"
                }`}>
                  {post.tag}
                </span>
                <h3 className="text-lg font-semibold text-white mt-3 mb-2 group-hover:text-violet-300 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <p className="text-zinc-600 text-xs">{post.date}</p>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* All Posts Section */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-8">All Posts</h2>
        <div className="space-y-8">
          {allPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex gap-6 items-start">
              <div className="w-16 h-16 shrink-0 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 flex items-center justify-center text-2xl transition-colors">
                {post.hero}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    post.tag === "AI" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : 
                    post.tag === "AI Security" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : 
                    post.tag === "Embedded" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : 
                    "bg-violet-500/10 text-violet-400 border border-violet-500/20"
                  }`}>
                    {post.tag}
                  </span>
                  <span className="text-xs text-zinc-500">{post.date}</span>
                  {post.featured && (
                    <span className="text-xs font-medium bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">
                      ✨ Featured
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors">
                  {post.title}
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
