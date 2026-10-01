import React from "react";
import { motion } from "framer-motion";
import { Globe, Search, TriangleAlert, ShieldCheck, ArrowRight } from "lucide-react";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

const steps = [
  { num: "01", name: "VISIT", title: "Visit", text: "You visit a website." },
  { num: "02", name: "CHECK", title: "Check", text: "SAFORA checks for suspicious signs." },
  { num: "03", name: "UNDERSTAND", title: "Understand", text: "You receive a clear warning and explanation." },
  { num: "04", name: "DECIDE", title: "Decide", text: "You decide whether you want to continue." },
];

const flow = [
  { icon: Globe, label: "Website" },
  { icon: Search, label: "SAFORA checks" },
  { icon: TriangleAlert, label: "Clear warning" },
  { icon: ShieldCheck, label: "Your decision" },
];

export default function HowItWorks({ onOpenScanner }) {
  return (
    <section id="how-it-works" className="relative py-36 sm:py-44 bg-[#F3F2EC] dark:bg-[#080c09] border-y border-black/[0.06] dark:border-white/[0.05] transition-colors duration-400">
      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10">
        
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <Eyebrow>How It Works</Eyebrow>
            <h2 className="mt-8 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-[-0.02em] text-[#141916] dark:text-white">
              How SAFORA helps protect you
            </h2>
          </div>
        </Reveal>

        {/* 4 Simple Steps */}
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.12}>
              <div className="relative border-t border-black/10 dark:border-white/[0.08] pt-8">
                <span className="font-serif text-5xl font-light text-black/15 dark:text-white/[0.08] leading-none block">
                  {s.num}
                </span>
                
                <div className="mt-6 flex items-center gap-2 mb-3">
                  <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-emerald-700 dark:text-emerald-400 font-semibold">
                    {s.num} — {s.name}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#4A544E] dark:text-slate-300 leading-[1.85] font-light">
                  {s.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Flow Visualization */}
        <Reveal delay={0.2}>
          <div className="mt-24 bg-white dark:bg-[#090e0b]/90 rounded-[32px] px-8 sm:px-14 py-14 border border-black/[0.07] dark:border-white/[0.08] shadow-[0_15px_35px_rgba(20,25,22,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-all duration-400">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-2">
              {flow.map((node, i) => (
                <React.Fragment key={node.label}>
                  <div className="flex flex-col items-center gap-5 min-w-[150px]">
                    <div className="w-16 h-16 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-[#FAF9F5] dark:bg-white/[0.02] flex items-center justify-center text-[#141916] dark:text-slate-300 shadow-xs">
                      <node.icon className="w-6 h-6 text-emerald-700 dark:text-emerald-400" strokeWidth={1.2} />
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-[0.24em] text-[#4A544E] dark:text-slate-300 text-center font-medium">
                      {node.label}
                    </span>
                  </div>

                  {i < flow.length - 1 && (
                    <>
                      <span className="hidden lg:block h-px w-14 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
                      <span className="lg:hidden h-8 w-px bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent" />
                    </>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Live Demo Trigger */}
        {onOpenScanner && (
          <Reveal delay={0.25}>
            <div className="mt-14 text-center">
              <button
                onClick={onOpenScanner}
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 border border-emerald-400/30 shadow-[0_0_30px_rgba(16,185,129,0.25)] transition-all cursor-pointer group"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-100 group-hover:scale-110 transition-transform" strokeWidth={1.6} />
                <span>See Live Demo in Action</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </Reveal>
        )}

      </div>
    </section>
  );
}
