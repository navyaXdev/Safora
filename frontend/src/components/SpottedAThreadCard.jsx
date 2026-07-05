import React from "react";

const SpottedAThreadCard = ({ isDarkMode,setShowThreatDetectWarning }) => {
  return (
    <div
      className={`w-90 rounded-2xl border p-5 shadow-xl transition-all duration-300 ${
        isDarkMode
          ? "border-zinc-800 bg-zinc-950 text-zinc-100 shadow-black/50"
          : "border-zinc-100 bg-white text-zinc-800 shadow-zinc-300/40"
      }`}
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* Brand Logo */}
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 shadow-md shadow-emerald-600/10">
            <img src="images/image2.png" alt="" />
          </div>

          <h1 className={`text-base font-black tracking-wider ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
            SAFORA
          </h1>
        </div>

        {/* Settings Button */}
        <button
          className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-colors duration-200 ${
            isDarkMode
              ? "border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white"
              : "border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9A1.65 1.65 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c0 .69.4 1.31 1.03 1.51H21a2 2 0 1 1 0 4h-.09c-.69 0-1.31.4-1.51 1.03Z" />
          </svg>
        </button>
      </div>

      {/* Warning Hero Block */}
      <div className="mb-4 flex justify-center">
        <div className={`flex h-20 w-20 items-center justify-center rounded-full transition-colors duration-300 ${
          isDarkMode ? "bg-red-500/10" : "bg-red-50"
        }`}>
          <svg
            width="38"
            height="38"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86 1.82 18A2 2 0 0 0 3.53 21h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
      </div>

      {/* Main Alert Content */}
      <div className="text-center">
        <h2 className="mb-2 text-xl font-black tracking-tight text-red-500">
          Threat Detected
        </h2>

        <p className={`mb-5 text-xs font-medium leading-relaxed px-1 ${
          isDarkMode ? "text-zinc-400" : "text-zinc-500"
        }`}>
          SAFORA recognized a high-risk link, spoofed interface, or abnormal sender signature on this site. Leave this tab immediately to safeguard your session data.
        </p>
      </div>

      {/* Primary Action Button */}
      <button onClick={()=>{
        setShowThreatDetectWarning(false)

      }} className="mb-4 w-full rounded-xl bg-red-600 py-3 text-xs font-bold text-white shadow-lg shadow-red-600/10 transition-all duration-200 hover:bg-red-500 active:scale-[0.99]">
        Close This Tab
      </button>

      {/* Footer Security Status Badge */}
      <div
        className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 transition-colors duration-300 ${
          isDarkMode
            ? "border-red-950/60 bg-red-950/30"
            : "border-red-100 bg-red-50/60"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-red-500">
            Unsafe
          </span>
        </div>

        <span className={`text-[11px] font-semibold ${isDarkMode ? "text-zinc-500" : "text-zinc-400"}`}>
          Action Required
        </span>
      </div>
    </div>
  );
};

export default SpottedAThreadCard;