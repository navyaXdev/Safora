import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LOGO_URL, GITHUB_RELEASE_URL } from "@/lib/safora";
import Reveal from "./Reveal";

export default function CTA({ onExplore }) {
  const handleAction = () => {
    if (onExplore) onExplore();
    else document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="cta" className="relative py-36 sm:py-48 overflow-hidden border-t border-black/[0.06] dark:border-white/[0.06] bg-[#FAF9F5] dark:bg-[#050706] transition-colors duration-400">
      <div className="absolute inset-0 grid-bg radial-fade opacity-30 pointer-events-none" />
      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-emerald-600/[0.05] dark:bg-emerald-700/[0.07] blur-[150px] animate-aurora pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-6 sm:px-10 text-center">
        <Reveal>
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white dark:bg-[#090c0a] mb-10 overflow-hidden ring-1 ring-black/10 dark:ring-white/10 shadow-[0_15px_35px_rgba(20,25,22,0.06)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.8)]"
          >
            <img src={LOGO_URL} alt="SAFORA logo" className="h-11 w-11 object-cover" />
          </motion.div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.08] tracking-[-0.02em] text-[#141916] dark:text-white font-normal">
            Browse smarter with SAFORA.
          </h2>

          <p className="mt-6 text-base sm:text-lg text-[#4A544E] dark:text-slate-300 leading-[1.9] font-light max-w-md mx-auto">
            Stay aware. Understand the warning. Make safer choices online.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={GITHUB_RELEASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 border border-emerald-400/30 text-white text-[11px] uppercase tracking-[0.22em] font-semibold transition-all duration-500 hover:shadow-[0_0_45px_-10px_rgba(16,185,129,0.8)] cursor-pointer"
            >
              <span>Get SAFORA</span>
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1"
                strokeWidth={1.6}
              />
            </a>

            <button
              onClick={handleAction}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white dark:bg-white/[0.04] text-[#2d3630] dark:text-slate-300 hover:text-emerald-700 dark:hover:text-white text-[11px] uppercase tracking-[0.22em] font-medium border border-black/10 dark:border-white/10 hover:border-emerald-500/40 transition-all duration-500 shadow-sm cursor-pointer"
            >
              <span>Explore SAFORA</span>
            </button>
          </div>

          <div className="mt-10 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-medium">
            "You're protected now."
          </div>
        </Reveal>
      </div>
    </section>
  );
}
