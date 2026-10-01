import React from 'react';
import { Compass, Server, BrainCircuit, ShieldCheck, Webhook, ArrowDown, Cpu } from 'lucide-react';

export default function Technology() {
  const techCards = [
    {
      title: "CHROME EXTENSION",
      stack: "React + Tailwind CSS",
      desc: "Delivers low-overhead in-browser tab inspection, contextual warning overlays, and instant visual risk indicators.",
      icon: Compass,
      badge: "Client"
    },
    {
      title: "BACKEND",
      stack: "Python + Flask",
      desc: "High-throughput microservice responsible for real-time lexical parsing, feature vectorization, and heuristic evaluation.",
      icon: Server,
      badge: "Core Service"
    },
    {
      title: "MACHINE LEARNING",
      stack: "Random Forest Classifier",
      desc: "Trained ensemble decision model evaluating statistical URL patterns to output continuous risk probability.",
      icon: BrainCircuit,
      badge: "Inference Engine"
    },
    {
      title: "SECURITY LOGIC",
      stack: "Independent Rule-Based Detection",
      desc: "Deterministic rule set analyzing domain irregularities, IP anomalies, missing certificates, and character substitutions.",
      icon: ShieldCheck,
      badge: "Explainability"
    },
    {
      title: "API",
      stack: "REST API",
      desc: "Minimalist, secure JSON endpoints ensuring sub-second response times between the client and threat assessment pipeline.",
      icon: Webhook,
      badge: "Gateway"
    }
  ];

  return (
    <section id="technology" className="relative py-36 sm:py-44 bg-[#050706] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-5 mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d120f] border border-white/[0.08] text-emerald-400 text-[11px] font-mono tracking-[0.25em] uppercase font-medium">
            <span>ENGINEERING</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12]">
            Built on layered security intelligence.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light max-w-2xl mx-auto">
            A modular synergy of lightweight browser clients, performant backend pipelines, statistical ML modeling, and explainable cybersecurity heuristics.
          </p>
        </div>

        {/* 5 Technology Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-24">
          {techCards.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.title}
                className="group relative rounded-3xl bg-[#080b09]/80 border border-white/[0.07] hover:border-emerald-500/30 p-7 backdrop-blur-2xl transition-all duration-400 flex flex-col justify-between hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center text-slate-300 group-hover:text-emerald-300 group-hover:border-emerald-500/30 transition-all">
                      <Icon className="w-4 h-4 stroke-[1.5]" />
                    </div>
                    <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                      {tech.badge}
                    </span>
                  </div>

                  <h3 className="text-[10px] font-mono font-bold text-emerald-400/90 uppercase tracking-widest mb-1">
                    {tech.title}
                  </h3>

                  <div className="font-heading text-base font-bold text-white mb-2 leading-snug">
                    {tech.stack}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {tech.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/[0.05] text-[10px] font-mono text-slate-400">
                  Production Module
                </div>
              </div>
            );
          })}
        </div>

        {/* Architecture Diagram */}
        <div className="rounded-3xl bg-[#080b09]/80 border border-white/[0.08] p-8 sm:p-14 backdrop-blur-2xl shadow-2xl">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] font-mono tracking-[0.25em] text-emerald-400/90 uppercase block mb-1">
              DATAFLOW MAP
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Visual Architecture Diagram
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 font-light">
              Synchronous request & parallel security arbitration pipeline
            </p>
          </div>

          <div className="max-w-2xl mx-auto flex flex-col items-center">
            
            {/* 1. Chrome Extension */}
            <div className="w-full sm:w-72 p-4 rounded-2xl bg-[#060807] border border-white/[0.08] text-center hover:border-emerald-500/30 transition-colors">
              <div className="flex items-center justify-center gap-2 text-white font-mono font-bold text-sm">
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>Chrome Extension</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">React + Tailwind CSS Client</span>
            </div>

            <div className="my-3 flex flex-col items-center">
              <div className="w-px h-6 bg-white/[0.08]" />
              <ArrowDown className="w-3.5 h-3.5 text-slate-400 -mt-1" />
            </div>

            {/* 2. Flask API */}
            <div className="w-full sm:w-72 p-4 rounded-2xl bg-[#060807] border border-white/[0.08] text-center hover:border-emerald-500/30 transition-colors">
              <div className="flex items-center justify-center gap-2 text-white font-mono font-bold text-sm">
                <Server className="w-4 h-4 text-teal-400" />
                <span>Flask API</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Python REST Microservice</span>
            </div>

            <div className="my-3 flex flex-col items-center">
              <div className="w-px h-6 bg-white/[0.08]" />
              <ArrowDown className="w-3.5 h-3.5 text-slate-400 -mt-1" />
            </div>

            {/* 3. Parallel Dual-Engine Box */}
            <div className="w-full rounded-3xl bg-[#050706] border border-white/[0.06] p-6 sm:p-8">
              <div className="text-[10px] font-mono tracking-[0.2em] text-slate-400 uppercase text-center mb-6">
                Parallel Dual-Engine Evaluation
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#080b09] border border-white/[0.06] text-center">
                  <BrainCircuit className="w-5 h-5 text-emerald-400 mx-auto mb-2 stroke-[1.5]" />
                  <div className="font-heading text-sm font-bold text-white">ML Model</div>
                  <div className="text-[11px] text-slate-400 font-mono">Random Forest Classifier</div>
                  <div className="mt-2 text-[10px] text-slate-400 font-light">Statistical risk estimation</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#080b09] border border-white/[0.06] text-center">
                  <ShieldCheck className="w-5 h-5 text-teal-400 mx-auto mb-2 stroke-[1.5]" />
                  <div className="font-heading text-sm font-bold text-white">Rule Engine</div>
                  <div className="text-[11px] text-slate-400 font-mono">Independent Rule Logic</div>
                  <div className="mt-2 text-[10px] text-slate-400 font-light">Deterministic threat indicators</div>
                </div>
              </div>
            </div>

            <div className="my-3 flex flex-col items-center">
              <div className="w-px h-6 bg-white/[0.08]" />
              <ArrowDown className="w-3.5 h-3.5 text-slate-400 -mt-1" />
            </div>

            {/* 4. Risk + Reasons */}
            <div className="w-full sm:w-80 p-4 rounded-2xl bg-[#060807] border border-white/[0.08] text-center">
              <div className="flex items-center justify-center gap-2 text-white font-mono font-bold text-sm">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Risk + Reasons</span>
              </div>
              <span className="text-[11px] text-emerald-300 font-mono">
                Continuous Score + Plain-English Reasons
              </span>
            </div>

            <div className="my-3 flex flex-col items-center">
              <div className="w-px h-6 bg-white/[0.08]" />
              <ArrowDown className="w-3.5 h-3.5 text-slate-400 -mt-1" />
            </div>

            {/* 5. User */}
            <div className="w-full sm:w-72 p-4 rounded-2xl bg-[#080b09] border border-emerald-500/40 text-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <div className="font-heading text-sm font-bold text-white">
                User
              </div>
              <span className="text-[11px] text-emerald-400 font-mono">
                Safe, Informed Browsing Decision
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
