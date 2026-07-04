import { React,useState } from "react";


const SaforaDashboard = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <div
            className={`w-90 p-3 transition-colors duration-300 ${isDarkMode ? "bg-zinc-950" : "bg-zinc-100"
                }`}
        >
            <div
                className={`rounded-[28px] border p-6 shadow-lg ${isDarkMode
                        ? "border-zinc-800 bg-zinc-900 text-white"
                        : "border-zinc-200 bg-white text-zinc-900"
                    }`}
            >
                <header className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="images/image2.png" alt="SAFORA" className="h-10 w-10" />
                        <h1 className="text-xl font-bold">SAFORA</h1>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsDarkMode((prev) => !prev)}
                            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${isDarkMode
                                    ? "border-zinc-800 bg-zinc-900"
                                    : "border-zinc-200 bg-white"
                                }`}
                        >
                            {isDarkMode ? "☀️" : "🌙"}
                        </button>

                        <button
                            className={`flex h-10 w-10 items-center justify-center rounded-xl border ${isDarkMode
                                    ? "border-zinc-800 bg-zinc-900"
                                    : "border-zinc-200 bg-white"
                                }`}
                        >
                            ⚙️
                        </button>
                    </div>
                </header>

                {/* Main */}
                <main className="text-center">
                    <div className="mx-auto mb-5 flex h-22.5 w-22.5 items-center justify-center rounded-full bg-emerald-50">
                        <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M20 6L9 17L4 12"
                                stroke="#166534"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <h2 className="mb-2 text-2xl font-bold">
                        You're protected now.
                    </h2>

                    <p
                        className={`mb-5 text-sm leading-6 ${isDarkMode ? "text-zinc-400" : "text-zinc-500"
                            }`}
                    >
                        SAFORA will watch for suspicious links, fake login pages, and risky
                        sender patterns while you browse.
                    </p>

                    <div
                        className={`mb-6 inline-block rounded-full border px-5 py-2 text-sm ${isDarkMode
                                ? "border-zinc-800 bg-zinc-800 text-zinc-400"
                                : "border-zinc-200 bg-zinc-100 text-zinc-500"
                            }`}
                    >
                        📌 Pinned for quick checks
                    </div>

                    <button
                        className={`flex w-full items-center justify-center gap-2 rounded-2xl border py-4 font-bold transition ${isDarkMode
                                ? "border-zinc-800 bg-zinc-900 hover:bg-zinc-800"
                                : "border-zinc-200 bg-white hover:bg-zinc-50"
                            }`}
                    >
                        🔍 Check a URL
                    </button>
                </main>

                {/* Footer */}
                <footer>
                    <div
                        className={`mt-6 flex items-center rounded-2xl border px-4 py-3 ${isDarkMode
                                ? "border-zinc-800 bg-emerald-950"
                                : "border-zinc-200 bg-emerald-50"
                            }`}
                    >
                        <span className="mr-3 h-2.5 w-2.5 rounded-full bg-emerald-500"></span>

                        <span className="font-semibold text-emerald-500">Active</span>

                        <span
                            className={`ml-auto text-sm ${isDarkMode ? "text-zinc-400" : "text-zinc-500"
                                }`}
                        >
                            Monitoring this page
                        </span>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default SaforaDashboard