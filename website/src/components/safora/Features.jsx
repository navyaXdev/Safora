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
    <section id="features" className="relative py-36 sm:py-44 bg-[#E8ECE6] dark:bg-[#0D1210] border-y border-[#D9D6CD] dark:border-white/[0.06] transition-colors duration-400">
      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10">
        
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <Eyebrow>Features</Eyebrow>
            <h2 className="mt-8 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-[-0.02em] text-[#171B18] dark:text-[#F3F2EC]">
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
                className="group relative h-full bg-[#FAF8F2] dark:bg-[#070908] rounded-[28px] p-10 sm:p-14 overflow-hidden border border-[#D9D6CD] dark:border-white/[0.08] shadow-warm dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-all duration-400"
              >
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#087A5B]/[0.04] dark:bg-[#00A878]/[0.05] blur-[80px] pointer-events-none" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl border border-[#087A5B]/20 dark:border-[#00A878]/25 bg-[#F0EEE7] dark:bg-[#111814] flex items-center justify-center mb-8 shadow-xs">
                    <f.icon className="w-6 h-6 text-[#087A5B] dark:text-[#00A878]" strokeWidth={1.3} />
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#171B18] dark:text-[#F3F2EC] mb-4">
                    {f.title}
                  </h3>
                  <p className="text-base text-[#5E665F] dark:text-[#9BA7A0] leading-[1.85] font-light max-w-md">
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
                className="group h-full rounded-[24px] border border-[#D9D6CD] dark:border-white/[0.06] hover:border-[#087A5B]/40 dark:hover:border-[#00A878]/40 bg-[#FAF8F2] dark:bg-[#070908] p-8 shadow-warm-sm dark:shadow-md transition-all duration-400 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-7">
                    <div className="w-10 h-10 rounded-2xl bg-[#F0EEE7] dark:bg-[#111814] border border-[#D9D6CD] dark:border-white/[0.06] flex items-center justify-center text-[#5E665F] dark:text-[#9BA7A0] group-hover:text-[#087A5B] dark:group-hover:text-[#00A878] group-hover:border-[#087A5B]/40 dark:group-hover:border-[#00A878]/40 transition-all duration-300 shadow-xs">
                      <f.icon className="w-4 h-4 stroke-[1.5]" />
                    </div>
                  </div>
                  
                  <h3 className="font-serif text-xl font-medium text-[#171B18] dark:text-[#F3F2EC] mb-2 leading-snug">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5E665F] dark:text-[#9BA7A0] leading-[1.8] font-light">
                    {f.text}
                  </p>
                </div>

                {f.hasAction && onOpenScanner && (
                  <div className="mt-6 pt-4 border-t border-[#D9D6CD] dark:border-white/[0.05]">
                    <button
                      onClick={onOpenScanner}
                      className="text-xs font-mono font-medium text-[#087A5B] dark:text-[#00A878] hover:text-[#07503F] dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
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
