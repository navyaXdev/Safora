import React from "react";
import { LOGO_URL, NAV_LINKS, TAGLINE, GITHUB_RELEASE_URL } from "@/lib/safora";

export default function Footer() {
  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="relative border-t border-black/[0.06] dark:border-white/[0.06] bg-[#F3F2EC] dark:bg-[#040504] transition-colors duration-400">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          
          {/* Brand */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl overflow-hidden ring-1 ring-black/10 dark:ring-white/10 shadow-xs">
                <img src={LOGO_URL} alt="SAFORA logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-[#141916] dark:text-white">SAFORA</span>
            </div>
            
            <p className="font-serif text-lg text-emerald-700 dark:text-emerald-400 font-normal italic">
              &ldquo;{TAGLINE}&rdquo;
            </p>
            
            <p className="text-xs text-[#55635B] dark:text-slate-400 font-light max-w-xs">
              Real-time phishing protection for everyday browsing.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-7 lg:justify-self-end">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#6e7b73] dark:text-slate-400 mb-6 font-medium">
              Navigation & Releases
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="text-xs uppercase font-mono tracking-[0.2em] text-[#4A544E] hover:text-[#141916] dark:text-slate-300 dark:hover:text-white transition-colors duration-300 cursor-pointer font-medium"
                >
                  {l.label}
                </button>
              ))}
              <a
                href={GITHUB_RELEASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase font-mono tracking-[0.2em] text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-semibold transition-colors duration-300 inline-flex items-center gap-1"
              >
                <span>Release v1.0.0</span>
                <span>↗</span>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-black/[0.06] dark:border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#6e7b73] dark:text-slate-400">
          <div>
            © 2026 SAFORA. All rights reserved.
          </div>
          <div className="text-emerald-700 dark:text-emerald-400/90 font-medium">
            Explainable In-Browser Threat Intelligence
          </div>
        </div>
      </div>
    </footer>
  );
}
