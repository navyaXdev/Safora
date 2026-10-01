import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, AlertCircle, AlertTriangle, OctagonAlert } from "lucide-react";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

const levels = [
  {
    label: "Safe",
    tier: "safe",
    barColor: "bg-[#087A5B] dark:bg-[#00A878]",
    textColor: "text-[#087A5B] dark:text-[#00A878]",
    iconBg: "bg-[#087A5B]/10 dark:bg-[#00A878]/15",
    iconBorder: "border-[#087A5B]/20 dark:border-[#00A878]/30",
    hoverBorder: "hover:border-[#087A5B]/35 dark:hover:border-[#00A878]/35",
    indicatorColor: "bg-[#087A5B] dark:bg-[#00A878]",
    icon: ShieldCheck,
    text: "Looks safe based on the available signals.",
  },
  {
    label: "Low Risk",
    tier: "low",
    barColor: "bg-[#0284C7] dark:bg-[#38BDF8]",
    textColor: "text-[#0284C7] dark:text-[#38BDF8]",
    iconBg: "bg-[#0284C7]/10 dark:bg-[#38BDF8]/15",
    iconBorder: "border-[#0284C7]/20 dark:border-[#38BDF8]/30",
    hoverBorder: "hover:border-[#0284C7]/35 dark:hover:border-[#38BDF8]/35",
    indicatorColor: "bg-[#0284C7] dark:bg-[#38BDF8]",
    icon: AlertCircle,
    text: "Some signals deserve your attention.",
  },
  {
    label: "Medium Risk",
    tier: "medium",
    barColor: "bg-[#D97706] dark:bg-[#F59E0B]",
    textColor: "text-[#D97706] dark:text-[#F59E0B]",
    iconBg: "bg-[#D97706]/10 dark:bg-[#F59E0B]/15",
    iconBorder: "border-[#D97706]/20 dark:border-[#F59E0B]/30",
    hoverBorder: "hover:border-[#D97706]/35 dark:hover:border-[#F59E0B]/35",
    indicatorColor: "bg-[#D97706] dark:bg-[#F59E0B]",
    icon: AlertTriangle,
    text: "Be careful before continuing.",
  },
  {
    label: "High Risk",
    tier: "high",
    barColor: "bg-[#DC2626] dark:bg-[#EF4444]",
    textColor: "text-[#DC2626] dark:text-[#EF4444]",
    iconBg: "bg-[#DC2626]/10 dark:bg-[#EF4444]/15",
    iconBorder: "border-[#DC2626]/20 dark:border-[#EF4444]/30",
    hoverBorder: "hover:border-[#DC2626]/35 dark:hover:border-[#EF4444]/35",
    indicatorColor: "bg-[#DC2626] dark:bg-[#EF4444]",
    icon: OctagonAlert,
    text: "Strong warning — think carefully before interacting with the website.",
  },
];

export default function RiskLevels() {
  return (
    <section id="risk-levels" className="relative py-32 sm:py-40 bg-[#F0EEE7] dark:bg-[#0D1210] border-y border-[#D9D6CD] dark:border-white/[0.06] transition-colors duration-400 overflow-hidden">
      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <Eyebrow>Risk Levels</Eyebrow>
            <h2 className="mt-8 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-[-0.02em] text-[#171B18] dark:text-[#F3F2EC]">
              Understand the warning at a glance.
            </h2>
            <p className="mt-5 text-sm sm:text-base text-[#5E665F] dark:text-[#9BA7A0] max-w-xl mx-auto font-light leading-relaxed">
              Every website is evaluated against multiple threat indicators and classified into clear, actionable risk tiers.
            </p>
          </div>
        </Reveal>

        {/* Refined Semantic Scale */}
        <Reveal delay={0.12}>
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="flex gap-2">
              {levels.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex-1 h-[3px] rounded-full origin-left ${l.barColor}`}
                />
              ))}
            </div>
            
            <div className="mt-4 grid grid-cols-4 gap-1">
              {levels.map((l) => (
                <span
                  key={l.label}
                  className={`text-[10px] font-mono uppercase tracking-[0.2em] text-center font-semibold ${l.textColor}`}
                >
                  {l.label}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 4 Semantic Luxury Risk Cards */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {levels.map((l, i) => (
            <Reveal key={l.label} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`group h-full bg-[#FAF8F2] dark:bg-[#070908] rounded-[24px] p-8 border border-[#D9D6CD] dark:border-white/[0.07] ${l.hoverBorder} shadow-warm dark:shadow-md transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    {/* Semantic Icon Container */}
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center ${l.iconBg} border ${l.iconBorder} shadow-xs transition-transform duration-300 group-hover:scale-105`}
                    >
                      <l.icon className={`w-5 h-5 stroke-[1.6] ${l.textColor}`} />
                    </div>

                    {/* Semantic Indicator Dot & Label */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F0EEE7] dark:bg-white/[0.04] border border-[#D9D6CD] dark:border-white/[0.06]">
                      <span className={`w-2 h-2 rounded-full ${l.indicatorColor}`} />
                      <span className={`text-[9px] font-mono uppercase tracking-widest font-semibold ${l.textColor}`}>
                        {l.label}
                      </span>
                    </div>
                  </div>
                  
                  {/* Semantic Title */}
                  <h3 className={`font-serif text-xl sm:text-2xl font-medium mb-3 tracking-tight ${l.textColor}`}>
                    {l.label}
                  </h3>
                  
                  {/* Neutral Body Description (strictly neutral text) */}
                  <p className="text-xs sm:text-sm text-[#5E665F] dark:text-[#9BA7A0] leading-[1.85] font-light">
                    {l.text}
                  </p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Mandatory Disclaimer */}
        <Reveal delay={0.2}>
          <div className="mt-14 p-4 rounded-2xl bg-[#FAF8F2] dark:bg-[#070908] border border-[#D9D6CD] dark:border-white/[0.06] max-w-xl mx-auto text-center shadow-warm-sm">
            <p className="text-xs text-[#5E665F] dark:text-[#9BA7A0] leading-[1.85] font-light font-mono">
              SAFORA provides risk indicators to help you make informed decisions. It does not guarantee that a website is completely safe or dangerous.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
