import React from 'react';
import { User, Shield, ArrowUpRight } from 'lucide-react';

export default function Team() {
  // Configured to seamlessly accept real photos later:
  // e.g. image: "/team/suraj.jpg"
  const members = [
    {
      id: "suraj",
      name: "Suraj",
      role: "ML / Backend & Lead",
      image: null,
      contribution: "Leads machine learning and backend architecture. Built the Flask API and trained the Random Forest phishing detection model for real-time URL risk analysis."
    },
    {
      id: "mohit",
      name: "Mohit",
      role: "Chrome Extension / Frontend",
      image: null,
      contribution: "Developed the Chrome extension using React and Tailwind CSS. Built automatic tab scanning, pre-flight URL verification, and the in-browser alert interface."
    },
    {
      id: "kartikey",
      name: "Kartikey",
      role: "UI/UX Designer",
      image: null,
      contribution: "Designed the overall user interface and experience. Focused on translating complex cybersecurity metrics into clean, understandable visual signals."
    },
    {
      id: "dinesh",
      name: "Dinesh",
      role: "Security Architecture & Rule Logic",
      image: null,
      contribution: "Architected SAFORA's independent rule engine and threat logic. Designed detection rules for suspicious IPs, missing HTTPS, character substitutions, and deceptive domain structures."
    }
  ];

  return (
    <section id="team" className="relative py-36 sm:py-44 bg-[#050706] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-5 mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d120f] border border-white/[0.08] text-emerald-400 text-[11px] font-mono tracking-[0.25em] uppercase font-medium">
            <span>LEADERSHIP</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12]">
            Meet the people behind SAFORA
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light max-w-2xl mx-auto">
            Dedicated engineers and designers focused on bringing explainable, real-time phishing protection to everyday web browsing.
          </p>
        </div>

        {/* 4 Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {members.map((member) => (
            <div
              key={member.id}
              className="group relative rounded-3xl bg-[#080b09]/80 border border-white/[0.07] hover:border-emerald-500/30 p-7 backdrop-blur-2xl transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex flex-col justify-between"
            >
              {/* Subtle top indicator */}
              <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-white/[0.06] group-hover:via-emerald-400/40 to-transparent transition-all" />

              <div>
                {/* PHOTO CONTAINER (Consistent Dimensions & Aspect Ratio for all members) */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#0c100e] border border-white/[0.06] group-hover:border-emerald-500/30 mb-6 transition-all duration-400 flex items-center justify-center">
                  
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    /* Sophisticated abstract profile placeholder */
                    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-slate-400 group-hover:text-emerald-300 transition-colors">
                      {/* Geometric hairline rings */}
                      <div className="absolute inset-5 rounded-full border border-white/[0.04] group-hover:border-emerald-500/20 group-hover:rotate-45 transition-all duration-700 pointer-events-none" />
                      <div className="absolute inset-10 rounded-full border border-white/[0.03] pointer-events-none" />
                      
                      <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-emerald-300 group-hover:scale-105 transition-all duration-300">
                        <User className="w-6 h-6 stroke-[1.5]" />
                      </div>

                      <div className="mt-3 text-[9px] font-mono tracking-[0.25em] uppercase text-slate-400 group-hover:text-emerald-400/90 transition-colors">
                        SAFORA CORE
                      </div>
                    </div>
                  )}

                  <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
                </div>

                {/* Name */}
                <h3 className="font-heading text-xl font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                  {member.name}
                </h3>

                {/* Role */}
                <div className="text-xs font-mono font-medium text-emerald-400 mt-1 mb-4 leading-snug">
                  {member.role}
                </div>

                {/* Short User-Friendly Contribution */}
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  {member.contribution}
                </p>
              </div>

              {/* Inactive Profile Label */}
              <div className="mt-8 pt-4 border-t border-white/[0.05] flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Core Contributor</span>
                <span className="text-slate-400 uppercase tracking-wider">Active</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
