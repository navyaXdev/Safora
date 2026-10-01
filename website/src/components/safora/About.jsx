import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="relative py-36 sm:py-44 bg-[#E9E5DC] dark:bg-[#0D1210] border-y border-[#D9D6CD] dark:border-white/[0.06] transition-colors duration-400 overflow-hidden">
      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 grid lg:grid-cols-12 gap-16 lg:gap-12 items-center">
        
        {/* Text */}
        <Reveal className="lg:col-span-5">
          <Eyebrow align="left">About SAFORA</Eyebrow>

          <h2 className="mt-8 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-[-0.02em] text-[#171B18] dark:text-[#F3F2EC]">
            What is SAFORA?
          </h2>

          <div className="mt-8 space-y-6 text-base sm:text-lg text-[#5E665F] dark:text-[#9BA7A0] font-light leading-[1.9] max-w-lg">
            <p>
              SAFORA is designed to help people stay safer on the web.
            </p>
            <p>
              When you visit a suspicious website, SAFORA helps identify warning signs and gives you a clear explanation so you can make a more informed decision.
            </p>
          </div>

          <div className="mt-12 h-px w-24 eyebrow-line" />

          <p className="mt-10 font-serif italic text-2xl sm:text-3xl leading-snug text-[#087A5B] dark:text-[#00A878] max-w-md font-normal">
            Simple protection.
            <br />
            Clear warnings.
            <br />
            Safer browsing.
          </p>
        </Reveal>

        {/* Abstract luxury security composition */}
        <Reveal delay={0.2} className="lg:col-span-6 lg:col-start-7">
          <div className="relative aspect-square max-w-[480px] mx-auto lg:ml-auto">
            <div className="absolute inset-[15%] rounded-full bg-[#087A5B]/[0.05] dark:bg-[#00A878]/[0.08] blur-[90px] animate-breathe pointer-events-none" />

            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute rounded-full border border-black/[0.06] dark:border-white/[0.05]"
                style={{ inset: `${i * 10}%` }}
              />
            ))}

            <motion.div
              className="absolute inset-[16%] rounded-full border border-dashed border-[#087A5B]/25 dark:border-[#00A878]/25"
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              className="absolute inset-[26%] rounded-full border border-[#087A5B]/20 dark:border-[#00A878]/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <span className="absolute -top-[4px] left-1/2 w-2 h-2 rounded-full bg-[#087A5B] dark:bg-[#00A878] shadow-[0_0_10px_rgba(8,122,91,0.6)]" />
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-[#FAF8F2] dark:bg-[#070908] flex items-center justify-center border border-[#D9D6CD] dark:border-white/[0.08] shadow-warm dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <ShieldCheck className="w-12 h-12 text-[#087A5B] dark:text-[#00A878]" strokeWidth={1.2} />
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
