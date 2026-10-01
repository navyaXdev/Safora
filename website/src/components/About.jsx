import React from 'react';
import { Radar, Cpu, MessageSquareCheck, ShieldCheck, Sparkles, Check } from 'lucide-react';

export default function About() {
  const steps = [
    {
      num: "01",
      step: "DETECT",
      label: "Live Ingestion",
      desc: "Captures the URL string during browser navigation before page render.",
      icon: Radar
    },
    {
      num: "02",
      step: "ANALYZE",
      label: "Dual Assessment",
      desc: "Evaluates lexical attributes via ML inference and deterministic security rules.",
      icon: Cpu
    },
    {
      num: "03",
      step: "EXPLAIN",
      label: "Plain-English Context",
      desc: "Translates technical signals into clear, actionable, jargon-free explanations.",
      icon: MessageSquareCheck
    },
    {
      num: "04",
      step: "PROTECT",
      label: "Active Intervention",
      desc: "Displays contextual warning overlays before sensitive credentials can be exposed.",
      icon: ShieldCheck
    }
  ];

  return (
    <section id="about" className="relative py-36 sm:py-44 overflow-hidden bg-[#050706]">
      {/* Very subtle ambient depth */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-900/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Pill */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[11px] font-mono tracking-[0.25em] text-emerald-400/90 uppercase font-medium">
            ABOUT SAFORA
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* LEFT: Text Content with Luxury Typography */}
          <div className="lg:col-span-6 space-y-8">
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12]">
              What is SAFORA?
            </h2>

            <div className="space-y-5 text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              <p>
                SAFORA is a real-time phishing URL detection system designed to make web security easier to understand.
              </p>
              <p>
                Instead of simply telling users that a website is dangerous, SAFORA combines machine learning with an independent rule-based explanation layer to identify suspicious URLs and communicate the reason behind the warning in plain English.
              </p>
            </div>

            {/* Core Philosophy Highlight Quote */}
            <div className="p-7 sm:p-8 rounded-3xl bg-[#080b09]/80 border border-white/[0.08] relative overflow-hidden backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                  <Sparkles className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-[0.25em] text-emerald-400/90 uppercase block mb-1">
                    Core Philosophy
                  </span>
                  <blockquote className="font-heading text-xl sm:text-2xl font-semibold text-white leading-snug">
                    "Don't just tell users that a website is risky. Explain WHY."
                  </blockquote>
                  <p className="text-xs text-slate-400 mt-2 font-light">
                    Engineered to make phishing protection understandable even for non-technical users.
                  </p>
                </div>
              </div>
            </div>

            {/* Subtle verification points */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Zero black-box mystery</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Independent rule engine</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Random Forest model</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Proactive browser overlay</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Modern Cybersecurity Process Visual (DETECT ↓ ANALYZE ↓ EXPLAIN ↓ PROTECT) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-[#080b09]/80 border border-white/[0.08] p-7 sm:p-10 backdrop-blur-2xl shadow-2xl">
              
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl overflow-hidden ring-1 ring-white/10">
                    <img src="/safora-logo.png" alt="SAFORA" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-white tracking-wide">
                      THE SAFORA PIPELINE
                    </h3>
                    <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
                      Sequential Threat Neutralization
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-400">
                  REAL-TIME LOOP
                </span>
              </div>

              {/* Vertical Process Steps */}
              <div className="relative mt-8 space-y-4">
                {/* Connecting hairline rail */}
                <div className="absolute left-[23px] top-6 bottom-6 w-px bg-white/[0.08]" />

                {steps.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.step}
                      className="relative flex items-start gap-4 p-4 rounded-2xl bg-[#060807]/90 border border-white/[0.05] hover:border-emerald-500/30 transition-all duration-300 group"
                    >
                      {/* Step Node */}
                      <div className="relative z-10 w-9 h-9 rounded-xl bg-[#0e1310] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-emerald-400 group-hover:border-emerald-500/40 transition-all shrink-0">
                        <Icon className="w-4 h-4 stroke-[1.5]" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono font-bold text-emerald-400 tracking-wider">
                            {item.step}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            STEP {item.num}
                          </span>
                        </div>
                        <h4 className="font-heading text-sm font-semibold text-white mt-0.5">
                          {item.label}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed font-light">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Subtle Status */}
              <div className="mt-8 pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Parallel ML + Rule Arbitration</span>
                </span>
                <span>Sub-50ms Processing</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
