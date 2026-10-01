import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, AlertCircle, AlertTriangle, OctagonAlert } from "lucide-react";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

const levels = [
  {
    label: "Safe",
    color: "#10b981",
    icon: ShieldCheck,
    text: "Looks safe based on the available signals.",
  },
  {
    label: "Low Risk",
    color: "#2dd4bf",
    icon: AlertCircle,
    text: "Some signals deserve your attention.",
  },
  {
    label: "Medium Risk",
    color: "#fbbf24",
    icon: AlertTriangle,
    text: "Be careful before continuing.",
  },
  {
    label: "High Risk",
    color: "#f87171",
    icon: OctagonAlert,
    text: "Strong warning — think carefully before interacting with the website.",
  },
];

export default function RiskLevels() {
  return (
    <section id="risk-levels" className="relative py-36 sm:py-44 bg-[#F7F7F2] dark:bg-[#050706] transition-colors duration-400 overflow-hidden">
      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10">
        
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <Eyebrow>Risk Levels</Eyebrow>
            <h2 className="mt-8 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-[-0.02em] text-[#121614] dark:text-white">
              Understand the warning at a glance.
            </h2>
          </div>
        </Reveal>

        {/* Refined Luxury Scale */}
        <Reveal delay={0.12}>
          <div className="mt-20 max-w-2xl mx-auto">
            <div className="flex gap-2">
              {levels.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.0, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 h-[3px] rounded-full origin-left"
                  style={{ backgroundColor: l.color, opacity: 0.8 }}
                />
              ))}
            </div>
            
            <div className="mt-5 grid grid-cols-4 gap-1">
              {levels.map((l) => (
                <span
                  key={l.label}
                  className="text-[10px] font-mono uppercase tracking-[0.2em] text-center font-medium"
                  style={{ color: l.color }}
                >
                  {l.label}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 4 Luxury Risk Cards */}
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {levels.map((l, i) => (
            <Reveal key={l.label} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group h-full bg-white dark:bg-[#090c0a]/90 rounded-[28px] p-8 border border-black/[0.07] dark:border-white/[0.07] shadow-sm dark:shadow-md transition-all duration-400"
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center mb-8"
                  style={{ backgroundColor: `${l.color}14`, border: `1px solid ${l.color}33` }}
                >
                  <l.icon className="w-5 h-5 stroke-[1.5]" style={{ color: l.color }} />
                </div>
                
                <h3
                  className="font-serif text-xl font-medium mb-3 tracking-wide"
                  style={{ color: l.color }}
                >
                  {l.label}
                </h3>
                
                <p className="text-xs sm:text-sm text-[#4e5952] dark:text-slate-300 leading-[1.85] font-light">
                  {l.text}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Mandatory Disclaimer */}
        <Reveal delay={0.2}>
          <div className="mt-16 p-4 rounded-2xl bg-[#F4F5F0] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.06] max-w-xl mx-auto text-center shadow-xs">
            <p className="text-xs text-[#5e6b62] dark:text-slate-400 leading-[1.85] font-light font-mono">
              SAFORA provides risk indicators to help you make informed decisions. It does not guarantee that a website is completely safe or dangerous.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
