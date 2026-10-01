import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Philosophy() {
  return (
    <section className="relative py-44 sm:py-56 bg-[#050706] overflow-hidden flex items-center justify-center">
      {/* Very subtle ambient depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-600/[0.04] rounded-full blur-[170px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-10 z-10">
        
        {/* Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d120f] border border-white/[0.08] text-emerald-400 text-[11px] font-mono tracking-[0.25em] uppercase font-medium">
          <Sparkles className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>OUR PRODUCT PHILOSOPHY</span>
        </div>

        {/* Main Statement (Large, Majestic Typography) */}
        <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
          "Security warnings should be understandable."
        </h2>

        {/* Supporting Text */}
        <p className="text-lg sm:text-2xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto">
          SAFORA is designed for people who may not understand certificates, domains, URL structures or technical security warnings.
        </p>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
          The goal is to turn complex detection signals into simple, actionable information.
        </p>

        {/* Minimal 3-point anchor */}
        <div className="pt-10 flex flex-wrap items-center justify-center gap-8 sm:gap-16 text-xs font-mono text-slate-400 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Accessible Security</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Actionable Context</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Zero Intimidation</span>
          </div>
        </div>

      </div>
    </section>
  );
}
