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
    <section id="how-it-works" className="relative py-36 sm:py-44 bg-[#E9E5DC] dark:bg-[#070908] transition-colors duration-400">
      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10">
        
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <Eyebrow>How It Works</Eyebrow>
            <h2 className="mt-8 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-[-0.02em] text-[#171B18] dark:text-[#F3F2EC]">
              How SAFORA helps protect you
            </h2>
          </div>
        </Reveal>

        {/* 4 Simple Steps */}
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.12}>
              <div className="relative border-t border-[#D9D6CD] dark:border-white/[0.08] pt-8">
                <span className="font-serif text-5xl font-light text-[#D9D6CD] dark:text-white/[0.08] leading-none block">
                  {s.num}
                </span>
                
                <div className="mt-6 flex items-center gap-2 mb-3">
                  <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-[#087A5B] dark:text-[#00A878] font-semibold">
                    {s.num} — {s.name}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#5E665F] dark:text-[#9BA7A0] leading-[1.85] font-light">
                  {s.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Flow Visualization */}
        <Reveal delay={0.2}>
          <div className="mt-24 bg-[#FAF8F2] dark:bg-[#0D1210] rounded-[28px] px-8 sm:px-14 py-14 border border-[#D9D6CD] dark:border-white/[0.08] shadow-warm dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-all duration-400">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-2">
              {flow.map((node, i) => (
                <React.Fragment key={node.label}>
                  <div className="flex flex-col items-center gap-5 min-w-[150px]">
                    <div className="w-16 h-16 rounded-full border border-[#D9D6CD] dark:border-white/[0.08] bg-[#F0EEE7] dark:bg-[#111814] flex items-center justify-center text-[#171B18] dark:text-[#F3F2EC] shadow-xs">
                      <node.icon className="w-6 h-6 text-[#087A5B] dark:text-[#00A878]" strokeWidth={1.2} />
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-[0.24em] text-[#5E665F] dark:text-[#9BA7A0] text-center font-medium">
                      {node.label}
                    </span>
                  </div>

                  {i < flow.length - 1 && (
                    <>
                      <span className="hidden lg:block h-px w-14 bg-gradient-to-r from-transparent via-[#087A5B]/30 dark:via-[#00A878]/30 to-transparent" />
                      <span className="lg:hidden h-8 w-px bg-gradient-to-b from-transparent via-[#087A5B]/30 dark:via-[#00A878]/30 to-transparent" />
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
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#FAF8F2] dark:text-white bg-[#087A5B] hover:bg-[#07503F] dark:bg-[#00A878] dark:hover:bg-[#087A5B] border border-[#087A5B]/30 dark:border-[#00A878]/30 shadow-[0_4px_20px_rgba(8,122,91,0.22)] dark:shadow-[0_4px_24px_rgba(0,168,120,0.25)] transition-all cursor-pointer group"
              >
                <ShieldCheck className="w-4 h-4 text-[#FAF8F2] dark:text-white group-hover:scale-110 transition-transform" strokeWidth={1.6} />
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
