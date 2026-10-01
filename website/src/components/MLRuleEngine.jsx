import React from 'react';
import { BrainCircuit, FileCode2, Gauge, ShieldAlert } from 'lucide-react';

export default function MLRuleEngine() {
  const ruleIndicators = [
    { title: "Raw IP address", desc: "Direct IP bypassing DNS records." },
    { title: "Digit substitution", desc: "Numbers mimicking alphabet characters." },
    { title: "Missing HTTPS", desc: "Unencrypted transmission of credentials." },
    { title: "Suspicious keywords", desc: "Urgency-inducing login prompts." },
    { title: "Excessive subdomains", desc: "Deep subdomain stacking." },
    { title: "Downloadable file extensions", desc: "Hidden executables in redirect paths." },
    { title: "Suspicious TLD patterns", desc: "High-abuse top-level domains." }
  ];

  return (
    <section className="relative py-36 sm:py-44 bg-[#050706] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-5 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d120f] border border-white/[0.08] text-emerald-400 text-[11px] font-mono tracking-[0.25em] uppercase font-medium">
            <span>DUAL-ENGINE SYMBIOSIS</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12]">
            Machine Learning + Rule Engine
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light max-w-2xl mx-auto">
            Traditional security produces an opaque score. SAFORA pairs statistical classification with transparent explainability.
          </p>
        </div>

        {/* Center Prominent Statement Banner */}
        <div className="mb-20 p-8 sm:p-12 rounded-3xl bg-[#080b09]/80 border border-white/[0.08] text-center max-w-3xl mx-auto backdrop-blur-2xl">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400/90 block mb-2">
            Core Philosophy
          </span>
          <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            "Two layers. One clearer security experience."
          </div>
        </div>

        {/* Split Screen Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* LEFT SIDE: MACHINE LEARNING */}
          <div className="relative rounded-3xl bg-[#080b09]/80 border border-white/[0.08] hover:border-emerald-500/30 p-8 sm:p-10 backdrop-blur-2xl transition-all duration-400 flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-emerald-400">
                    <BrainCircuit className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                      Layer A
                    </span>
                    <h3 className="font-heading text-xl font-bold text-white tracking-tight">
                      MACHINE LEARNING
                    </h3>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-400">
                  RANDOM FOREST
                </span>
              </div>

              {/* Question */}
              <div className="p-5 rounded-2xl bg-[#060807] border border-white/[0.05]">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Core Inquiry</span>
                <p className="font-heading text-lg font-semibold text-emerald-300/90 italic">
                  "What does the model think?"
                </p>
              </div>

              {/* Output */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 block">
                  Model Outputs
                </span>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-[#060807] border border-white/[0.05]">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Risk Score</span>
                      <Gauge className="w-4 h-4 text-emerald-400 stroke-[1.5]" />
                    </div>
                    <div className="font-heading text-3xl font-bold text-white mt-1">
                      0.87 <span className="text-xs text-red-400 font-normal">/ 1.00</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#060807] border border-white/[0.05]">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Classification</span>
                      <ShieldAlert className="w-4 h-4 text-red-400 stroke-[1.5]" />
                    </div>
                    <div className="font-heading text-xl font-bold text-red-400 mt-2">
                      Phishing
                    </div>
                  </div>
                </div>
              </div>

              {/* Explain Text */}
              <div className="p-5 rounded-2xl bg-[#060807] border border-white/[0.05] text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 block mb-1 font-medium">
                  Role:
                </span>
                "The machine learning layer analyzes URL characteristics and estimates the risk associated with the URL."
              </div>

            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.05] text-[10px] font-mono text-slate-400">
              Statistical Pattern Evaluation
            </div>
          </div>

          {/* RIGHT SIDE: RULE ENGINE */}
          <div className="relative rounded-3xl bg-[#080b09]/80 border border-white/[0.08] hover:border-teal-500/30 p-8 sm:p-10 backdrop-blur-2xl transition-all duration-400 flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-teal-400">
                    <FileCode2 className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                      Layer B
                    </span>
                    <h3 className="font-heading text-xl font-bold text-white tracking-tight">
                      RULE ENGINE
                    </h3>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-400">
                  DETERMINISTIC
                </span>
              </div>

              {/* Question */}
              <div className="p-5 rounded-2xl bg-[#060807] border border-white/[0.05]">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Core Inquiry</span>
                <p className="font-heading text-lg font-semibold text-teal-300/90 italic">
                  "Why might this URL be suspicious?"
                </p>
              </div>

              {/* Indicators */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 block mb-1">
                  Active Rule Indicators
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {ruleIndicators.map((ind) => (
                    <div
                      key={ind.title}
                      className="p-3 rounded-xl bg-[#060807] border border-white/[0.04] flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                      <span className="font-medium text-slate-200 truncate">
                        {ind.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Explain Text */}
              <div className="p-5 rounded-2xl bg-[#060807] border border-white/[0.05] text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                <span className="font-mono text-[10px] uppercase tracking-wider text-teal-400 block mb-1 font-medium">
                  Role:
                </span>
                "The rule engine provides understandable security reasons based on suspicious URL indicators."
              </div>

            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.05] text-[10px] font-mono text-slate-400">
              Deterministic Explainability
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
