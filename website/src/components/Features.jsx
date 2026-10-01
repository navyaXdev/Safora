import React from 'react';
import { 
  Globe, 
  Search, 
  MousePointerClick, 
  Gauge, 
  HelpCircle, 
  AlertOctagon, 
  ShieldAlert, 
  LockKeyhole,
  ArrowUpRight
} from 'lucide-react';

export default function Features({ onOpenManualScanner }) {
  const features = [
    {
      id: "FEATURE 01",
      title: "AUTOMATIC WEBSITE SCANNING",
      description: "Automatically analyze visited websites in real time without requiring manual interaction.",
      icon: Globe,
      tag: "Passive Guard",
      colSpan: "lg:col-span-2"
    },
    {
      id: "FEATURE 02",
      title: "MANUAL URL SCANNER",
      description: "Check any URL before opening it.",
      icon: Search,
      tag: "Pre-Flight",
      actionLabel: onOpenManualScanner ? "Open Inspector" : null,
      onAction: onOpenManualScanner,
      colSpan: "lg:col-span-1"
    },
    {
      id: "FEATURE 03",
      title: "RIGHT-CLICK SCANNER",
      description: "Scan links directly from the browser context menu.",
      icon: MousePointerClick,
      tag: "Context Menu",
      colSpan: "lg:col-span-1"
    },
    {
      id: "FEATURE 04",
      title: "RISK SCORE",
      description: "Receive a continuous risk score with an easy-to-understand security classification.",
      icon: Gauge,
      tag: "Scored 0–100%",
      colSpan: "lg:col-span-1"
    },
    {
      id: "FEATURE 05",
      title: "THREAT EXPLANATIONS",
      description: "Understand why a URL was flagged instead of receiving only a generic warning.",
      icon: HelpCircle,
      tag: "Explainable",
      colSpan: "lg:col-span-2"
    },
    {
      id: "FEATURE 06",
      title: "SMART WARNING OVERLAY",
      description: "Display an on-page security warning when a website is considered high risk.",
      icon: AlertOctagon,
      tag: "Intervention",
      colSpan: "lg:col-span-1"
    },
    {
      id: "FEATURE 07",
      title: "DOUBLE PROTECTION",
      description: "If a dangerous website is detected and the user attempts to enter sensitive information, an additional warning can be triggered.",
      icon: ShieldAlert,
      tag: "Form Shield",
      colSpan: "lg:col-span-1"
    },
    {
      id: "FEATURE 08",
      title: "PRIVACY-FIRST DESIGN",
      description: "Process only the information needed for security analysis without unnecessary data collection.",
      icon: LockKeyhole,
      tag: "Zero Logging",
      colSpan: "lg:col-span-1"
    }
  ];

  return (
    <section id="features" className="relative py-36 sm:py-44 bg-[#050706] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-5 mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d120f] border border-white/[0.08] text-emerald-400 text-[11px] font-mono tracking-[0.25em] uppercase font-medium">
            <span>CAPABILITIES</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12]">
            Engineered for effortless security.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light max-w-2xl mx-auto">
            SAFORA delivers comprehensive URL threat detection directly inside your browsing session with quiet precision.
          </p>
        </div>

        {/* Varied Luxury Bento Grid (8 feature cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className={`group relative rounded-3xl bg-[#080b09]/80 border border-white/[0.07] hover:border-emerald-500/30 p-8 sm:p-9 backdrop-blur-2xl transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] flex flex-col justify-between ${feat.colSpan || ''}`}
              >
                {/* Subtle top indicator */}
                <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-white/[0.06] group-hover:via-emerald-400/40 to-transparent transition-all" />

                <div>
                  {/* Top Bar with ID and Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">
                      {feat.id}
                    </span>
                    <span className="text-[10px] font-mono tracking-wider text-emerald-400/90 px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
                      {feat.tag}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-11 h-11 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center text-slate-200 group-hover:text-emerald-300 group-hover:border-emerald-500/30 transition-all duration-300 mb-6">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl font-bold text-white tracking-wide mb-3 leading-snug group-hover:text-emerald-200 transition-colors">
                    {feat.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {feat.description}
                  </p>
                </div>

                {/* Bottom line */}
                <div className="mt-8 pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400/70" />
                    <span>Real-time Active</span>
                  </span>

                  {feat.onAction && feat.actionLabel && (
                    <button
                      type="button"
                      onClick={feat.onAction}
                      className="text-emerald-300 hover:text-white flex items-center gap-1 cursor-pointer font-medium tracking-wide transition-colors"
                    >
                      <span>{feat.actionLabel}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
