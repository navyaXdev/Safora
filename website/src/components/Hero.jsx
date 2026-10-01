import React from 'react';
import { ArrowRight, ChevronRight, ShieldAlert, Lock, CheckCircle2, AlertTriangle, ArrowUpRight } from 'lucide-react';

export default function Hero({ onExplore, onHowItWorks }) {
  return (
    <section id="home" className="relative min-h-[92vh] pt-36 pb-24 flex items-center overflow-hidden bg-[#050706] bg-luxury-grid">
      {/* Very subtle ambient forest green glow (controlled, not flooding) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-600/[0.07] rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-20 right-1/4 w-[400px] h-[300px] bg-teal-800/[0.04] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          {/* Left Column: Quiet Confidence Typography & Minimal Copy */}
          <div className="lg:col-span-6 space-y-8 text-left">
            
            {/* Small Badge with refined letter-spacing */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0d120f]/80 border border-white/[0.08] text-emerald-400/90 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase font-medium">
                REAL-TIME WEB PROTECTION
              </span>
            </div>

            {/* Main Headline: "Browse with confidence." visually dominant */}
            <div className="space-y-3">
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.03em] text-white leading-[1.08]">
                Browse with confidence.
              </h1>
              <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
                SAFORA watches the threats.
              </div>
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-light">
              SAFORA detects suspicious phishing URLs in real time and explains the warning in plain language — so you know not only that a website is risky, but why.
            </p>

            {/* Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a
                href="#features"
                onClick={onExplore}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-xs font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 border border-emerald-400/30 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-all duration-300 text-center"
              >
                <span>Explore SAFORA</span>
                <ArrowRight className="w-4 h-4 text-emerald-100" />
              </a>

              <a
                href="#how-it-works"
                onClick={onHowItWorks}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-xs font-semibold tracking-wider uppercase text-slate-300 hover:text-white bg-[#0a0d0b] hover:bg-[#121714] border border-white/[0.08] hover:border-white/20 transition-all duration-300 text-center"
              >
                <span>See How It Works</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Subtle Quiet Confidence Attributes */}
            <div className="pt-6 border-t border-white/[0.06] flex items-center gap-8 text-[11px] font-mono tracking-wider text-slate-400 uppercase">
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                <span>Explainable AI</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                <span>Privacy-Preserving</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                <span>Sub-50ms Guard</span>
              </div>
            </div>

          </div>

          {/* Right Column: Floating Luxury Browser Protection Interface */}
          <div className="lg:col-span-6 relative">
            
            {/* Subtle soft green ambient aura */}
            <div className="absolute -inset-4 bg-emerald-600/[0.08] rounded-3xl blur-2xl pointer-events-none -z-10" />

            {/* Floating Luxury Card Container */}
            <div className="relative rounded-3xl bg-[#0a0d0b]/85 border border-white/[0.09] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] p-6 sm:p-8 backdrop-blur-2xl animate-luxury-float">
              
              {/* Very fine scanline traversing smoothly */}
              <div className="absolute left-6 right-6 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent animate-luxury-scanline pointer-events-none" />

              {/* Floating Interface Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl overflow-hidden ring-1 ring-white/10 shadow-sm">
                    <img src="/safora-logo.png" alt="SAFORA" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-heading text-sm font-bold text-white tracking-wide block">
                      SAFORA
                    </span>
                    <span className="text-[10px] font-mono tracking-wider text-emerald-400/80 uppercase">
                      Active In-Browser Protection
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>PROTECTED</span>
                </div>
              </div>

              {/* Monitored URL Details */}
              <div className="my-6 p-4 rounded-2xl bg-[#060907]/90 border border-white/[0.05]">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 block mb-1">
                  Website checked
                </span>
                <div className="flex items-center justify-between gap-2">
                  <div className="font-mono text-xs sm:text-sm text-slate-200 truncate flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                    <span className="font-medium text-white">example-login.com</span>
                    <span className="text-slate-400 font-light">/verify</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-300/90 px-2 py-0.5 rounded bg-amber-950/40 border border-amber-500/30 shrink-0">
                    Flagged Link
                  </span>
                </div>
              </div>

              {/* Prominent Risk Rating & Classification */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                
                {/* Risk Score 87% */}
                <div className="p-4 rounded-2xl bg-[#080b09] border border-white/[0.06] flex flex-col justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-slate-400">
                    RISK SCORE
                  </span>
                  <div className="my-2">
                    <span className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                      87%
                    </span>
                  </div>
                  <div className="w-full bg-white/[0.06] h-1 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-400 to-red-500 h-full w-[87%] rounded-full shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                  </div>
                </div>

                {/* Status HIGH RISK */}
                <div className="p-4 rounded-2xl bg-[#080b09] border border-white/[0.06] flex flex-col justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-slate-400">
                    STATUS
                  </span>
                  <div className="my-2 flex items-center gap-2">
                    <ShieldAlert className="w-6 h-6 text-red-400 shrink-0" />
                    <span className="font-heading text-xl sm:text-2xl font-bold text-red-400 tracking-tight">
                      HIGH RISK
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Likely deceptive portal
                  </span>
                </div>

              </div>

              {/* Exact user requirement quote */}
              <div className="p-4 rounded-2xl bg-[#060907] border border-white/[0.06] mb-6">
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic font-normal">
                  "This website may be trying to imitate a trusted service."
                </p>
              </div>

              {/* Exact Threat Reasons as per spec */}
              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 block mb-1">
                  Detected Reasons
                </span>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.02]">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                    <span>Suspicious URL structure</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.02]">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                    <span>Missing HTTPS</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.02]">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                    <span>Suspicious domain pattern</span>
                  </div>
                </div>
              </div>

              {/* Executive Button [ Stay Safe ] */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  className="flex-1 py-3 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 border border-emerald-400/40 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all cursor-pointer text-center"
                >
                  Stay Safe
                </button>
                <button
                  type="button"
                  className="py-3 px-4 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                >
                  Ignore Warning
                </button>
              </div>

              <div className="text-[10px] text-slate-400 text-center font-mono mt-4">
                * Simulated demonstration of in-browser inspection.
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
