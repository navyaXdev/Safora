import { useState } from "react";

import React from 'react'

const ShowUrlCard = () => {
     const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!url.trim()) {
      setUrl("https://example.com");
    }
    setIsLoading(true);
  };

  if (isLoading) {
    return (
      <div className="relative w-[380px] rounded-[20px] bg-white p-8 text-center shadow-lg">
        <button
          onClick={() => setIsLoading(false)}
          className="absolute top-5 left-5 flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 "
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

        <h1 className="mb-6 text-xl font-bold text-zinc-900" >
          Check a URL
        </h1>

        <div className="relative">
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400">
            🔗
          </span>

          <input
            readOnly
            value={url || "https://example.com"}
            className="w-full rounded-xl bg-zinc-100 py-3 pr-3 pl-10 text-zinc-600 outline-none"
          />
        </div>

        <div className="mt-10 flex flex-col items-center">
          <div className="mb-5 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-emerald-50">
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

          <div className="flex items-center gap-3 text-sm font-medium text-zinc-500">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600" />
            Analyzing URL...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[380px] rounded-[20px] bg-white p-8 text-center shadow-lg">
      <h1 className="mb-2 text-xl font-bold text-zinc-900">
        Check a URL
      </h1>

      <p className="mb-6 text-sm text-zinc-500">
        Paste a link to see if it's safe.
      </p>

      <div className="relative mb-6">
        <span className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400">
          🔗
        </span>

        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full rounded-xl border border-zinc-200 py-3 pr-3 pl-10 outline-none focus:border-emerald-600"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mb-5 w-full rounded-xl bg-green-700 py-3.5 font-semibold text-white transition hover:bg-green-800"
      >
        Check Safety
      </button>

      <button className="text-sm font-medium text-zinc-500 hover:text-zinc-700">
        Back to protection status
      </button>
    </div>
  );
}

export default ShowUrlCard
