import React, { useEffect, useState } from "react";
import { ArrowLeft, Info } from "lucide-react";

const AboutPageCard = ({ isDarkMode, setShowAboutPage }) => {
    const [showWarning, setShowWarning] = useState(true);


    async function handleToggle() {
        const newWarning = !showWarning;
        setShowWarning(newWarning);
        chrome.storage.local.set({
            showWarnings: newWarning
        })
    }

    async function fetchInitialState() {
        const { showWarnings = true } = await chrome.storage.local.get("showWarnings");
        setShowWarning(showWarnings);
    }


    useEffect(() => {
        fetchInitialState();
    }, [])

    return (
        <div
            className={`w-95 rounded-3xl border p-6 shadow-xl transition-all duration-300 ${isDarkMode
                    ? "border-zinc-800 bg-zinc-900 text-zinc-100 shadow-black/40"
                    : "border-zinc-200 bg-white text-zinc-800 shadow-zinc-300/40"
                }`}
        >
            <div className="mb-6 flex items-center justify-between">
                <button
                    onClick={() => setShowAboutPage(false)}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-200 cursor-pointer ${isDarkMode
                            ? "border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                            : "border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                        }`}
                >
                    <ArrowLeft size={18} strokeWidth={2.5} />
                </button>

                <div className="flex items-center gap-3">
                        <img  src="images/image2.png" alt="" className="w-10 h-10 object-contain" />

                    <h1 className={`text-lg font-black tracking-wider ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                        SAFORA
                    </h1>
                </div>

                <div className="w-10" />
            </div>

            <div className="mb-5">
                <h2 className={`text-2xl font-black tracking-tight ${isDarkMode ? "text-zinc-100" : "text-zinc-900"}`}>
                    About SAFORA
                </h2>
            </div>

            <div className={`overflow-hidden rounded-xl border ${isDarkMode ? "border-zinc-800 bg-zinc-950/40" : "border-zinc-200 bg-zinc-50/20"}`}>

                <div className={`flex items-center justify-between border-b px-5 py-4 ${isDarkMode ? "border-zinc-800" : "border-zinc-200"}`}>
                    <span className={`text-sm font-bold tracking-wide ${isDarkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                        Version
                    </span>
                    <span className={`text-sm font-bold tracking-wider ${isDarkMode ? "text-zinc-500" : "text-zinc-400"}`}>
                        1.0.0
                    </span>
                </div>

                <div className="flex items-center justify-between px-5 py-4 gap-4">
                    <div className="flex-1">
                        <h3 className={`text-sm font-bold tracking-wide ${isDarkMode ? "text-zinc-200" : "text-zinc-800"}`}>
                            Show warnings on page
                        </h3>
                        <p className={`text-xs font-medium mt-1 leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                            On by default
                        </p>
                    </div>

                    <button
                        onClick={handleToggle}
                        className={`relative h-7 w-12 rounded-full transition-colors duration-200 cursor-pointer outline-none shrink-0 ${showWarning
                                ? "bg-emerald-600"
                                : isDarkMode ? "bg-zinc-800" : "bg-zinc-200"
                            }`}
                    >
                        <span
                            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${showWarning ? "left-6" : "left-1"
                                }`}
                        />
                    </button>
                </div>
            </div>

            <div
                className={`mt-5 flex items-start gap-3 rounded-xl border px-4 py-4 transition-colors duration-300 ${isDarkMode
                        ? "border-zinc-800/80 bg-zinc-950/60"
                        : "border-zinc-200 bg-zinc-50/70"
                    }`}
            >
                <Info
                    size={16}
                    className="mt-0.5 shrink-0 text-emerald-600"
                />
                <p className={`text-xs font-medium leading-relaxed ${isDarkMode ? "text-zinc-300" : "text-zinc-600"}`}>
                    <span className={`font-bold ${isDarkMode ? "text-zinc-100" : "text-zinc-900"}`}>SAFORA</span> only highlights risky
                    patterns and never stores your browsing history.
                </p>
            </div>
        </div>
    );
};

export default AboutPageCard;