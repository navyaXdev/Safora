import React, { useState } from 'react';
import { Globe2, Binary, Cpu, FileSearch, ShieldAlert, ArrowRight, ArrowDown } from 'lucide-react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      name: "VISIT",
      title: "The user visits a website.",
      description: "As the user enters a URL or follows a web link, SAFORA's Chrome extension intercepts the navigation event in real time before page execution.",
      icon: Globe2
    },
    {
      num: "02",
      name: "ANALYZE",
      title: "SAFORA extracts URL-based characteristics.",
      description: "Without tracking browsing history or personal sessions, SAFORA extracts lexical, syntactic, and structural URL features strictly required for analysis.",
      icon: Binary
    },
    {
      num: "03",
      name: "DETECT",
      title: "The machine learning model evaluates the URL and generates a risk score.",
      description: "The Random Forest classifier evaluates the extracted feature vector against established phishing decision trees to calculate an algorithmic risk probability.",
      icon: Cpu
    },
    {
      num: "04",
      name: "EXPLAIN",
      title: "The rule engine identifies suspicious indicators and provides understandable reasons.",
      description: "Simultaneously, the independent rule engine maps flagged anomalies to plain-English security explanations so the user understands the exact threat rationale.",
      icon: FileSearch
    }
  ];

  const flowNodes = [
    { label: "WEBSITE", sub: "User Navigation", icon: Globe2 },
    { label: "URL ANALYSIS", sub: "Feature Extraction", icon: Binary },
    { label: "ML MODEL + RULE ENGINE", sub: "Parallel Assessment", icon: Cpu },
    { label: "RISK CLASSIFICATION", sub: "Scored 0.00 – 1.00", icon: FileSearch },
    { label: "USER WARNING", sub: "In-Browser Alert", icon: ShieldAlert }
  ];

  return (
    <section id="how-it-works" className="relative py-36 sm:py-44 bg-[#050706] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-5 mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d120f] border border-white/[0.08] text-emerald-400 text-[11px] font-mono tracking-[0.25em] uppercase font-medium">
            <span>PIPELINE</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12]">
            How SAFORA Works
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light max-w-2xl mx-auto">
            From the instant a link is clicked to the moment an alert appears, SAFORA executes an automated, multi-tiered security pipeline in milliseconds.
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {steps.map((st, index) => {
            const Icon = st.icon;
            const isSelected = activeStep === index;
            return (
              <div
                key={st.num}
                onClick={() => setActiveStep(index)}
                className={`relative rounded-3xl p-8 transition-all duration-400 cursor-pointer flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-[#0a0f0c] border-emerald-500/40 shadow-[0_20px_40px_rgba(0,0,0,0.8)] -translate-y-1'
                    : 'bg-[#080b09]/80 border-white/[0.06] hover:border-white/15'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading text-2xl font-light text-emerald-400/80">
                      {st.num}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-400">
                      {st.name}
                    </span>
                  </div>

                  <div className="w-11 h-11 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center text-slate-200 mb-6">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>

                  <h3 className="font-heading text-lg font-bold text-white mb-2 leading-snug">
                    "{st.title}"
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {st.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.05] text-[10px] font-mono text-slate-400">
                  Step {st.num} Pipeline
                </div>
              </div>
            );
          })}
        </div>

        {/* Animated Architecture Flow */}
        <div className="rounded-3xl bg-[#080b09]/80 border border-white/[0.08] p-8 sm:p-14 backdrop-blur-2xl shadow-2xl">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] font-mono tracking-[0.25em] text-emerald-400/90 uppercase block mb-1">
              End-to-End Threat Pipeline
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Animated Architecture Flow
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 font-light">
              Continuous threat evaluation pipeline with parallel ML inference and rule verification.
            </p>
          </div>

          {/* Flow Diagram */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {flowNodes.map((node, i) => {
              const Icon = node.icon;
              const isLast = i === flowNodes.length - 1;
              return (
                <React.Fragment key={node.label}>
                  <div className="w-full lg:w-auto flex-1 min-w-[160px] p-6 rounded-2xl bg-[#060807] border border-white/[0.06] hover:border-emerald-500/30 transition-all duration-300 text-center">
                    <div className="w-9 h-9 mx-auto mb-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-slate-300">
                      <Icon className="w-4 h-4 stroke-[1.5]" />
                    </div>
                    <div className="text-[11px] font-mono font-bold text-white uppercase tracking-wider mb-1">
                      {node.label}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {node.sub}
                    </div>
                  </div>

                  {!isLast && (
                    <div className="flex items-center justify-center py-2 lg:py-0 text-slate-400 shrink-0">
                      <div className="hidden lg:flex items-center">
                        <div className="w-6 h-px bg-white/[0.08] relative">
                          <span className="absolute -top-0.5 right-0 w-1 h-1 rounded-full bg-emerald-400" />
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 ml-1 text-slate-400" />
                      </div>
                      <div className="flex lg:hidden items-center flex-col">
                        <div className="h-4 w-px bg-white/[0.08]" />
                        <ArrowDown className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="mt-12 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 gap-3">
            <span>Real-time Interception at Navigation Start</span>
            <span className="text-emerald-400/90">Zero Unnecessary Data Recorded</span>
          </div>

        </div>

      </div>
    </section>
  );
}
