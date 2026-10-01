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
          ? "backdrop-blur-2xl bg-[#F7F7F2]/90 dark:bg-[#050706]/85 border-b border-black/[0.06] dark:border-white/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.7)] py-3.5"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => go("#home")}
          className="group flex items-center gap-3.5 transition-transform duration-300 cursor-pointer"
        >
          <div className="relative w-8 h-8 rounded-xl overflow-hidden ring-1 ring-black/10 dark:ring-white/10 group-hover:ring-emerald-500/50 transition-all shadow-sm">
            <img
              src={LOGO_URL}
              alt="SAFORA logo"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-serif text-lg font-bold tracking-tight text-[#121614] dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
              SAFORA
            </span>
            <span className="text-[9px] uppercase font-mono tracking-[0.25em] text-emerald-600 dark:text-emerald-400/80 -mt-1 hidden sm:block">
              Web Protection
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 px-6 py-2 rounded-full bg-black/[0.03] dark:bg-[#0a0d0b]/60 border border-black/[0.06] dark:border-white/[0.06] backdrop-blur-xl">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => go(link.href)}
              className="text-[11px] uppercase tracking-[0.22em] text-[#4e5952] hover:text-[#121614] dark:text-slate-300 dark:hover:text-white transition-colors duration-200 cursor-pointer"
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
            className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 border border-emerald-400/30 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all duration-300 cursor-pointer"
          >
            <span>Get SAFORA</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-100" />
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-[#121614] dark:text-slate-300 hover:text-emerald-600 dark:hover:text-white rounded-xl bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10"
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
            className="lg:hidden overflow-hidden backdrop-blur-2xl bg-[#F7F7F2]/95 dark:bg-[#070908]/95 border-t border-black/10 dark:border-white/10 shadow-2xl"
          >
            <div className="px-6 py-6 flex flex-col space-y-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => go(link.href)}
                  className="py-3 text-left text-xs uppercase tracking-[0.22em] text-[#4e5952] dark:text-slate-300 hover:text-[#121614] dark:hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-col gap-2.5">
                <a
                  href={GITHUB_RELEASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1.5"
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
                    className="w-full py-2.5 rounded-full bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-xs font-mono uppercase tracking-wider text-[#4e5952] dark:text-slate-300 hover:text-emerald-600 dark:hover:text-white"
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
