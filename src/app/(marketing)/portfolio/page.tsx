import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = { title: "Portfolio | Reilly Design Studio" };

const allWork = [
  {
    title: "Lucian & Gideon's Coloring Fun",
    client: "LucianAndGideon.com",
    tag: "Web App",
    slug: "lucian-and-gideon",
    year: 2026,
    image: "/portfolio/lucian-gideon-home.jpg",
    featured: true,
  },
  { title: "Brand Identity", client: "Apex Co.", tag: "Branding", slug: "apex-brand-identity", year: 2025 },
  { title: "ReillyDesignStudio.com", client: "reillydesignstudio.com", tag: "Full-Stack", slug: "reilly-design-studio", year: 2026, image: "/portfolio/rds-homepage.jpg" },
  { title: "Print Series", client: "Gallery 44", tag: "Print", slug: "gallery-44-print", year: 2025 },
  { title: "Motion Identity", client: "Pulse Media", tag: "Motion", slug: "pulse-motion", year: 2024 },
  { title: "Packaging System", client: "Harvest Co.", tag: "Packaging", slug: "harvest-packaging", year: 2024 },
];

export default function PortfolioPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-white mb-2">Work</h1>
      <p className="text-zinc-500 mb-16">Selected projects from across disciplines.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allWork.map((item) => (
          <Link
            key={item.slug}
            href={`/portfolio/${item.slug}`}
            className={`group relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-violet-500/50 transition-all ${
              item.featured ? "sm:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
            }`}
          >
            {item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 group-hover:from-zinc-700 transition-all" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="text-xs text-violet-400 font-medium">{item.tag}</span>
              <h3 className="text-white font-semibold mt-1">{item.title}</h3>
              <p className="text-zinc-400 text-sm">{item.client} · {item.year}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
