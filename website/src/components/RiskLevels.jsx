import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, AlertTriangle, ShieldAlert, Info } from 'lucide-react';

export default function RiskLevels() {
  const [selectedScore, setSelectedScore] = useState(0.87);

  const tiers = [
    {
      level: "SAFE",
      range: "Risk Score < 0.30",
      min: 0.0,
      max: 0.29,
      badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-950/30",
      summary: "Legitimate structural profile with valid certificate authority and normal lexical entropy.",
      action: "Standard browsing recommended. No anomalous vectors detected."
    },
    {
      level: "LOW",
      range: "Risk Score 0.30 – 0.49",
      min: 0.30,
      max: 0.49,
      badgeColor: "text-teal-300 border-teal-500/30 bg-teal-950/30",
      summary: "Minor syntactic irregularities or newly registered top-level domain patterns.",
      action: "Safe to view, but verify the site identity before entering personal details."
    },
    {
      level: "MEDIUM",
      range: "Risk Score 0.50 – 0.69",
      min: 0.50,
      max: 0.69,
      badgeColor: "text-amber-400 border-amber-500/30 bg-amber-950/30",
      summary: "Elevated lexical ambiguity, suspicious subdomains, or unverified auth paths.",
      action: "Exercise heightened caution. Avoid inputting passwords or financial credentials."
    },
    {
      level: "HIGH",
      range: "Risk Score >= 0.70",
      min: 0.70,
      max: 1.0,
      badgeColor: "text-red-400 border-red-500/30 bg-red-950/30",
      summary: "Multiple high-confidence phishing indicators, credential spoofing patterns, or raw IP usage.",
      action: "Intervention triggered. Immediate navigation away from page strongly advised."
    }
  ];

  const currentTier = tiers.find(t => selectedScore >= t.min && selectedScore <= t.max) || tiers[3];

  return (
    <section className="relative py-36 sm:py-44 bg-[#050706] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-5 mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d120f] border border-white/[0.08] text-emerald-400 text-[11px] font-mono tracking-[0.25em] uppercase font-medium">
            <span>CALIBRATION</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12]">
            Understand your risk at a glance.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light max-w-2xl mx-auto">
            SAFORA normalizes complex multi-vector algorithmic analysis into four distinct, intuitive operational risk tiers.
          </p>
        </div>

        {/* Luxury Risk Meter Container */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#080b09]/80 border border-white/[0.08] p-8 sm:p-12 backdrop-blur-2xl shadow-2xl mb-16">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 block mb-1">
                Risk Calibration Simulation
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="font-heading text-5xl sm:text-6xl font-bold text-white tracking-tight">
                  {(selectedScore * 100).toFixed(0)}%
                </span>
                <span className="text-sm font-mono text-slate-400">
                  ({selectedScore.toFixed(2)})
                </span>
              </div>
            </div>

            {/* Current Active Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-mono font-bold tracking-wider uppercase ${currentTier.badgeColor}`}>
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              <span>{currentTier.level} RISK TIER</span>
            </div>
          </div>

          {/* Horizontal Instrument Risk Meter */}
          <div className="my-10">
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-3 uppercase tracking-wider">
              <span>0.00 (Safe)</span>
              <span>0.30</span>
              <span>0.50</span>
              <span>0.70</span>
              <span>1.00 (High)</span>
            </div>

            {/* Precision Track */}
            <div className="relative h-4 rounded-full bg-[#050706] p-0.5 border border-white/[0.08] overflow-hidden">
              <div className="absolute inset-0 flex opacity-85">
                <div className="w-[30%] bg-gradient-to-r from-emerald-600 to-emerald-400" />
                <div className="w-[20%] bg-gradient-to-r from-teal-500 to-teal-400" />
                <div className="w-[20%] bg-gradient-to-r from-amber-500 to-amber-400" />
                <div className="w-[30%] bg-gradient-to-r from-red-500 to-red-600" />
              </div>

              {/* Glowing Metallic Pin */}
              <div
                className="absolute top-0 bottom-0 w-2.5 -ml-1.25 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.9)] transition-all duration-150 z-10"
                style={{ left: `${selectedScore * 100}%` }}
              />
            </div>

            {/* Interactive Slider */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-xs font-mono text-slate-400">Interactive probe:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={selectedScore}
                onChange={(e) => setSelectedScore(parseFloat(e.target.value))}
                className="flex-1 accent-emerald-400 h-1.5 bg-[#0e1310] rounded-lg cursor-pointer border border-white/[0.06]"
              />
            </div>
          </div>

          {/* Active Evaluation Note */}
          <div className="p-6 rounded-2xl bg-[#060807] border border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
                {currentTier.range}
              </div>
              <p className="text-sm text-slate-300 font-light leading-relaxed">
                {currentTier.summary}
              </p>
            </div>
            <div className="sm:text-right shrink-0">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Browser Behavior</span>
              <span className="text-xs font-medium text-emerald-300">
                {currentTier.action}
              </span>
            </div>
          </div>

        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((t) => {
            const isCurrent = t.level === currentTier.level;
            return (
              <button
                key={t.level}
                onClick={() => setSelectedScore((t.min + t.max) / 2)}
                className={`text-left rounded-3xl p-7 transition-all duration-400 cursor-pointer border ${
                  isCurrent
                    ? 'bg-[#0a0f0c] border-emerald-500/40 shadow-[0_15px_30px_rgba(0,0,0,0.8)] -translate-y-1'
                    : 'bg-[#080b09]/80 border-white/[0.06] hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase border ${t.badgeColor}`}>
                    {t.level}
                  </span>
                </div>

                <div className="font-heading text-lg font-bold text-white mb-2">
                  {t.range}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  {t.summary}
                </p>
              </button>
            );
          })}
        </div>

        {/* Mandatory Disclaimer */}
        <div className="mt-16 p-5 rounded-2xl bg-[#070908] border border-white/[0.06] max-w-2xl mx-auto text-center">
          <p className="text-xs text-slate-400 leading-relaxed font-mono">
            ⚠️ <span className="font-semibold text-slate-300">Disclaimer:</span> "Risk scores are indicators and do not guarantee that a website is malicious or legitimate."
          </p>
        </div>

      </div>
    </section>
  );
}
