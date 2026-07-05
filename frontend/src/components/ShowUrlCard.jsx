import React, { useState } from "react";

const ShowUrlCard = ({ setShowTheUrl, isDarkMode,setShowThreatDetectWarning,setIsMaualCheck,data,setData}) => {

    const getRiskStyles = (riskScore) => {
        if (riskScore >= 0.7) {
            return {
                bg: "bg-red-500/10 border-red-500/30",
                text: "text-red-400",
                badge: "bg-red-500/20 text-red-300 border-red-500/40",
                label: "High Risk"
            };
        }
        if (riskScore >= 0.4) {
            return {
                bg: "bg-orange-500/10 border-orange-500/30",
                text: "text-orange-400",
                badge: "bg-orange-500/20 text-orange-300 border-orange-500/40",
                label: "Medium Risk"
            };
        }
        if (riskScore >= 0.1) {
            return {
                bg: "bg-yellow-500/10 border-yellow-500/30",
                text: "text-yellow-400",
                badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
                label: "Low Risk"
            };
        }
        return {
            bg: "bg-emerald-500/10 border-emerald-500/30",
            text: "text-emerald-400",
            badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
            label: "Safe"
        };
    };


    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [maxLengthExceeded, setMaxLengthExceeded] = useState(false);
    const [isValidUrl, setIsValidUrl] = useState(null);

    const [dataReceived, setDataReceived] = useState(false);
    

    const handleChange = (e) => {
        setUrl(e.target.value);
        if (maxLengthExceeded && e.target.value.length <= 2000) setMaxLengthExceeded(false);
        if (e.target.value.length > 2000) setMaxLengthExceeded(true)
    }

    const validateUrl = (value) => {
        try {
            new URL(value);
            return true;
        } catch (error) {
            return false
        }
    }

    const handleCheckLink = async () => {
        try {
            console.log("i'm running")
            const valid = validateUrl(url);
            console.log("url validated")
            setIsValidUrl(valid);
            if (valid === false) return;
            setIsLoading(true);
            console.log("before fetch")
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/predict`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ url })
            })
            const newData = await response.json();
            setData(newData)
            if(newData.risk_score>=0.4) setShowThreatDetectWarning(true);
            console.log("the data received is:",newData)
            setIsMaualCheck(true);
            setDataReceived(true)
        } catch (error) {
            console.error("post request failed!", error)
        } finally {
            setIsLoading(false);
        }
    }
    
    const styles = getRiskStyles(data.risk_score);


    if (isLoading) {
        return (
            <div
                className={`relative w-95 rounded-[20px] p-8 text-center shadow-lg ${isDarkMode
                    ? "bg-zinc-900 text-white"
                    : "bg-white text-zinc-900"
                    }`}
            >
                <button
                    onClick={() => setIsLoading(false)}
                    className={`absolute top-5 left-5 flex h-8 w-8 items-center justify-center rounded-lg border transition ${isDarkMode
                        ? "border-zinc-700 hover:bg-zinc-800"
                        : "border-zinc-200 hover:bg-zinc-100"
                        }`}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                    </svg>
                </button>

                <h1
                    className={`mb-6 text-xl font-bold ${isDarkMode ? "text-white" : "text-zinc-900"
                        }`}
                >
                    Check a URL
                </h1>

                <div className="relative">
                    <span className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400">
                        🔗
                    </span>

                    <input
                        readOnly
                        onChange={handleChange}
                        value={url || "https://example.com"}
                        className={`w-full rounded-xl py-3 pr-3 pl-10 outline-none ${isDarkMode
                            ? "bg-zinc-800 text-zinc-300"
                            : "bg-zinc-100 text-zinc-600"
                            }`}
                    />
                </div>

                <div className="mt-10 flex flex-col items-center">
                    <div className="mb-5 flex h-17.5 w-17.5 items-center justify-center rounded-full bg-emerald-50">
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#2d7a32"
                            strokeWidth="2.5"
                        >
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <polyline points="9 11 11 13 15 9" />
                        </svg>
                    </div>

                    <div
                        className={`flex items-center gap-3 text-sm font-medium ${isDarkMode ? "text-zinc-400" : "text-zinc-500"
                            }`}
                    >
                        <div
                            className={`h-4 w-4 animate-spin rounded-full border-2 ${isDarkMode
                                ? "border-zinc-700 border-t-white"
                                : "border-zinc-300 border-t-zinc-600"
                                }`}
                        />
                        Analyzing URL...
                    </div>
                </div>
            </div>
        );
    }



    return (
        <div
    className={`w-95 rounded-[20px] p-8 text-center shadow-lg ${
        isDarkMode ? "bg-zinc-900 text-white" : "bg-white text-zinc-900"
    }`}
>
    <h1 className={`mb-2 text-xl font-bold ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
        Check a URL
    </h1>

    <p className={`mb-6 text-sm ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
        Paste a link to see if it's safe.
    </p>

    {/* Input & Error Handling Container */}
    <div className="relative mb-6 text-left">
        <span className="absolute top-6 left-3 -translate-y-1/2 text-zinc-400">
            🔗
        </span>

        <input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={handleChange}
            className={`w-full rounded-xl border py-3 pr-3 pl-10 outline-none transition ${
                isValidUrl === false
                    ? "border-red-500 bg-red-500/5 text-red-900 dark:text-red-200 focus:border-red-500"
                    : isDarkMode
                        ? "border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus:border-emerald-500"
                        : "border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-600"
            }`}
        />

        {/* Clean, Non-intrusive Error Message */}
        {isValidUrl===false && (
            <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500 animate-fade-in">
                <span>⚠️</span> Please enter a valid URL
            </div>
        )}
    </div>

    <button
        onClick={handleCheckLink}
        className="mb-5 w-full rounded-xl bg-green-700 py-3.5 font-semibold text-white transition hover:bg-green-800 cursor-pointer"
    >
        Check Safety
    </button>

    <button
        onClick={() => setShowTheUrl(false)}
        className={`text-sm font-medium transition cursor-pointer ${
            isDarkMode ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-700"
        }`}
    >
        Back to protection status
    </button>

    {dataReceived && (
        <div className={`mt-4 rounded-xl border p-3.5 transition-all duration-300 ${styles.bg}`}>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 mb-2.5">
                <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                    Analysis Result
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${styles.badge}`}>
                    {styles.label}
                </span>
            </div>

            <div className="flex justify-between items-baseline mb-3">
                <span className="text-xs text-zinc-400">Risk Score</span>
                <span className={`text-xl font-bold tracking-tight ${styles.text}`}>
                    {Math.round(data.risk_score * 100)}%
                </span>
            </div>

            {data.reasons && data.reasons.length > 0 && (
                <div className="space-y-1.5">
                    <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block">
                        Details:
                    </span>
                    <ul className="space-y-1">
                        {data.reasons.map((reason, index) => (
                            <li key={index} className="text-xs text-zinc-300 flex items-start gap-1.5 leading-relaxed">
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-500 translate-y-0.5" />
                                <p className="flex justify-center items-center">
                                    {reason}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )}
</div>
    );
};

export default ShowUrlCard;