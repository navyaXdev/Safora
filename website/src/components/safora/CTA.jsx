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
    <section id="cta" className="relative py-36 sm:py-48 overflow-hidden border-t border-[#D9D6CD] dark:border-white/[0.06] bg-[#E8ECE6] dark:bg-[#0D1210] transition-colors duration-400">
      <div className="absolute inset-0 grid-bg radial-fade opacity-25 pointer-events-none" />
      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#087A5B]/[0.04] dark:bg-[#00A878]/[0.06] blur-[150px] animate-aurora pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-6 sm:px-10 text-center">
        <Reveal>
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#FAF8F2] dark:bg-[#070908] mb-10 overflow-hidden ring-1 ring-black/[0.08] dark:ring-white/[0.08] shadow-warm dark:shadow-[0_20px_45px_rgba(0,0,0,0.8)]"
          >
            <img src={LOGO_URL} alt="SAFORA logo" className="h-11 w-11 object-cover" />
          </motion.div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.08] tracking-[-0.02em] text-[#171B18] dark:text-[#F3F2EC] font-normal">
            Browse smarter with SAFORA.
          </h2>

          <p className="mt-6 text-base sm:text-lg text-[#5E665F] dark:text-[#9BA7A0] leading-[1.9] font-light max-w-md mx-auto">
            Stay aware. Understand the warning. Make safer choices online.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={GITHUB_RELEASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-[#087A5B] hover:bg-[#07503F] dark:bg-[#00A878] dark:hover:bg-[#087A5B] text-[#FAF8F2] dark:text-white text-[11px] uppercase tracking-[0.22em] font-semibold transition-all duration-400 shadow-[0_4px_20px_rgba(8,122,91,0.22)] dark:shadow-[0_4px_24px_rgba(0,168,120,0.25)] cursor-pointer"
            >
              <span>Get SAFORA</span>
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform duration-400 group-hover:translate-x-1"
                strokeWidth={1.6}
              />
            </a>

            <button
              onClick={handleAction}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#FAF8F2] hover:bg-[#F0EEE7] dark:bg-[#070908] text-[#171B18] dark:text-[#F3F2EC] hover:text-[#087A5B] dark:hover:text-white text-[11px] uppercase tracking-[0.22em] font-medium border border-[#D9D6CD] dark:border-white/10 hover:border-[#087A5B]/40 dark:hover:border-[#00A878]/40 transition-all duration-400 shadow-warm-sm cursor-pointer"
            >
              <span>Explore SAFORA</span>
            </button>
          </div>

          <div className="mt-10 text-xs font-mono text-[#087A5B] dark:text-[#00A878] font-medium">
            "You're protected now."
          </div>
        </Reveal>
      </div>
    </section>
  );
}
