"use client";

import React from 'react';
import { Metadata } from 'next';
import BlogHeader from './BlogHeader';

export default function BlogPage() {
  const blogPosts = [
    {
      slug: 'ai-defense-contractors',
      title: 'AI Implementation for Defense Contractors: Security, Compliance, and Mission Success',
      excerpt: 'Navigate the complex landscape of government AI implementation with cleared expertise and proven methodologies. Essential guide for defense contractors implementing AI in classified environments.',
      date: 'March 6, 2026',
      readTime: '12 min read',
      tags: ['Defense AI', 'Government', 'Security Clearance', 'NIST Compliance'],
      author: 'Robert D. Reilly, MIT • TS/SCI',
      featured: true,
    },
    {
      slug: 'ai-implementation-dc-businesses',
      title: 'AI Implementation for DC Area Businesses: What Actually Works in 2026',
      excerpt: 'Practical insights from 30+ years of engineering experience implementing AI solutions for DC Metro businesses. Real ROI, proven strategies, and actionable next steps.',
      date: 'March 5, 2026',
      readTime: '8 min read',
      tags: ['Business AI', 'DC Metro', 'ROI', 'Implementation'],
      author: 'Robert D. Reilly, MIT',
      featured: false,
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BlogHeader />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            AI Implementation Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert perspectives on artificial intelligence implementation, automation, and business transformation 
            from 30+ years of engineering experience in defense, aerospace, and enterprise systems.
          </p>
        </div>

        {/* Featured Post */}
        {blogPosts.filter(post => post.featured).map((post) => (
          <div key={post.slug} className="mb-16">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                <span className="inline-block bg-white/20 text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
                  Featured Article
                </span>
                <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
                  <a href={`/blog/${post.slug}`} className="hover:text-blue-100 transition-colors">
                    {post.title}
                  </a>
                </h2>
                <p className="text-blue-100 text-lg mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-blue-200">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <a 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center px-4 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Read Article →
                  </a>
                </div>
              </div>
              <div className="px-8 py-4">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* All Posts */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">All Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-8">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                    {post.featured && (
                      <>
                        <span>•</span>
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">Featured</span>
                      </>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                    <a href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                      {post.title}
                    </a>
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <span key={tag} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.author}</span>
                    <a 
                      href={`/blog/${post.slug}`}
                      className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                    >
                      Read more →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Stay Updated on AI Implementation</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get insights on AI trends, implementation strategies, and industry developments 
            directly from an MIT engineer with 30+ years of experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
            />
            <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* About the Author */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">About the Author</h3>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
              RDR
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-900 mb-2">Robert D. Reilly</h4>
              <p className="text-gray-600 mb-4">
                MIT-educated engineer (SMME '81, SBME '79) with 30+ years in defense aerospace, 
                currently Senior Advisor at Peraton working on NRO SKYFIRE systems. 
                Active TS/SCI clearance with expertise in AI/ML, embedded systems, 
                SIGINT/EW, and enterprise software architecture.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">MIT Engineer</span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">TS/SCI Cleared</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">30+ Years Experience</span>
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">AI Implementation Expert</span>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Topics</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="text-blue-600 text-3xl mb-3">🤖</div>
              <h4 className="font-bold text-gray-900 mb-2">AI Implementation</h4>
              <p className="text-sm text-gray-600">Enterprise AI deployment strategies</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="text-purple-600 text-3xl mb-3">🛡️</div>
              <h4 className="font-bold text-gray-900 mb-2">Defense & Security</h4>
              <p className="text-sm text-gray-600">Classified systems and clearance insights</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="text-green-600 text-3xl mb-3">📊</div>
              <h4 className="font-bold text-gray-900 mb-2">Business Intelligence</h4>
              <p className="text-sm text-gray-600">Data-driven decision making</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="text-orange-600 text-3xl mb-3">⚡</div>
              <h4 className="font-bold text-gray-900 mb-2">Automation</h4>
              <p className="text-sm text-gray-600">Process optimization and efficiency</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}