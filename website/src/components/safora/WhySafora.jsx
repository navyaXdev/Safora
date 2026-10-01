import React from "react";
import { motion } from "framer-motion";
import { SearchCheck, MessageSquareText, CheckCircle2 } from "lucide-react";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

const cards = [
  {
    num: "01",
    icon: SearchCheck,
    title: "Spot the Risk",
    text: "SAFORA helps identify websites that may be suspicious.",
  },
  {
    num: "02",
    icon: MessageSquareText,
    title: "Understand the Warning",
    text: "Instead of confusing technical messages, SAFORA gives you clear reasons to be cautious.",
  },
  {
    num: "03",
    icon: CheckCircle2,
    title: "Make Better Decisions",
    text: "Get useful information before entering passwords, personal details or other sensitive information.",
  },
];

export default function WhySafora() {
  return (
    <section id="why-safora" className="relative py-36 sm:py-44 bg-[#F4F5F0] dark:bg-[#070a08]/60 border-y border-black/[0.06] dark:border-white/[0.05] transition-colors duration-400">
      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10">
        
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow align="left">Why SAFORA</Eyebrow>
            <h2 className="mt-8 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-[-0.02em] text-[#121614] dark:text-white">
              Online threats aren't always easy to spot.
            </h2>
            <p className="mt-8 text-base sm:text-lg text-[#4e5952] dark:text-slate-300 font-light leading-[1.9] max-w-2xl">
              Phishing websites can look surprisingly similar to websites you already trust. A familiar-looking login page or a convincing link can make it difficult to know what's safe.
            </p>
            <p className="mt-4 text-base sm:text-lg text-emerald-600 dark:text-emerald-300 font-normal max-w-2xl">
              SAFORA adds an extra layer of awareness while you browse.
            </p>
          </div>
        </Reveal>

        {/* 3 Luxury Numbered Cards */}
        <div className="mt-24 grid md:grid-cols-3 gap-8 sm:gap-12">
          {cards.map((c, i) => (
            <Reveal key={c.num} delay={i * 0.14}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group border-t border-black/10 dark:border-white/[0.08] hover:border-emerald-500/40 pt-8 transition-colors duration-400"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-sm tracking-[0.25em] text-emerald-600 dark:text-emerald-400/70 font-semibold">{c.num}</span>
                  <div className="w-10 h-10 rounded-2xl bg-white dark:bg-white/[0.02] border border-black/10 dark:border-white/[0.06] flex items-center justify-center text-[#4e5952] dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 group-hover:border-emerald-500/30 shadow-xs transition-all duration-300">
                    <c.icon className="w-4 h-4 stroke-[1.5]" />
                  </div>
                </div>
                
                <h3 className="font-serif text-2xl font-medium text-[#121614] dark:text-white mb-3">
                  {c.title}
                </h3>
                
                <p className="text-sm text-[#5e6b62] dark:text-slate-400 leading-[1.85] font-light">
                  {c.text}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
