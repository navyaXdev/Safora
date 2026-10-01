import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

export default function CTA({ onExplore, onViewFeatures }) {
  return (
    <section className="relative py-36 sm:py-44 bg-[#050706] overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="rounded-3xl bg-[#080b09]/90 border border-white/[0.08] p-10 sm:p-20 text-center shadow-[0_30px_70px_rgba(0,0,0,0.85)] relative overflow-hidden backdrop-blur-2xl">
          
          {/* Subtle top indicator */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

          {/* SAFORA Logo with subtle glow */}
          <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden shadow-[0_0_35px_rgba(16,185,129,0.3)] ring-1 ring-white/10 mb-8 transform hover:scale-105 transition-transform duration-300">
            <img
              src="/safora-logo.png"
              alt="SAFORA Official Logo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d120f] border border-white/[0.08] text-emerald-400 text-[11px] font-mono tracking-[0.25em] uppercase font-medium mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>REAL-TIME PROTECTION</span>
          </div>

          {/* Heading */}
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-4">
            Stay one step ahead of phishing.
          </h2>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-slate-300 max-w-xl mx-auto mb-10 font-light leading-relaxed">
            Make every click more informed with SAFORA.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#home"
              onClick={onExplore}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 border border-emerald-400/30 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-all duration-300 text-center cursor-pointer"
            >
              <span>Explore SAFORA</span>
              <ArrowRight className="w-4 h-4 text-emerald-100" />
            </a>

            <a
              href="#features"
              onClick={onViewFeatures}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-xs font-semibold tracking-wider uppercase text-slate-300 hover:text-white bg-[#0e120f] hover:bg-[#141915] border border-white/[0.08] hover:border-white/20 transition-all duration-300 text-center cursor-pointer"
            >
              <span>View Features</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          <div className="mt-12 pt-6 border-t border-white/[0.05] text-[11px] font-mono text-slate-400 tracking-wider">
            "You're protected now."
          </div>

        </div>
      </div>
    </section>
  );
}
