import React, { useRef } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";
import { LOGO_URL, GITHUB_RELEASE_URL } from "@/lib/safora";
import Eyebrow from "./Eyebrow";

export default function Hero({ onOpenScanner }) {
  const go = (id) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-[96vh] flex items-center pt-36 pb-28 overflow-hidden bg-[#F0EEE7] dark:bg-[#070908] transition-colors duration-400">
      {/* Subtle editorial backdrop accents */}
      <div className="absolute inset-0 grid-bg radial-fade opacity-25 pointer-events-none" />
      <div className="absolute -top-48 left-[18%] w-[680px] h-[680px] rounded-full bg-[#087A5B]/[0.035] dark:bg-[#00A878]/[0.05] blur-[180px] animate-aurora pointer-events-none" />
      <div className="absolute -bottom-36 right-[5%] w-[580px] h-[580px] rounded-full bg-[#064D3D]/[0.025] dark:bg-[#087A5B]/[0.06] blur-[170px] animate-aurora pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-[#F0EEE7] dark:to-[#070908] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 w-full grid lg:grid-cols-12 gap-16 lg:gap-12 items-center">
        
        {/* Editorial Copy Column */}
        <div className="lg:col-span-5 text-left">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Eyebrow align="left">Real-Time Web Protection</Eyebrow>

            {/* High-Contrast Editorial Serif Headline */}
            <h1 className="mt-8 font-serif text-[3.2rem] xs:text-[3.75rem] sm:text-6xl lg:text-[4.5rem] xl:text-[5.25rem] leading-[1.0] tracking-[-0.03em] text-[#171B18] dark:text-[#F3F2EC] font-normal">
              Browse with
              <br />
              <span className="italic font-normal text-[#087A5B] dark:text-[#00A878]">
                confidence.
              </span>
            </h1>

            <p className="mt-8 text-base sm:text-lg text-[#5E665F] dark:text-[#9BA7A0] font-light leading-relaxed max-w-md">
              SAFORA helps you spot suspicious websites before they become a problem.
            </p>

            <p className="mt-3.5 text-xs sm:text-[14px] text-[#5E665F] dark:text-[#9BA7A0] leading-relaxed max-w-md font-light">
              Your everyday browsing deserves an extra layer of protection. SAFORA identifies potentially risky websites and gives you clear, easy-to-understand warnings.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3.5">
              <a
                href={GITHUB_RELEASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#087A5B] hover:bg-[#07503F] dark:bg-[#00A878] dark:hover:bg-[#087A5B] text-[#FAF8F2] dark:text-white text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-400 shadow-[0_4px_20px_rgba(8,122,91,0.22)] dark:shadow-[0_4px_24px_rgba(0,168,120,0.25)] cursor-pointer"
              >
                <span>Get SAFORA</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-400 group-hover:translate-x-1" strokeWidth={1.6} />
              </a>
              
              <button
                onClick={() => onOpenScanner ? onOpenScanner() : go("#how-it-works")}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#FAF8F2] hover:bg-[#E9E5DC] dark:bg-[#0D1210] dark:hover:bg-white/[0.05] text-[#171B18] dark:text-[#F3F2EC] text-[11px] uppercase tracking-[0.2em] font-medium border border-[#D9D6CD] dark:border-white/10 hover:border-[#087A5B]/40 dark:hover:border-[#00A878]/40 transition-all duration-400 shadow-warm-sm cursor-pointer"
              >
                See How It Works
              </button>
            </div>
          </motion.div>
        </div>

        {/* Dual-Theme Browser Security Visual */}
        <div className="lg:col-span-7 lg:pl-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <BrowserVisual onAction={() => onOpenScanner ? onOpenScanner() : go("#how-it-works")} />
          </motion.div>
        </div>

      </div>
    </section>
  );
}

function BrowserVisual({ onAction }) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef(null);

  // Micro 3D tilt tracking with spring physics (zero React re-renders)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 26, stiffness: 180 };
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [1.2, -1.2]), springConfig);
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-1.2, 1.2]), springConfig);
  const hoverTranslateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2.5, 2.5]), springConfig);
  const hoverTranslateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-2.5, 2.5]), springConfig);

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative select-none"
      style={{ perspective: 1200 }}
    >
      {/* Subtle ambient backdrop lighting */}
      <div className="absolute -inset-10 bg-[#087A5B]/[0.04] dark:bg-[#00A878]/[0.06] blur-[120px] rounded-full pointer-events-none" />

      {/* Cinematic Floating Ground Shadow (Softens & expands when floating up, tightens when down) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                scaleX: [1.06, 0.94, 1.06],
                scaleY: [1.08, 0.92, 1.08],
                opacity: [0.32, 0.58, 0.32],
                y: [6, -4, 6],
              }
        }
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-6 inset-x-12 h-14 bg-[#171B18]/[0.09] dark:bg-black/70 blur-2xl rounded-full pointer-events-none"
        style={{ willChange: "transform, opacity" }}
      />

      {/* Floating Browser Object (Entire window moves gently as one object) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [-8, 8, -8],
                rotateZ: [-0.3, 0.3, -0.3],
                scale: [1, 1.005, 1],
              }
        }
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          rotateX: shouldReduceMotion ? 0 : tiltX,
          rotateY: shouldReduceMotion ? 0 : tiltY,
          x: shouldReduceMotion ? 0 : hoverTranslateX,
          translateY: shouldReduceMotion ? 0 : hoverTranslateY,
          willChange: "transform",
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* Main Browser Mockup Card */}
        <div className="relative rounded-[28px] overflow-hidden bg-[#FAF8F2] dark:bg-[#0D1210] border border-[#D9D6CD] dark:border-white/[0.08] shadow-warm dark:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)] transition-colors duration-400">
          
          {/* Browser Chrome Header */}
          <div className="flex items-center gap-4 px-6 py-4 border-b border-[#D9D6CD] dark:border-white/[0.06] bg-[#E9E5DC] dark:bg-[#111814] transition-colors">
            <div className="flex gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-black/15 dark:bg-white/[0.12]" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/15 dark:bg-white/[0.12]" />
              <span className="w-2.5 h-2.5 rounded-full bg-black/15 dark:bg-white/[0.12]" />
            </div>
            
            <div className="flex-1 flex items-center justify-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FAF8F2] dark:bg-white/[0.03] border border-[#D9D6CD] dark:border-white/[0.06] max-w-sm mx-auto shadow-xs">
              <Lock className="w-3 h-3 text-[#5E665F] dark:text-[#9BA7A0]" strokeWidth={1.5} />
              <span className="text-[11px] font-mono text-[#171B18] dark:text-[#F3F2EC] truncate">example-login.com</span>
            </div>

            <div className="w-6 h-6 rounded-lg overflow-hidden ring-1 ring-black/10 dark:ring-white/10 hidden sm:block shadow-xs">
              <img src={LOGO_URL} alt="SAFORA" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Inner Security Card — 100% Stable Content (No scanning, no scan lines) */}
          <div className="relative p-8 sm:p-11 bg-[#FAF8F2] dark:bg-[#0D1210] transition-colors">
            
            {/* Product Header inside Browser */}
            <div className="flex items-center justify-between gap-4 mb-9 sm:mb-10">
              {/* Clean Brand Lockup: [SAFORA ICON] SAFORA */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="relative w-7 h-7 sm:w-[30px] sm:h-[30px] rounded-[9px] sm:rounded-[10px] overflow-hidden ring-1 ring-black/[0.08] dark:ring-white/[0.08] shadow-xs shrink-0 bg-[#E9E5DC] dark:bg-[#111814]">
                  <img
                    src={LOGO_URL}
                    alt="SAFORA logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-serif text-[1.15rem] sm:text-[1.28rem] font-bold tracking-[0.03em] leading-none text-[#171B18] dark:text-[#F3F2EC]">
                  SAFORA
                </span>
              </div>
              
              {/* Balanced Security Status Tag — Clean & Steady */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E9E5DC]/80 dark:bg-white/[0.04] border border-[#D9D6CD] dark:border-white/[0.07] shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#087A5B] dark:bg-[#00A878]" />
                <span className="text-[10px] uppercase font-mono tracking-[0.22em] text-[#087A5B] dark:text-[#00A878] font-semibold leading-none">
                  Website checked
                </span>
              </div>
            </div>

            {/* Risk Readout (87% Arc Gauge + High Risk Badge) — Completely Stable */}
            <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-10">
              
              {/* Circular Gauge */}
              <div className="relative w-[124px] h-[124px] shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <defs>
                    <linearGradient id="riskArc" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#d97706" />
                      <stop offset="100%" stopColor="#dc2626" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" className="text-black/[0.06] dark:text-white/[0.06]" strokeWidth="3" />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="url(#riskArc)"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeDasharray={264}
                    strokeDashoffset={264 - 264 * 0.87}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-serif text-3xl font-bold text-[#171B18] dark:text-[#F3F2EC] leading-none">87%</span>
                  <span className="mt-1 text-[9px] uppercase tracking-[0.25em] font-mono text-[#727A73] dark:text-[#9BA7A0]">Risk</span>
                </div>
              </div>

              {/* Status Details */}
              <div className="text-center sm:text-left space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#DC2626]/30 bg-[#DC2626]/10 dark:bg-[#EF4444]/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] dark:bg-[#EF4444]" />
                  <span className="text-[10px] uppercase font-mono tracking-[0.24em] text-[#DC2626] dark:text-[#EF4444] font-semibold">
                    High Risk
                  </span>
                </div>
                
                <p className="text-sm font-mono text-[#171B18] dark:text-[#F3F2EC]">
                  example-login.com<span className="text-[#727A73] dark:text-[#9BA7A0]">/verify</span>
                </p>
              </div>

            </div>

            {/* Plain-English Explanation */}
            <div className="mt-10 pt-8 border-t border-[#D9D6CD] dark:border-white/[0.06]">
              <p className="font-serif text-lg sm:text-xl text-[#171B18] dark:text-[#F3F2EC] leading-snug max-w-md italic font-normal">
                &ldquo;This website may be trying to imitate a trusted service.&rdquo;
              </p>
              
              <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3.5">
                <button
                  onClick={onAction}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-[#FAF8F2] dark:text-white bg-[#087A5B] hover:bg-[#07503F] dark:bg-[#00A878] dark:hover:bg-[#087A5B] shadow-[0_4px_16px_rgba(8,122,91,0.2)] dark:shadow-[0_4px_20px_rgba(0,168,120,0.25)] transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" strokeWidth={1.5} />
                  <span>See How It Works</span>
                </button>
                
                <span className="text-xs text-[#5E665F] dark:text-[#9BA7A0] font-mono">
                  Flagged for deceptive patterns
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Floating Quiet Confidence Stamp */}
        <div className="hidden sm:flex absolute -bottom-4 left-4 sm:-left-4 bg-[#FAF8F2] dark:bg-[#0D1210] rounded-2xl px-5 py-3.5 items-center gap-3 shadow-warm dark:shadow-xl border border-[#D9D6CD] dark:border-white/[0.08] max-w-[calc(100%-2rem)]">
          <ShieldCheck className="w-4 h-4 text-[#087A5B] dark:text-[#00A878]" strokeWidth={1.5} />
          <div>
            <p className="text-xs font-medium text-[#171B18] dark:text-[#F3F2EC] tracking-wide">You're protected</p>
            <p className="text-[9px] uppercase font-mono tracking-[0.24em] text-[#087A5B] dark:text-[#00A878]">by SAFORA</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
