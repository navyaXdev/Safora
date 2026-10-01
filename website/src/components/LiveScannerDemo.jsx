import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Search,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Info,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  ExternalLink,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { scanUrl, TIER_METADATA } from '@/lib/api';

const SAMPLE_URLS = [
  { label: 'Google (Legitimate)', url: 'https://google.com' },
  { label: 'GitHub (Legitimate)', url: 'https://github.com' },
  { label: 'Raw IP Login (Suspicious)', url: 'http://192.168.1.1/login/verify-account/bank.php' },
  { label: 'Brand Check (Deceptive)', url: 'https://paypal-security-check.xyz/login/verify' }
];

export default function LiveScannerDemo({ isOpen, onClose }) {
  const [inputUrl, setInputUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isSlow, setIsSlow] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleScan = async (urlToScan) => {
    const target = (urlToScan || inputUrl || '').trim();
    if (!target) {
      setErrorMessage('Please enter a website address to check.');
      return;
    }

    setErrorMessage('');
    setIsScanning(true);
    setIsSlow(false);

    try {
      const result = await scanUrl(target, {
        timeoutMs: 50000,
        onSlowResponse: () => setIsSlow(true)
      });
      setScanResult(result);
    } catch (err) {
      setErrorMessage(err.message || 'Unable to scan this address. Please try again.');
    } finally {
      setIsScanning(false);
      setIsSlow(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleScan(inputUrl);
  };

  const handleSelectSample = (sampleUrl) => {
    setInputUrl(sampleUrl);
    handleScan(sampleUrl);
  };

  const handleReset = () => {
    setScanResult(null);
    setErrorMessage('');
    setInputUrl('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 dark:bg-black/85 backdrop-blur-2xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl rounded-[32px] bg-[#FAF9F5] dark:bg-[#070a08] border border-black/10 dark:border-white/[0.08] shadow-[0_25px_60px_-15px_rgba(20,25,22,0.18)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.9)] text-[#141916] dark:text-slate-100 overflow-hidden my-auto"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-black/[0.06] dark:border-white/[0.06] bg-[#F3F2EC] dark:bg-[#0b0e0c]/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl overflow-hidden ring-1 ring-black/10 dark:ring-white/10 shadow-xs">
              <img src="/safora-logo.png" alt="SAFORA" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-base sm:text-lg font-medium text-[#141916] dark:text-white tracking-tight">
                  SAFORA Security Inspector
                </h3>
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-400 font-semibold">
                  LIVE API
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] text-[#55635B] dark:text-slate-400 hover:text-[#141916] dark:hover:text-white border border-black/10 dark:border-white/[0.08] transition-colors cursor-pointer"
            aria-label="Close scanner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Introductory Prompt */}
          {!scanResult && (
            <div>
              <h4 className="font-serif text-2xl sm:text-3xl text-[#141916] dark:text-white tracking-tight font-normal">
                Check any website in real time
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-[#4A544E] dark:text-slate-400 leading-relaxed font-light">
                Enter any web link to run SAFORA's live machine-learning detection and explainable rule engine.
              </p>
            </div>
          )}

          {/* URL Input Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative flex items-center">
              <div className="absolute left-4 text-[#7e8b83] dark:text-slate-400">
                <Search className="w-4 h-4 stroke-[1.5]" />
              </div>
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => {
                  setInputUrl(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                disabled={isScanning}
                placeholder="Enter website URL (e.g. example.com)..."
                className="w-full pl-11 pr-28 sm:pr-36 py-3.5 sm:py-4 rounded-2xl bg-white dark:bg-[#0c100e] border border-black/10 dark:border-white/[0.08] focus:border-emerald-500/50 focus:outline-none text-xs sm:text-sm font-mono text-[#141916] dark:text-white placeholder-[#88968d] dark:placeholder-slate-500 shadow-xs transition-colors"
              />
              <button
                type="submit"
                disabled={isScanning}
                className="absolute right-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 disabled:opacity-50 transition-all cursor-pointer shadow-xs"
              >
                {isScanning ? (
                  <span className="flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Scanning</span>
                  </span>
                ) : (
                  <span>Scan</span>
                )}
              </button>
            </div>

            {/* Quick Test Samples */}
            {!scanResult && (
              <div className="pt-2">
                <span className="text-[11px] font-mono text-[#7e8b83] dark:text-slate-500 uppercase tracking-wider block mb-2">
                  Or test a sample URL:
                </span>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_URLS.map((sample) => (
                    <button
                      key={sample.label}
                      type="button"
                      disabled={isScanning}
                      onClick={() => handleSelectSample(sample.url)}
                      className="px-3 py-1.5 rounded-full text-[11px] font-mono bg-[#F3F2EC] dark:bg-white/[0.03] hover:bg-emerald-500/10 dark:hover:bg-emerald-500/15 border border-black/10 dark:border-white/[0.08] hover:border-emerald-500/40 text-[#4A544E] dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all cursor-pointer"
                    >
                      {sample.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </form>

          {/* Cold-Start Informative Notice */}
          <AnimatePresence>
            {isSlow && isScanning && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-3"
              >
                <RefreshCw className="w-4 h-4 animate-spin shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>
                  Waking up cloud detection engine on Render... This initial cold-start check may take a few moments.
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message Banner */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="p-4 rounded-2xl bg-red-500/10 border border-red-500/25 text-red-700 dark:text-red-300 text-xs sm:text-sm flex items-start gap-3"
              >
                <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium">{errorMessage}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* REAL Scan Result View */}
          <AnimatePresence>
            {scanResult && !isScanning && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-5"
              >
                {/* Result Hero Card */}
                <div
                  className={`rounded-3xl p-6 sm:p-8 border transition-all ${
                    scanResult.tier === 'high'
                      ? 'bg-red-500/[0.04] dark:bg-red-950/20 border-red-500/30 shadow-[0_15px_40px_-15px_rgba(239,68,68,0.2)]'
                      : scanResult.tier === 'medium'
                      ? 'bg-orange-500/[0.04] dark:bg-orange-950/20 border-orange-500/30 shadow-[0_15px_40px_-15px_rgba(249,115,22,0.2)]'
                      : scanResult.tier === 'low'
                      ? 'bg-amber-500/[0.04] dark:bg-amber-950/20 border-amber-500/30 shadow-[0_15px_40px_-15px_rgba(245,158,11,0.2)]'
                      : 'bg-emerald-500/[0.04] dark:bg-emerald-950/20 border-emerald-500/30 shadow-[0_15px_40px_-15px_rgba(16,185,129,0.2)]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06] dark:border-white/[0.06]">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#6e7b73] dark:text-slate-400 block mb-1">
                        SAFORA VERDICT
                      </span>
                      <div className="flex items-center gap-3">
                        {scanResult.tier === 'high' ? (
                          <ShieldAlert className="w-7 h-7 text-red-600 dark:text-red-400 stroke-[1.6]" />
                        ) : scanResult.tier === 'medium' ? (
                          <AlertTriangle className="w-7 h-7 text-orange-600 dark:text-orange-400 stroke-[1.6]" />
                        ) : scanResult.tier === 'low' ? (
                          <Info className="w-7 h-7 text-amber-600 dark:text-amber-400 stroke-[1.6]" />
                        ) : (
                          <ShieldCheck className="w-7 h-7 text-emerald-600 dark:text-emerald-400 stroke-[1.6]" />
                        )}
                        <div>
                          <h4 className="font-serif text-2xl font-bold tracking-tight text-[#141916] dark:text-white">
                            {scanResult.tierMeta.title}
                          </h4>
                          <span className="text-[11px] font-mono text-[#4A544E] dark:text-slate-400">
                            Status: <strong className={scanResult.tierMeta.textColor}>{scanResult.tierMeta.label}</strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Risk Score Pill */}
                    <div className="sm:text-right bg-white/90 dark:bg-black/50 px-5 py-3 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] self-start sm:self-auto shadow-xs">
                      <span className="text-[9px] font-mono text-[#6e7b73] dark:text-slate-400 uppercase tracking-widest block">
                        Risk Score
                      </span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className={`font-serif text-2xl font-bold ${scanResult.tierMeta.textColor}`}>
                          {(scanResult.riskScore * 100).toFixed(0)}%
                        </span>
                        <span className="text-[11px] font-mono text-[#6e7b73] dark:text-slate-400">
                          ({scanResult.riskScore.toFixed(3)})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Scanned URL Pill */}
                  <div className="mt-4 pt-2 flex items-center gap-2 text-xs font-mono text-[#4A544E] dark:text-slate-300 break-all">
                    <span className="text-[#88968d] dark:text-slate-500 uppercase text-[10px] tracking-wider shrink-0">
                      Scanned URL:
                    </span>
                    <span className="font-medium underline decoration-black/10 dark:decoration-white/10">{scanResult.scannedUrl}</span>
                  </div>

                  {/* Explanation / Why Section */}
                  <div className="mt-6 pt-6 border-t border-black/[0.06] dark:border-white/[0.06]">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                      <span className="text-[11px] font-mono uppercase tracking-[0.16em] font-semibold text-[#141916] dark:text-white">
                        Why this result?
                      </span>
                    </div>

                    {scanResult.reasons && scanResult.reasons.length > 0 ? (
                      <div className="space-y-2.5">
                        {scanResult.reasons.map((reason, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-2xl bg-white/90 dark:bg-black/50 border border-black/[0.06] dark:border-white/[0.06] flex items-start gap-3 shadow-xs"
                          >
                            <AlertTriangle className="w-4 h-4 text-red-500 dark:text-red-400 mt-0.5 shrink-0 stroke-[1.6]" />
                            <p className="text-xs sm:text-sm text-[#141916] dark:text-slate-200 leading-relaxed font-light">
                              {reason}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-white/90 dark:bg-black/50 border border-black/[0.06] dark:border-white/[0.06] space-y-2.5 shadow-xs">
                        <div className="flex items-center gap-2.5 text-xs text-[#2d3630] dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                          <span>No deceptive URL patterns or credential traps detected</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-[#2d3630] dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                          <span>Domain structure appears consistent with legitimate services</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-[#2d3630] dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                          <span>Passed SAFORA machine-learning safety thresholds</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <span className="text-[11px] font-mono text-[#7e8b83] dark:text-slate-400">
                    Live detection powered by SAFORA ML backend
                  </span>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-medium text-[#141916] dark:text-white bg-[#F3F2EC] dark:bg-white/[0.05] hover:bg-black/[0.06] dark:hover:bg-white/[0.1] border border-black/10 dark:border-white/[0.08] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Scan Another Website</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </div>
  );
}
