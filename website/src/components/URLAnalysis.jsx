import React from 'react';
import { 
  Lock, 
  Ruler, 
  MoreHorizontal, 
  Binary, 
  Hash, 
  Server, 
  FolderTree, 
  AlertTriangle, 
  HelpCircle, 
  Globe2, 
  Activity,
  Check
} from 'lucide-react';

export default function URLAnalysis() {
  const vectors = [
    {
      name: "HTTPS presence",
      icon: Lock,
      desc: "Checks if the URL utilizes secure TLS/SSL encryption or exposes plain HTTP on authentication endpoints.",
      phishPattern: "Missing SSL certificates on login prompts."
    },
    {
      name: "URL length",
      icon: Ruler,
      desc: "Measures overall character length. Excessively long URLs are often used to obfuscate true destinations.",
      phishPattern: "Padding with redundant tokens."
    },
    {
      name: "Number of dots",
      icon: MoreHorizontal,
      desc: "Tallies period characters in domain and path structures to identify nested spoofed domains.",
      phishPattern: "Deep subdomain stacking."
    },
    {
      name: "Digit count",
      icon: Binary,
      desc: "Quantifies numerical characters across the URL string used in character substitution tricks.",
      phishPattern: "Replacing letters with lookalike numbers."
    },
    {
      name: "Special character count",
      icon: Hash,
      desc: "Analyzes frequencies of hyphens, underscores, and delimiters used to mimic trusted brand names.",
      phishPattern: "Hyphen-padded brand names."
    },
    {
      name: "Raw IP detection",
      icon: Server,
      desc: "Detects IPv4 or IPv6 literals used in place of registered domain names.",
      phishPattern: "Direct IP bypassing DNS records."
    },
    {
      name: "Path depth",
      icon: FolderTree,
      desc: "Counts nested slash hierarchy levels to spot deep masquerading structures.",
      phishPattern: "Deep folder masquerading."
    },
    {
      name: "Suspicious words",
      icon: AlertTriangle,
      desc: "Inspects URL tokens for high-risk phishing keywords like 'verify', 'update', 'secure', and 'banking'.",
      phishPattern: "Urgency-inducing login prompts."
    },
    {
      name: "Query parameters",
      icon: HelpCircle,
      desc: "Scrutinizes parameters, redirects, and URI encode payloads carried in the query string.",
      phishPattern: "Base64 pre-filled victim credentials."
    },
    {
      name: "Suspicious TLD",
      icon: Globe2,
      desc: "Cross-checks top-level domains frequently abused by transient phishing campaigns.",
      phishPattern: "Low-reputation ephemeral extensions."
    },
    {
      name: "URL entropy",
      icon: Activity,
      desc: "Measures statistical randomness of character distributions to detect algorithmically generated strings.",
      phishPattern: "Randomized algorithmic domain strings."
    }
  ];

  return (
    <section className="relative py-36 sm:py-44 bg-[#050706] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-5 mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d120f] border border-white/[0.08] text-emerald-400 text-[11px] font-mono tracking-[0.25em] uppercase font-medium">
            <span>EXTRACTION</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12]">
            Every URL tells a story.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light max-w-2xl mx-auto">
            SAFORA analyzes URL-string characteristics to identify patterns associated with suspicious websites.
          </p>
        </div>

        {/* 11 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vectors.map((vec, i) => {
            const Icon = vec.icon;
            return (
              <div
                key={vec.name}
                className="group relative rounded-3xl bg-[#080b09]/80 border border-white/[0.07] hover:border-emerald-500/30 p-7 backdrop-blur-2xl transition-all duration-400 flex flex-col justify-between hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center text-slate-200 group-hover:text-emerald-300 group-hover:border-emerald-500/30 transition-all">
                      <Icon className="w-4 h-4 stroke-[1.5]" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      0{i + 1 < 10 ? `0${i + 1}` : i + 1}
                    </span>
                  </div>

                  <h3 className="font-heading text-base font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {vec.name}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-light mb-4">
                    {vec.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.05]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                    Pattern
                  </span>
                  <p className="text-[11px] text-emerald-400/90 font-mono">
                    {vec.phishPattern}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
