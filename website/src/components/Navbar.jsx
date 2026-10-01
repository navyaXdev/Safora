import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenScanner }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Technology', href: '#technology' },
    { name: 'Team', href: '#team' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#050706]/85 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.6)] py-4'
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          
          {/* Left: Official SAFORA Logo & Brand */}
          <a
            href="#home"
            className="flex items-center gap-3.5 group transition-transform duration-300"
            aria-label="SAFORA Home"
          >
            <div className="relative w-9 h-9 rounded-xl overflow-hidden ring-1 ring-white/10 group-hover:ring-emerald-500/40 transition-all duration-300 shadow-md">
              <img
                src="/safora-logo.png"
                alt="SAFORA Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                SAFORA
              </span>
              <span className="text-[9px] uppercase font-mono tracking-[0.25em] text-emerald-400/80 -mt-0.5">
                Cybersecurity
              </span>
            </div>
          </a>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 px-6 py-2 rounded-full bg-[#0a0d0b]/50 border border-white/[0.06] backdrop-blur-xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[13px] font-medium tracking-wide text-slate-300 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: Premium CTA Button */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onOpenScanner}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide text-white bg-gradient-to-r from-emerald-600/90 to-emerald-500/90 hover:from-emerald-500 hover:to-emerald-400 border border-emerald-400/30 hover:border-emerald-300/50 shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_30px_rgba(16,185,129,0.45)] transition-all duration-300 cursor-pointer"
            >
              <span>Try SAFORA</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-100" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#0a0d0b] text-slate-300 border border-white/10 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 p-6 rounded-3xl bg-[#080b09]/95 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="pt-3 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenScanner) onOpenScanner();
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
              >
                <span>Try SAFORA</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
