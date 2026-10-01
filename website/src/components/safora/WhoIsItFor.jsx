import React from "react";
import { GraduationCap, Users, Globe, UserCheck, Eye } from "lucide-react";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

const audiences = [
  { icon: GraduationCap, label: "Students" },
  { icon: Users, label: "Families" },
  { icon: Globe, label: "Everyday web users" },
  { icon: UserCheck, label: "People who are not security experts" },
  { icon: Eye, label: "Anyone who wants an extra layer of awareness while browsing" },
];

export default function WhoIsItFor() {
  return (
    <section id="who-is-it-for" className="relative py-36 sm:py-44 bg-[#F3F2EC] dark:bg-[#080c09] border-y border-black/[0.06] dark:border-white/[0.05] transition-colors duration-400">
      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 grid lg:grid-cols-12 gap-16 lg:gap-12 items-start">
        
        {/* Statement */}
        <Reveal className="lg:col-span-5">
          <Eyebrow align="left">Who It's For</Eyebrow>
          <h2 className="mt-8 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-[-0.02em] text-[#141916] dark:text-white">
            Made for everyday internet users.
          </h2>
          <div className="mt-10 h-px w-24 eyebrow-line" />
          <p className="mt-8 font-serif italic text-2xl sm:text-3xl leading-snug text-emerald-700 dark:text-emerald-400 max-w-md font-normal">
            You don't need to be a cybersecurity expert to understand a security warning.
          </p>
        </Reveal>

        {/* Audience List */}
        <Reveal delay={0.18} className="lg:col-span-6 lg:col-start-7">
          <ul className="border-y border-black/[0.08] dark:border-white/[0.08] divide-y divide-black/[0.06] dark:divide-white/[0.06]">
            {audiences.map((a, i) => (
              <li
                key={a.label}
                className="group flex items-center gap-6 py-7 transition-colors duration-400"
              >
                <div className="w-10 h-10 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] flex items-center justify-center text-[#4A544E] dark:text-slate-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 group-hover:border-emerald-500/40 shadow-xs transition-all duration-300 shrink-0">
                  <a.icon className="w-4 h-4 stroke-[1.5]" />
                </div>
                <span className="text-base sm:text-lg text-[#2d3630] dark:text-slate-300 font-light transition-colors group-hover:text-[#141916] dark:group-hover:text-white">
                  {a.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

      </div>
    </section>
  );
}
