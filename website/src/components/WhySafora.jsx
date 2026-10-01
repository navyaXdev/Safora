import React from 'react';
import { Brain, FileCode, ShieldAlert } from 'lucide-react';

export default function WhySafora() {
  const pillars = [
    {
      index: "01",
      name: "DETECT",
      headline: "Machine Learning Intelligence",
      description: "Identify suspicious URL patterns using machine learning.",
      details: "Analyzes structural characteristics and lexical entropy to recognize malicious patterns even on newly registered domains.",
      icon: Brain,
      badge: "Pattern Recognition"
    },
    {
      index: "02",
      name: "EXPLAIN",
      headline: "Independent Rule Logic",
      description: "Provide understandable reasons using independent security rules.",
      details: "Translates technical threat flags (such as missing HTTPS, raw IP addresses, and digit substitution) into clear, human-readable explanations.",
      icon: FileCode,
      badge: "Contextual Clarity"
    },
    {
      index: "03",
      name: "WARN",
      headline: "Actionable Interception",
      description: "Present clear risk levels before users interact with suspicious websites.",
      details: "Provides immediate, visual risk tiers and warning prompts prior to credential entry or sensitive interaction on deceptive pages.",
      icon: ShieldAlert,
      badge: "Proactive Defense"
    }
  ];

  return (
    <section className="relative py-36 sm:py-44 bg-[#050706] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header with generous whitespace */}
        <div className="max-w-3xl mx-auto text-center space-y-5 mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d120f] border border-white/[0.08] text-emerald-400 text-[11px] font-mono tracking-[0.25em] uppercase font-medium">
            <span>THE PURPOSE</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12]">
            Security shouldn't require technical knowledge.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light max-w-2xl mx-auto">
            Phishing attacks often depend on users trusting convincing links, login pages and deceptive URLs. SAFORA is designed to turn complex security signals into simple, understandable warnings.
          </p>
        </div>

        {/* 3 Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.index}
                className="group relative rounded-3xl bg-[#080b09]/80 border border-white/[0.07] hover:border-emerald-500/30 p-8 sm:p-10 backdrop-blur-2xl shadow-xl hover:shadow-[0_25px_50px_rgba(0,0,0,0.8)] transition-all duration-400 hover:-translate-y-2 flex flex-col justify-between"
              >
                {/* Subtle top indicator */}
                <div className="absolute top-0 inset-x-10 h-px bg-gradient-to-r from-transparent via-white/[0.06] group-hover:via-emerald-400/40 to-transparent transition-all" />

                <div>
                  {/* Top Bar: Index & Badge */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-heading text-3xl font-extralight text-emerald-400/80 tracking-wider">
                      {item.index}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-400">
                      {item.badge}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-slate-200 group-hover:text-emerald-300 group-hover:border-emerald-500/30 transition-all duration-300 mb-6">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>

                  {/* Name (01 — DETECT / 02 — EXPLAIN / 03 — WARN) */}
                  <h3 className="font-heading text-2xl font-bold text-white tracking-tight mb-2">
                    {item.index} — {item.name}
                  </h3>

                  {/* Exact prompt text */}
                  <p className="text-base font-medium text-emerald-300/90 leading-snug mb-3">
                    "{item.description}"
                  </p>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                    {item.details}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-emerald-400/80">SAFORA Layer {item.index}</span>
                  <span>Autonomous Guard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
