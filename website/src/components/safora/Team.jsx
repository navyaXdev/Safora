import React from "react";
import { motion } from "framer-motion";
import { User, ArrowUpRight } from "lucide-react";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

function GithubIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

const team = [
  {
    name: "Suraj Sahoo",
    role: "ML / BACKEND & LEAD",
    description:
      "Worked on the machine learning and backend side of SAFORA, helping build the system that analyzes suspicious websites.",
    image: "/team/suraj.jpg",
    objectPosition: "object-center",
    github: "https://github.com/surajgoeswithds",
    linkedin: "https://www.linkedin.com/in/suraj-sahoo-353b42277/",
  },
  {
    name: "Mohit Suthar",
    role: "CHROME EXTENSION / FRONTEND",
    description:
      "Worked on the browser extension and the user-facing experience that people interact with while browsing.",
    image: "/team/mohit.jpg",
    objectPosition: "object-center",
    github: "https://github.com/Mohit-Suthar121",
    linkedin: "https://www.linkedin.com/in/mohit-suthar-1a3ba6272/",
  },
  {
    name: "Kartikey Bhadauria",
    role: "UI/UX DESIGNER",
    description:
      "Designed the visual experience of SAFORA with a focus on making security information simple and easy to understand.",
    image: "/team/kartikey.jpg",
    objectPosition: "object-center",
    github: "https://github.com/kartikey-bhadauria",
    linkedin: "https://www.linkedin.com/in/kartikey-bhadauria-721158409/",
  },
  {
    name: "Dinesh Patra",
    role: "SECURITY ARCHITECTURE & RULE LOGIC",
    description:
      "Worked on SAFORA's security logic and threat-detection rules, helping the system identify suspicious website patterns and explain security warnings.",
    image: "/team/dinesh.jpg",
    objectPosition: "object-center",
    github: "https://github.com/navyaXdev",
    linkedin: "https://www.linkedin.com/in/navyaxdev/",
  },
];

export default function Team() {
  return (
    <section id="team" className="relative py-36 sm:py-44 bg-[#FAF9F5] dark:bg-[#050706] transition-colors duration-400">
      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10">
        
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <Eyebrow>Team</Eyebrow>
            <h2 className="mt-8 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-[-0.02em] text-[#141916] dark:text-white">
              Meet the people behind SAFORA
            </h2>
          </div>
        </Reveal>

        {/* 4 Team Cards Grid */}
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group h-full rounded-[28px] border border-black/[0.07] dark:border-white/[0.07] hover:border-emerald-500/40 bg-white dark:bg-[#080b09]/85 overflow-hidden transition-all duration-400 shadow-[0_12px_35px_rgba(20,25,22,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl flex flex-col justify-between"
              >
                <div>
                  {/* Photo Container: Square Aspect Ratio & Clean Presentation */}
                  <div className="relative aspect-square overflow-hidden bg-[#EAE8E1] dark:bg-[#0c100e] border-b border-black/[0.06] dark:border-white/[0.06] flex items-center justify-center">
                    {m.image ? (
                      <img
                        src={m.image}
                        alt={m.name}
                        loading="lazy"
                        decoding="async"
                        className={`w-full h-full object-cover ${m.objectPosition || 'object-center'} group-hover:scale-105 transition-transform duration-500 will-change-transform`}
                      />
                    ) : (
                      /* Abstract intentional placeholder */
                      <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-[#6e7b73] dark:text-slate-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                        <div className="absolute inset-6 rounded-full border border-black/[0.04] dark:border-white/[0.04] group-hover:border-emerald-500/20 group-hover:rotate-45 transition-all duration-700 pointer-events-none" />
                        <div className="absolute inset-12 rounded-full border border-black/[0.03] dark:border-white/[0.03] pointer-events-none" />
                        
                        <div className="w-16 h-16 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-black/10 dark:border-white/[0.08] flex items-center justify-center text-[#2d3630] dark:text-slate-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 group-hover:scale-105 transition-all duration-300 shadow-xs">
                          <User className="w-7 h-7 stroke-[1.4]" />
                        </div>

                        <span className="font-serif text-3xl font-light text-black/[0.06] dark:text-white/[0.07] absolute bottom-3 select-none tracking-widest uppercase">
                          {m.name.split(" ")[0]}
                        </span>
                      </div>
                    )}

                    <div className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400/80 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  </div>

                  {/* Details: NAME, ROLE & DESCRIPTION */}
                  <div className="p-6 pb-2">
                    <h3 className="font-serif text-xl font-bold tracking-tight text-[#141916] dark:text-white mb-1.5 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                      {m.name}
                    </h3>
                    
                    <div className="text-[10px] font-mono uppercase tracking-[0.16em] font-semibold text-emerald-700 dark:text-emerald-400 mb-3">
                      {m.role}
                    </div>

                    <p className="text-xs text-[#55635B] dark:text-slate-300 leading-relaxed font-normal">
                      {m.description}
                    </p>
                  </div>
                </div>

                {/* Social Buttons: GitHub & LinkedIn */}
                <div className="p-6 pt-3">
                  <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center gap-2">
                    <a
                      href={m.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name}'s GitHub profile`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-[11px] font-mono font-medium text-[#2d3630] dark:text-slate-300 bg-black/[0.03] dark:bg-white/[0.03] hover:bg-emerald-500/10 dark:hover:bg-emerald-500/15 border border-black/[0.08] dark:border-white/[0.08] hover:border-emerald-500/40 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300 cursor-pointer shadow-xs group/btn"
                    >
                      <GithubIcon className="w-3.5 h-3.5 shrink-0" />
                      <span>GitHub</span>
                      <ArrowUpRight className="w-3 h-3 opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>

                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name}'s LinkedIn profile`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-[11px] font-mono font-medium text-[#2d3630] dark:text-slate-300 bg-black/[0.03] dark:bg-white/[0.03] hover:bg-emerald-500/10 dark:hover:bg-emerald-500/15 border border-black/[0.08] dark:border-white/[0.08] hover:border-emerald-500/40 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300 cursor-pointer shadow-xs group/btn"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5 shrink-0" />
                      <span>LinkedIn</span>
                      <ArrowUpRight className="w-3 h-3 opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
