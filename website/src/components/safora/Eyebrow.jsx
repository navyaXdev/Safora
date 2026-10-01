import React from "react";

export default function Eyebrow({ children, align = "center", className = "" }) {
  return (
    <div className={`flex items-center gap-4 ${align === "center" ? "justify-center" : ""} ${className}`}>
      <span className="h-px w-7 eyebrow-line" />
      <span className="text-[10px] font-mono font-medium uppercase tracking-[0.32em] text-emerald-600 dark:text-emerald-400/90 whitespace-nowrap">
        {children}
      </span>
      <span className="h-px w-7 eyebrow-line-r" />
    </div>
  );
}
