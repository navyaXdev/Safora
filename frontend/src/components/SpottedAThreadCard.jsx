import React from "react";

const SpottedAThreadCard = ({ isDarkMode, setShowTheUrl, riskScore = 0.7 }) => {

  async function handleCloseTheTab() {
    const tabs = await chrome.tabs.query({
      active: true,
      currentWindow: true
    })
    const tab = tabs[0];
    const response = await chrome.runtime.sendMessage({
      type: "CLOSE_TAB",
      tabId: tab?.id
    })
    console.log("The response after closing the tab: ", response)
  }

  const getRiskLevel = (score) => {
    if (score >= 0.7) return 'high';
    if (score >= 0.4) return 'medium';
    return 'low'; 
  };

  const riskLevel = getRiskLevel(riskScore);

  const riskThemes = {
    high: {
      title: "Threat Detected",
      badgeText: "Unsafe",
      strokeColor: "#ef4444", // red-500
      buttonBg: "bg-red-600 hover:bg-red-500 shadow-red-600/10",
      iconBg: isDarkMode ? "bg-red-500/10" : "bg-red-50",
      badgeBg: isDarkMode ? "border-red-950/60 bg-red-950/30" : "border-red-100 bg-red-50/60",
      badgeDot: "bg-red-500",
      badgePing: "bg-red-400",
      textColor: "text-red-500",
    },
    medium: {
      title: "Suspicious Activity",
      badgeText: "Warning",
      strokeColor: "#f97316", // orange-500
      buttonBg: "bg-orange-600 hover:bg-orange-500 shadow-orange-600/10",
      iconBg: isDarkMode ? "bg-orange-500/10" : "bg-orange-50",
      badgeBg: isDarkMode ? "border-orange-950/60 bg-orange-950/30" : "border-orange-100 bg-orange-50/60",
      badgeDot: "bg-orange-500",
      badgePing: "bg-orange-400",
      textColor: "text-orange-500",
    },
    low: {
      title: "Caution Advised",
      badgeText: "Low Risk",
      strokeColor: "#eab308", // yellow-500
      buttonBg: "bg-yellow-600 hover:bg-yellow-500 shadow-yellow-600/10",
      iconBg: isDarkMode ? "bg-yellow-500/10" : "bg-yellow-50",
      badgeBg: isDarkMode ? "border-yellow-950/60 bg-yellow-950/30" : "border-yellow-100 bg-yellow-50/60",
      badgeDot: "bg-yellow-500",
      badgePing: "bg-yellow-400",
      textColor: "text-yellow-500",
    }
  };

  const currentTheme = riskThemes[riskLevel];

  return (
    <div
      className={`w-90 rounded-2xl border p-5 shadow-xl transition-all duration-300 ${isDarkMode
          ? "border-zinc-800 bg-zinc-950 text-zinc-100 shadow-black/50"
          : "border-zinc-100 bg-white text-zinc-800 shadow-zinc-300/40"
        }`}
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 shadow-md shadow-emerald-600/10">
            <img src="images/image2.png" alt="" />
          </div>

          <h1 className={`text-base font-black tracking-wider ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
            SAFORA
          </h1>
        </div>

        <button
          className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-colors duration-200 ${isDarkMode
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

      <div className="mb-4 flex justify-center">
        <div className={`flex h-20 w-20 items-center justify-center rounded-full transition-colors duration-300 ${currentTheme.iconBg}`}>
          <svg
            width="38"
            height="38"
            viewBox="0 0 24 24"
            fill="none"
            stroke={currentTheme.strokeColor} 
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

      <div className="text-center">
        <h2 className={`mb-2 text-xl font-black tracking-tight ${currentTheme.textColor}`}>
          {currentTheme.title}
        </h2>

        <p className={`mb-5 text-xs font-medium leading-relaxed px-1 ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
          SAFORA recognized a high-risk link, spoofed interface, or abnormal sender signature on this site. Leave this tab immediately to safeguard your session data.
        </p>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <button 
          onClick={handleCloseTheTab} 
          className={`w-full rounded-xl py-3 text-xs font-bold text-white shadow-lg transition-all cursor-pointer duration-200 active:scale-[0.99] ${currentTheme.buttonBg}`}
        >
          Close This Tab
        </button>

        <button
          onClick={() => { 
            setShowTheUrl(true)
           }}
          className={`flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 font-bold transition cursor-pointer ${isDarkMode
            ? "border-zinc-800 bg-zinc-900 hover:bg-zinc-800"
            : "border-zinc-200 bg-white hover:bg-zinc-50"
            }`}
        >
          🔍 Check a URL
        </button>
      </div>

      <div className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 transition-colors duration-300 ${currentTheme.badgeBg}`}>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentTheme.badgePing}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${currentTheme.badgeDot}`}></span>
          </span>
          <span className={`text-xs font-bold uppercase tracking-wider ${currentTheme.textColor}`}>
            {currentTheme.badgeText}
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