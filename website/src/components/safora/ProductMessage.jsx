import React from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function ProductMessage() {
  return (
    <section className="relative py-44 sm:py-56 overflow-hidden bg-[#E9E5DC] dark:bg-[#070908] transition-colors duration-400">
      {/* Cinematic ambient depth */}
      <div className="absolute inset-0 grid-bg radial-fade opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#087A5B]/[0.035] dark:bg-[#00A878]/[0.05] blur-[170px] animate-aurora pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D9D6CD] dark:via-white/[0.08] to-transparent pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 sm:px-10 text-center">
        <Reveal>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-[4.2rem] leading-[1.1] tracking-[-0.025em] text-[#171B18] dark:text-[#F3F2EC] font-normal"
          >
            Because knowing the warning isn't enough.
            <span className="block mt-4 italic font-normal text-[#087A5B] dark:text-[#00A878]">You should understand it too.</span>
          </motion.h2>

          <p className="mt-10 text-base sm:text-xl text-[#5E665F] dark:text-[#9BA7A0] leading-[1.9] font-light max-w-xl mx-auto">
            SAFORA turns complicated security signals into information that everyday users can understand.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
