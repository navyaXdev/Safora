import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { LOGO_URL, NAV_LINKS, GITHUB_RELEASE_URL } from "@/lib/safora";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar({ onOpenScanner }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-2xl bg-[#F0EEE7]/90 dark:bg-[#070908]/85 border-b border-[#D9D6CD] dark:border-white/[0.06] shadow-[0_8px_30px_rgba(30,35,30,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] py-3.5"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => go("#home")}
          className="group flex items-center gap-3 sm:gap-3.5 lg:gap-4 transition-transform duration-300 cursor-pointer focus-visible:outline-none select-none py-0.5"
          aria-label="SAFORA Home"
        >
          {/* Prominent Shield/Icon — approx 25-30% larger (32px -> 42px on desktop) */}
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 lg:w-[42px] lg:h-[42px] rounded-[11px] sm:rounded-[13px] lg:rounded-[14px] overflow-hidden ring-1 ring-black/[0.08] dark:ring-white/[0.08] group-hover:ring-[#087A5B]/60 dark:group-hover:ring-[#00A878]/60 transition-all shadow-xs shrink-0">
            <img
              src={LOGO_URL}
              alt="SAFORA logo"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Wordmark & Subtitle Balanced Column */}
          <div className="flex flex-col text-left justify-center">
            <span className="font-serif text-[1.32rem] sm:text-[1.45rem] lg:text-[1.58rem] font-bold tracking-[-0.015em] leading-none text-[#171B18] dark:text-[#F3F2EC] group-hover:text-[#087A5B] dark:group-hover:text-[#00A878] transition-colors">
              SAFORA
            </span>
            <span className="text-[9px] sm:text-[9.5px] lg:text-[10px] uppercase font-mono tracking-[0.26em] sm:tracking-[0.28em] text-[#087A5B] dark:text-[#00A878] mt-1 sm:mt-1.5 hidden xs:block font-semibold leading-none">
              Web Protection
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 px-7 py-2 rounded-full bg-[#E9E5DC]/80 dark:bg-[#0D1210]/70 border border-[#D9D6CD] dark:border-white/[0.06] backdrop-blur-xl">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => go(link.href)}
              className="text-[11px] uppercase tracking-[0.24em] text-[#5E665F] hover:text-[#087A5B] dark:text-[#9BA7A0] dark:hover:text-[#00A878] transition-colors duration-200 cursor-pointer font-medium"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Action Button & Theme Toggle */}
        <div className="flex items-center gap-3">
          {/* Polished Theme Switcher */}
          <ThemeToggle />

          <a
            href={GITHUB_RELEASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#FAF8F2] dark:text-white bg-[#087A5B] hover:bg-[#07503F] dark:bg-[#00A878] dark:hover:bg-[#087A5B] border border-[#087A5B]/30 dark:border-[#00A878]/30 shadow-[0_4px_16px_rgba(8,122,91,0.2)] dark:shadow-[0_4px_20px_rgba(0,168,120,0.25)] transition-all duration-300 cursor-pointer"
          >
            <span>Get SAFORA</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-[#171B18] dark:text-[#F3F2EC] hover:text-[#087A5B] dark:hover:text-[#00A878] rounded-xl bg-[#E9E5DC] dark:bg-white/[0.04] border border-[#D9D6CD] dark:border-white/10"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden backdrop-blur-2xl bg-[#F0EEE7]/98 dark:bg-[#070908]/98 border-t border-[#D9D6CD] dark:border-white/10 shadow-2xl"
          >
            <div className="px-6 py-6 flex flex-col space-y-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => go(link.href)}
                  className="py-3 text-left text-xs uppercase tracking-[0.24em] text-[#5E665F] dark:text-[#9BA7A0] hover:text-[#087A5B] dark:hover:text-[#00A878] transition-colors font-medium"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 border-t border-[#D9D6CD] dark:border-white/10 flex flex-col gap-2.5">
                <a
                  href={GITHUB_RELEASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="w-full py-3.5 rounded-full bg-[#087A5B] hover:bg-[#07503F] text-[#FAF8F2] dark:bg-[#00A878] dark:text-white text-xs font-semibold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Get SAFORA</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                {onOpenScanner && (
                  <button
                    onClick={() => {
                      setOpen(false);
                      onOpenScanner();
                    }}
                    className="w-full py-2.5 rounded-full bg-[#FAF8F2] dark:bg-white/[0.04] border border-[#D9D6CD] dark:border-white/10 text-xs font-mono uppercase tracking-wider text-[#5E665F] dark:text-[#9BA7A0] hover:text-[#087A5B] dark:hover:text-[#00A878]"
                  >
                    Open Live URL Scanner
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
