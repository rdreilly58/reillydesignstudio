"use client";

import { useState } from "react";
import { Mail, MapPin, Clock, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError("Something went wrong. Please email me directly at robert.reilly@reillydesignstudio.com");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-white mb-2">Get In Touch</h1>
      <p className="text-zinc-500 mb-12">Have a project in mind, need a quote, or just want to connect? I&apos;d love to hear from you.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <Mail className="text-violet-400" size={18} />
              </div>
              <h3 className="text-white font-semibold">Email</h3>
            </div>
            <a href="mailto:robert.reilly@reillydesignstudio.com" className="text-violet-400 hover:text-violet-300 text-sm transition-colors break-all">
              robert.reilly@reillydesignstudio.com
            </a>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <MapPin className="text-violet-400" size={18} />
              </div>
              <h3 className="text-white font-semibold">Location</h3>
            </div>
            <p className="text-zinc-400 text-sm">Reston, Virginia</p>
            <p className="text-zinc-600 text-xs mt-1">Washington, D.C. metro area</p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <Clock className="text-violet-400" size={18} />
              </div>
              <h3 className="text-white font-semibold">Response Time</h3>
            </div>
            <p className="text-zinc-400 text-sm">Within 24 hours</p>
            <p className="text-zinc-600 text-xs mt-1">Usually much faster</p>
          </div>

          <div className="p-5 rounded-xl bg-gradient-to-br from-violet-500/10 to-zinc-900 border border-violet-500/20">
            <h3 className="text-white font-semibold mb-2">Looking for a quote?</h3>
            <p className="text-zinc-400 text-sm mb-3">For project inquiries with scope and budget details, use the dedicated quote form.</p>
            <a href="/shop/services" className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors">
              Request a Quote <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          {submitted ? (
            <div className="text-center py-16 rounded-2xl bg-zinc-900 border border-zinc-800">
              <div className="text-3xl mb-3">✅</div>
              <h3 className="text-xl font-semibold text-white mb-2">Message Sent</h3>
              <p className="text-zinc-400 mb-4">Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
              <button onClick={() => setSubmitted(false)} className="text-violet-400 hover:text-violet-300 text-sm">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="p-3 rounded-xl bg-red-900/30 border border-red-800 text-red-300 text-sm">{error}</div>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-2">Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 text-sm transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-2">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 text-sm transition-colors"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">Message *</label>
                <textarea
                  rows={8}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 text-sm transition-colors resize-none"
                  placeholder="Tell me about your project, question, or idea..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold text-sm transition-colors"
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
