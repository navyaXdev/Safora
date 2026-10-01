import React from 'react';
import { Zap, HelpCircle, EyeOff } from 'lucide-react';

export default function TrustStrip() {
  const cards = [
    {
      tag: "REAL-TIME",
      description: "Automatically analyzes websites while browsing.",
      icon: Zap,
      label: "Zero-Latency Guard"
    },
    {
      tag: "EXPLAINABLE",
      description: "Shows understandable reasons behind security warnings.",
      icon: HelpCircle,
      label: "Clarity Over Jargon"
    },
    {
      tag: "PRIVACY-FIRST",
      description: "Processes only what is needed for the security check.",
      icon: EyeOff,
      label: "Minimalist Processing"
    }
  ];

  return (
    <section className="relative z-10 -mt-6 sm:-mt-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="group relative rounded-3xl bg-[#090c0a]/80 border border-white/[0.07] hover:border-emerald-500/30 p-7 sm:p-8 backdrop-blur-2xl shadow-xl transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] flex flex-col justify-between"
            >
              {/* Subtle top indicator */}
              <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-white/[0.06] group-hover:via-emerald-400/40 to-transparent transition-all" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-emerald-400 font-semibold px-2.5 py-1 rounded-md bg-emerald-950/40 border border-emerald-500/20">
                    {card.tag}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-slate-300 group-hover:text-emerald-300 group-hover:border-emerald-500/30 transition-colors">
                    <Icon className="w-4 h-4 stroke-[1.5]" />
                  </div>
                </div>

                <p className="font-heading text-lg sm:text-xl font-medium text-slate-100 group-hover:text-white leading-snug transition-colors">
                  "{card.description}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <span className="w-1 h-1 rounded-full bg-emerald-400/80" />
                <span>{card.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
