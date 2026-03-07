import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = { 
  title: "Featured Blog Posts | ReillyDesignStudio",
  description: "Our most popular and impactful blog posts on AI, security, and technical implementation."
};

const featuredPosts = [
  { 
    title: "Secure Credit Card Storage for AI Assistants: A Developer's Guide", 
    date: "Mar 2026", 
    tag: "AI Security", 
    slug: "secure-credit-card-storage", 
    hero: "🔐", 
    excerpt: "Enterprise-grade secure storage for payment automation with AI assistants. Hardware-backed encryption, multi-backend architecture, and PCI DSS aligned practices for developers.",
    featured: true,
    readTime: "8 min read"
  },
  { 
    title: "From JSON to Cloud: How I Achieved a 20x Performance Boost Migrating 2,000 Contacts to PostgreSQL + AWS", 
    date: "Mar 2026", 
    tag: "AI", 
    slug: "contacts-migration-case-study", 
    hero: "🚀", 
    excerpt: "A real-world case study in enterprise database migration, cloud architecture, and AI assistant integration. Complete technical breakdown of achieving 20x faster searches.",
    featured: true,
    readTime: "12 min read"
  },
  { 
    title: "AI Implementation for DC Area Businesses: What Actually Works in 2026", 
    date: "Mar 2026", 
    tag: "AI", 
    slug: "ai-implementation-dc-businesses", 
    hero: "🚀", 
    excerpt: "Practical AI implementation guide for DC Metro businesses. Real ROI examples, costs, and implementation framework from an MIT engineer with 30+ years experience.",
    featured: true,
    readTime: "10 min read"
  }
];

export default function FeaturedBlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-16">
        <div className="flex items-center gap-2 text-sm text-violet-400 mb-4">
          <Link href="/" className="hover:text-violet-300 transition-colors">Home</Link>
          <span className="text-zinc-600">•</span>
          <Link href="/blog" className="hover:text-violet-300 transition-colors">Blog</Link>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400">Featured</span>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-4">Featured Posts</h1>
        <p className="text-zinc-400 text-lg">Our most popular and impactful content on AI, security, and technical implementation.</p>
      </div>

      {/* Featured Posts Grid */}
      <div className="space-y-12">
        {featuredPosts.map((post, index) => (
          <article key={post.slug} className="group">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="flex gap-6 items-start">
                {/* Hero Icon */}
                <div className="w-20 h-20 shrink-0 rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-600/5 border border-violet-500/20 group-hover:border-violet-500/40 flex items-center justify-center text-3xl transition-colors">
                  {post.hero}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Badge and meta */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      post.tag === "AI Security" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" :
                      post.tag === "AI" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                      "bg-violet-500/10 text-violet-400 border border-violet-500/20"
                    }`}>
                      {post.tag}
                    </span>
                    <span className="text-xs text-zinc-500">{post.date}</span>
                    <span className="text-xs text-zinc-500">•</span>
                    <span className="text-xs text-zinc-500">{post.readTime}</span>
                    {index === 0 && (
                      <span className="text-xs font-medium bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">
                        ✨ Latest
                      </span>
                    )}
                  </div>
                  
                  {/* Title */}
                  <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-violet-300 transition-colors leading-tight">
                    {post.title}
                  </h2>
                  
                  {/* Excerpt */}
                  <p className="text-zinc-400 text-base leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  
                  {/* Read more link */}
                  <div className="flex items-center gap-2 text-violet-400 group-hover:text-violet-300 transition-colors">
                    <span className="text-sm font-medium">Read full article</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* See all posts CTA */}
      <div className="mt-16 pt-12 border-t border-zinc-800">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-3">Want to read more?</h3>
          <p className="text-zinc-400 mb-6">Explore all our posts on design, AI, embedded systems, and more.</p>
          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-emerald-600 hover:from-violet-500 hover:to-emerald-500 text-white font-medium transition-colors">
            Browse all posts
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}