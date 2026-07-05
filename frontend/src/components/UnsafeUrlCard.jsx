import React from 'react'

const UnsafeUrlCard = () => {
   return (
    <div
      className={`relative w-95 rounded-[20px] p-8 text-center shadow-lg ${
        isDarkMode
          ? "bg-zinc-900 text-white"
          : "bg-white text-zinc-900"
      }`}
    >
      {/* Back Button */}
      <button
        className={`absolute left-5 top-5 flex h-8 w-8 items-center justify-center rounded-lg border transition ${
          isDarkMode
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

      {/* Header */}
      <h1
        className={`mb-8 text-xl font-bold ${
          isDarkMode ? "text-white" : "text-zinc-900"
        }`}
      >
        Check a URL
      </h1>

      {/* Warning Icon */}
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d32f2f"
          strokeWidth="2.5"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>

      {/* Threat Title */}
      <h2 className="mb-5 text-2xl font-extrabold text-red-600">
        We spotted a threat.
      </h2>

      {/* URL Box */}
      <div
        className={`mb-6 flex items-center justify-between rounded-xl border px-4 py-3 ${
          isDarkMode
            ? "border-red-900 bg-red-950"
            : "border-red-200 bg-red-50"
        }`}
      >
        <span
          className={`mr-3 truncate text-sm font-medium ${
            isDarkMode ? "text-red-100" : "text-zinc-900"
          }`}
        >
          https://fake-login.example/security
        </span>

        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d32f2f"
          strokeWidth="2"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      {/* Description */}
      <p
        className={`mb-8 text-sm leading-6 ${
          isDarkMode ? "text-zinc-400" : "text-zinc-500"
        }`}
      >
        This URL may be a phishing page, contain malware, or have a risky
        sender pattern. Avoid visiting it.
      </p>

      {/* Primary Button */}
      <button className="mb-5 w-full rounded-xl bg-red-600 py-4 font-bold text-white transition hover:bg-red-700">
        Don't Open This Link
      </button>

      {/* Links */}
      <button className="mb-4 block w-full font-semibold text-red-600 transition hover:underline">
        Check Another URL
      </button>

      <button
        className={`text-sm font-medium transition ${
          isDarkMode
            ? "text-zinc-400 hover:text-white"
            : "text-zinc-500 hover:text-zinc-700"
        }`}
      >
        Back to protection status
      </button>
    </div>
  );
}

export default UnsafeUrlCard