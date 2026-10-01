import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck, Search, MousePointerClick, Gauge, MessageSquareText, ShieldAlert, KeyRound, Lock, ArrowUpRight
} from "lucide-react";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

const spotlight = [
  {
    icon: ShieldCheck,
    title: "Automatic Website Scanning",
    text: "SAFORA automatically checks websites while you browse, without requiring you to manually check every link.",
  },
  {
    icon: Gauge,
    title: "Clear Risk Levels",
    text: "Understand whether a website appears safe, low risk, medium risk or high risk at a single glance.",
  },
];

const supporting = [
  { 
    icon: Search, 
    title: "Manual URL Scanner", 
    text: "Want to check a URL before opening it? SAFORA lets you inspect links safely in advance.",
    hasAction: true 
  },
  { 
    icon: MousePointerClick, 
    title: "Right-Click Scanning", 
    text: "Quickly scan any link directly from your browser context menu." 
  },
  { 
    icon: MessageSquareText, 
    title: "Clear Threat Explanations", 
    text: "SAFORA explains the warning in simple, human language instead of showing only a generic alert." 
  },
  { 
    icon: ShieldAlert, 
    title: "On-Screen Warnings", 
    text: "When a website appears highly risky, SAFORA displays a clear on-page warning to help you pause." 
  },
  { 
    icon: KeyRound, 
    title: "Extra Protection for Passwords", 
    text: "If a risky website is detected and you attempt to enter sensitive details, SAFORA triggers an additional alert." 
  },
  { 
    icon: Lock, 
    title: "Privacy-Focused Design", 
    text: "SAFORA is engineered to process only what is needed for the security check with zero unnecessary tracking." 
  },
];

export default function Features({ onOpenScanner }) {
  return (
    <section id="features" className="relative py-36 sm:py-44 bg-[#F7F7F2] dark:bg-[#050706] transition-colors duration-400">
      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10">
        
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <Eyebrow>Features</Eyebrow>
            <h2 className="mt-8 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-[-0.02em] text-[#121614] dark:text-white">
              Everything you need for safer browsing.
            </h2>
          </div>
        </Reveal>

        {/* Wide Spotlight Cards */}
        <div className="mt-20 grid lg:grid-cols-2 gap-8">
          {spotlight.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.14}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-full bg-white dark:bg-[#090c0a]/90 rounded-[32px] p-10 sm:p-14 overflow-hidden border border-black/[0.07] dark:border-white/[0.08] shadow-[0_15px_35px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-all duration-400"
              >
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-emerald-600/[0.06] blur-[80px] pointer-events-none" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl border border-emerald-500/20 dark:border-emerald-400/20 bg-emerald-50 dark:bg-emerald-500/[0.06] flex items-center justify-center mb-8 shadow-xs">
                    <f.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" strokeWidth={1.3} />
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#121614] dark:text-white mb-4">
                    {f.title}
                  </h3>
                  <p className="text-base text-[#4e5952] dark:text-slate-300 leading-[1.85] font-light max-w-md">
                    {f.text}
                  </p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Minimal Supporting Grid */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {supporting.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group h-full rounded-[28px] border border-black/[0.06] dark:border-white/[0.06] hover:border-emerald-500/40 bg-white dark:bg-[#080b09]/80 p-8 backdrop-blur-xl shadow-xs dark:shadow-md transition-all duration-400 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-7">
                    <div className="w-10 h-10 rounded-2xl bg-[#F4F5F0] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] flex items-center justify-center text-[#4e5952] dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 group-hover:border-emerald-500/30 transition-all duration-300 shadow-xs">
                      <f.icon className="w-4 h-4 stroke-[1.5]" />
                    </div>
                  </div>
                  
                  <h3 className="font-serif text-xl font-medium text-[#121614] dark:text-white mb-2 leading-snug">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5e6b62] dark:text-slate-400 leading-[1.8] font-light">
                    {f.text}
                  </p>
                </div>

                {f.hasAction && onOpenScanner && (
                  <div className="mt-6 pt-4 border-t border-black/[0.06] dark:border-white/[0.05]">
                    <button
                      onClick={onOpenScanner}
                      className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-300 hover:text-emerald-700 dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Try Scanner Tool</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </motion.div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
