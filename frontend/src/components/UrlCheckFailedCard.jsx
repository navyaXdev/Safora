import React from 'react'

const UrlCheckFailedCard = () => {
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
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
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

      {/* Error Icon */}
      <div className="mx-auto mb-5 flex h-15 w-15 items-center justify-center rounded-full bg-orange-50">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      {/* Heading */}
      <h2
        className={`mb-3 text-xl font-extrabold ${
          isDarkMode ? "text-white" : "text-zinc-900"
        }`}
      >
        Couldn't check this URL.
      </h2>

      {/* Description */}
      <p
        className={`mb-6 text-sm leading-6 ${
          isDarkMode ? "text-zinc-400" : "text-zinc-500"
        }`}
      >
        Please make sure you've entered a full link (starting with
        <span className="font-medium"> http://</span> or
        <span className="font-medium"> https://</span>) and check your
        connection.
      </p>

      {/* URL Input */}
      <div className="relative mb-5">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </span>

        <input
          type="text"
          value="example dot com"
          readOnly
          className={`w-full rounded-xl border py-3.5 pr-4 pl-11 outline-none ${
            isDarkMode
              ? "border-orange-500 bg-zinc-800 text-white"
              : "border-orange-400 bg-white text-zinc-900"
          }`}
        />
      </div>

      {/* Try Again */}
      <button className="mb-4 w-full rounded-xl bg-green-700 py-4 font-bold text-white transition hover:bg-green-800">
        Try Again
      </button>

      {/* Footer */}
      <button
        className={`text-sm font-bold transition ${
          isDarkMode
            ? "text-zinc-400 hover:text-white"
            : "text-zinc-500 hover:text-zinc-700"
        }`}
      >
        Back
      </button>
    </div>
  );
}

export default UrlCheckFailedCard