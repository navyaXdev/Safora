import React from 'react';

export default function Footer() {
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Technology', href: '#technology' },
    { name: 'Team', href: '#team' },
  ];

  return (
    <footer className="relative bg-[#040504] border-t border-white/[0.06] pt-20 pb-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Main Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-14 border-b border-white/[0.05]">
          
          {/* Brand & Tagline */}
          <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
            <a href="#home" className="flex items-center gap-3.5 group">
              <div className="w-9 h-9 rounded-xl overflow-hidden ring-1 ring-white/10 group-hover:ring-emerald-500/40 transition-all shadow-sm">
                <img
                  src="/safora-logo.png"
                  alt="SAFORA"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                SAFORA
              </span>
            </a>
            <p className="text-xs font-mono text-emerald-400/90 italic tracking-wide">
              "You're protected now."
            </p>
            <p className="text-xs text-slate-400 max-w-xs font-light">
              Real-time phishing protection for everyday browsing.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-8 text-[13px] font-medium text-slate-400">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-400">
          <div>
            © 2026 SAFORA. All rights reserved.
          </div>
          <div className="text-slate-400 uppercase tracking-widest">
            Explainable Browser Threat Intelligence
          </div>
        </div>

      </div>
    </footer>
  );
}
