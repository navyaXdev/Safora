import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";
import { LOGO_URL, GITHUB_RELEASE_URL } from "@/lib/safora";
import Eyebrow from "./Eyebrow";

export default function Hero({ onOpenScanner }) {
  const go = (id) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-[95vh] flex items-center pt-36 pb-28 overflow-hidden bg-[#FAF9F5] dark:bg-[#050706] transition-colors duration-400">
      {/* Editorial backdrop accents */}
      <div className="absolute inset-0 grid-bg radial-fade opacity-30 pointer-events-none" />
      <div className="absolute -top-48 left-[20%] w-[700px] h-[700px] rounded-full bg-emerald-600/[0.04] dark:bg-emerald-700/[0.07] blur-[170px] animate-aurora pointer-events-none" />
      <div className="absolute -bottom-36 right-[5%] w-[600px] h-[600px] rounded-full bg-emerald-700/[0.03] dark:bg-emerald-900/[0.1] blur-[160px] animate-aurora pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#FAF9F5] dark:to-[#050706] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 w-full grid lg:grid-cols-12 gap-16 lg:gap-12 items-center">
        
        {/* Editorial Copy Column */}
        <div className="lg:col-span-5 text-left">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Eyebrow align="left">Real-Time Web Protection</Eyebrow>

            {/* High-Contrast Editorial Serif Headline */}
            <h1 className="mt-8 font-serif text-[2.75rem] xs:text-5xl sm:text-6xl lg:text-[4.2rem] xl:text-[5rem] leading-[1.02] tracking-[-0.03em] text-[#141916] dark:text-white font-normal">
              Browse with
              <br />
              <span className="italic font-normal text-emerald-700 dark:text-emerald-400">
                confidence.
              </span>
            </h1>

            <p className="mt-7 text-base sm:text-xl text-[#333D37] dark:text-slate-200 font-light leading-relaxed max-w-md">
              SAFORA helps you spot suspicious websites before they become a problem.
            </p>

            <p className="mt-3.5 text-xs sm:text-[15px] text-[#55635B] dark:text-slate-400 leading-relaxed max-w-md font-light">
              Your everyday browsing deserves an extra layer of protection. SAFORA helps identify potentially risky websites and gives you clear, easy-to-understand warnings.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3.5">
              <a
                href={GITHUB_RELEASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 border border-emerald-400/30 text-white text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.7)] cursor-pointer"
              >
                <span>Get SAFORA</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.6} />
              </a>
              
              <button
                onClick={() => onOpenScanner ? onOpenScanner() : go("#how-it-works")}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-white dark:bg-white/[0.04] text-[#2d3630] dark:text-slate-300 hover:text-emerald-700 dark:hover:text-white text-[11px] uppercase tracking-[0.2em] font-medium border border-black/10 dark:border-white/10 hover:border-emerald-500/40 transition-all duration-500 shadow-sm cursor-pointer"
              >
                See How It Works
              </button>
            </div>
          </motion.div>
        </div>

        {/* Dual-Theme Browser Security Visual */}
        <div className="lg:col-span-7 lg:pl-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <BrowserVisual onAction={() => onOpenScanner ? onOpenScanner() : go("#how-it-works")} />
          </motion.div>
        </div>

      </div>
    </section>
  );
}

function BrowserVisual({ onAction }) {
  return (
    <div className="relative animate-drift">
      {/* Subtle green ambient lighting */}
      <div className="absolute -inset-10 bg-emerald-500/[0.06] dark:bg-emerald-600/[0.08] blur-[110px] rounded-full pointer-events-none" />

      {/* Main Browser Mockup Card */}
      <div className="relative rounded-[30px] overflow-hidden bg-white dark:bg-[#090c0a]/90 border border-black/[0.08] dark:border-white/[0.08] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] dark:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)] transition-all duration-400">
        
        {/* Browser Chrome Header */}
        <div className="flex items-center gap-4 px-6 py-4 border-b border-black/[0.06] dark:border-white/[0.06] bg-[#F3F2EC] dark:bg-[#070a08]/80 transition-colors">
          <div className="flex gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-black/15 dark:bg-white/[0.12]" />
            <span className="w-2.5 h-2.5 rounded-full bg-black/15 dark:bg-white/[0.12]" />
            <span className="w-2.5 h-2.5 rounded-full bg-black/15 dark:bg-white/[0.12]" />
          </div>
          
          <div className="flex-1 flex items-center justify-center gap-2.5 px-4 py-1.5 rounded-full bg-white dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] max-w-sm mx-auto shadow-xs">
            <Lock className="w-3 h-3 text-[#55635B] dark:text-slate-400" strokeWidth={1.5} />
            <span className="text-[11px] font-mono text-[#2d3630] dark:text-slate-300 truncate">example-login.com</span>
          </div>

          <div className="w-6 h-6 rounded-lg overflow-hidden ring-1 ring-black/10 dark:ring-white/10 hidden sm:block shadow-xs">
            <img src={LOGO_URL} alt="SAFORA" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Inner Security Card */}
        <div className="relative p-8 sm:p-11 bg-white/98 dark:bg-[#090c0a]/90 transition-colors">
          {/* Subtle scanning beam */}
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent animate-scan pointer-events-none" />

          {/* Product Header inside Browser */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} alt="SAFORA logo" className="h-6 w-6 rounded-md shadow-xs" />
              <span className="font-serif text-sm font-bold tracking-[0.2em] text-[#121614] dark:text-white">SAFORA</span>
            </div>
            
            <span className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-[0.24em] text-emerald-700 dark:text-emerald-400/90 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-breathe" />
              Website checked
            </span>
          </div>

          {/* Risk Readout (87% Arc Gauge + High Risk Badge) */}
          <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-10">
            
            {/* Circular Gauge */}
            <div className="relative w-[124px] h-[124px] shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <defs>
                  <linearGradient id="riskArc" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" className="text-black/[0.06] dark:text-white/[0.06]" strokeWidth="3" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="url(#riskArc)"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeDasharray={264}
                  initial={{ strokeDashoffset: 264 }}
                  animate={{ strokeDashoffset: 264 - 264 * 0.87 }}
                  transition={{ duration: 1.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-serif text-3xl font-bold text-[#121614] dark:text-white leading-none">87%</span>
                <span className="mt-1 text-[9px] uppercase tracking-[0.25em] font-mono text-[#6e7b73] dark:text-slate-400">Risk</span>
              </div>
            </div>

            {/* Status Details */}
            <div className="text-center sm:text-left space-y-3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-500/30 bg-red-50 dark:bg-red-950/30"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] uppercase font-mono tracking-[0.24em] text-red-700 dark:text-red-300 font-semibold">
                  High Risk
                </span>
              </motion.div>
              
              <p className="text-sm font-mono text-[#2d3630] dark:text-slate-300">
                example-login.com<span className="text-[#6e7b73] dark:text-slate-400">/verify</span>
              </p>
            </div>

          </div>

          {/* Plain-English Explanation */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9 }}
            className="mt-10 pt-8 border-t border-black/[0.06] dark:border-white/[0.06]"
          >
            <p className="font-serif text-lg sm:text-xl text-[#222a25] dark:text-slate-100 leading-snug max-w-md italic font-normal">
              &ldquo;This website may be trying to imitate a trusted service.&rdquo;
            </p>
            
            <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3.5">
              <button
                onClick={onAction}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 border border-emerald-400/30 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-100" strokeWidth={1.5} />
                <span>See How It Works</span>
              </button>
              
              <span className="text-xs text-[#5e6b62] dark:text-slate-400 font-mono">
                Flagged for deceptive patterns
              </span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Floating Quiet Confidence Stamp */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1.0 }}
        className="hidden sm:flex absolute -bottom-4 -left-4 bg-white dark:bg-[#090c0a] rounded-2xl px-5 py-3.5 items-center gap-3 shadow-lg dark:shadow-xl border border-black/[0.08] dark:border-white/[0.08]"
      >
        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
        <div>
          <p className="text-xs font-medium text-[#141916] dark:text-white tracking-wide">You're protected</p>
          <p className="text-[9px] uppercase font-mono tracking-[0.24em] text-emerald-700 dark:text-emerald-400/80">by SAFORA</p>
        </div>
      </motion.div>
    </div>
  );
}
