import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Search,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  AlertCircle,
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
        className="relative w-full max-w-2xl rounded-[32px] bg-[#FAF8F2] dark:bg-[#0D1210] border border-[#D9D6CD] dark:border-white/[0.08] shadow-warm-lg dark:shadow-[0_30px_90px_rgba(0,0,0,0.95)] text-[#171B18] dark:text-[#F3F2EC] overflow-hidden my-auto"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#D9D6CD] dark:border-white/[0.06] bg-[#E9E5DC] dark:bg-[#111814]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl overflow-hidden ring-1 ring-[#D9D6CD] dark:ring-white/10 shadow-xs">
              <img src="/safora-logo.png" alt="SAFORA" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="font-serif text-base sm:text-lg font-normal text-[#171B18] dark:text-[#F3F2EC] tracking-tight">
                  SAFORA Security Inspector
                </h3>
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full bg-[#087A5B]/10 dark:bg-[#00A878]/15 border border-[#087A5B]/20 dark:border-[#00A878]/25 text-[#087A5B] dark:text-[#00A878] font-semibold">
                  LIVE API
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#FAF8F2] dark:bg-white/[0.04] hover:bg-[#E9E5DC] dark:hover:bg-white/[0.08] text-[#5E665F] dark:text-[#9BA7A0] hover:text-[#171B18] dark:hover:text-white border border-[#D9D6CD] dark:border-white/[0.08] transition-colors cursor-pointer"
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
              <h4 className="font-serif text-2xl sm:text-3xl text-[#171B18] dark:text-[#F3F2EC] tracking-tight font-normal">
                Check any website in real time
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-[#5E665F] dark:text-[#9BA7A0] leading-relaxed font-light">
                Enter any web link to run SAFORA&rsquo;s live machine-learning detection and explainable rule engine.
              </p>
            </div>
          )}

          {/* URL Input Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative flex items-center">
              <div className="absolute left-4 text-[#727A73] dark:text-[#9BA7A0]">
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
                className="w-full pl-11 pr-28 sm:pr-36 py-3.5 sm:py-4 rounded-2xl bg-[#FAF8F2] dark:bg-[#111814] border border-[#D9D6CD] dark:border-white/[0.08] focus:border-[#087A5B] dark:focus:border-[#00A878] focus:outline-none text-xs sm:text-sm font-mono text-[#171B18] dark:text-[#F3F2EC] placeholder-[#727A73]/70 dark:placeholder-[#9BA7A0]/60 shadow-xs transition-colors"
              />
              <button
                type="submit"
                disabled={isScanning}
                className="absolute right-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs font-mono font-medium tracking-wider uppercase text-[#FAF8F2] dark:text-white bg-[#087A5B] hover:bg-[#07503F] dark:bg-[#00A878] dark:hover:bg-[#087A5B] disabled:opacity-50 transition-all cursor-pointer shadow-xs"
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
                <span className="text-[11px] font-mono text-[#5E665F] dark:text-[#9BA7A0] uppercase tracking-wider block mb-2">
                  Or test a sample URL:
                </span>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_URLS.map((sample) => (
                    <button
                      key={sample.label}
                      type="button"
                      disabled={isScanning}
                      onClick={() => handleSelectSample(sample.url)}
                      className="px-3.5 py-1.5 rounded-full text-[11px] font-mono bg-[#FAF8F2] dark:bg-[#111814] hover:bg-[#E9E5DC] dark:hover:bg-[#00A878]/15 border border-[#D9D6CD] dark:border-white/[0.08] hover:border-[#087A5B]/30 dark:hover:border-[#00A878]/40 text-[#5E665F] dark:text-[#9BA7A0] hover:text-[#087A5B] dark:hover:text-[#00A878] transition-all cursor-pointer shadow-xs"
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
                className="p-3.5 rounded-2xl bg-[#087A5B]/10 border border-[#087A5B]/20 text-xs text-[#087A5B] dark:text-[#00A878] flex items-center gap-3 font-mono"
              >
                <RefreshCw className="w-4 h-4 animate-spin shrink-0 text-[#087A5B] dark:text-[#00A878]" />
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
                      ? 'bg-red-500/[0.04] dark:bg-red-950/20 border-red-500/30 dark:border-red-500/35 shadow-[0_15px_40px_-15px_rgba(220,38,38,0.2)]'
                      : scanResult.tier === 'medium'
                      ? 'bg-amber-500/[0.04] dark:bg-amber-950/20 border-amber-500/30 dark:border-amber-500/35 shadow-[0_15px_40px_-15px_rgba(217,119,6,0.2)]'
                      : scanResult.tier === 'low'
                      ? 'bg-sky-500/[0.04] dark:bg-sky-950/20 border-sky-500/30 dark:border-sky-500/35 shadow-[0_15px_40px_-15px_rgba(2,132,199,0.2)]'
                      : 'bg-[#087A5B]/[0.04] dark:bg-[#00A878]/10 border-[#087A5B]/30 dark:border-[#00A878]/35 shadow-[0_15px_40px_-15px_rgba(8,122,91,0.2)]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06] dark:border-white/[0.06]">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#626862] dark:text-[#9BA7A0] block mb-1">
                        SAFORA VERDICT
                      </span>
                      <div className="flex items-center gap-3">
                        {scanResult.tier === 'high' ? (
                          <ShieldAlert className="w-7 h-7 text-[#DC2626] dark:text-[#EF4444] stroke-[1.6]" />
                        ) : scanResult.tier === 'medium' ? (
                          <AlertTriangle className="w-7 h-7 text-[#D97706] dark:text-[#F59E0B] stroke-[1.6]" />
                        ) : scanResult.tier === 'low' ? (
                          <AlertCircle className="w-7 h-7 text-[#0284C7] dark:text-[#38BDF8] stroke-[1.6]" />
                        ) : (
                          <ShieldCheck className="w-7 h-7 text-[#087A5B] dark:text-[#00A878] stroke-[1.6]" />
                        )}
                        <div>
                          <h4 className="font-serif text-2xl font-normal tracking-tight text-[#111512] dark:text-[#F3F2EC]">
                            {scanResult.tierMeta.title}
                          </h4>
                          <span className="text-[11px] font-mono text-[#626862] dark:text-[#9BA7A0]">
                            Status: <strong className={scanResult.tierMeta.textColor}>{scanResult.tierMeta.label}</strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Risk Score Pill */}
                    <div className="sm:text-right bg-[#FAF8F2] dark:bg-[#111814] px-5 py-3 rounded-2xl border border-[#D9D6CD] dark:border-white/[0.06] self-start sm:self-auto shadow-warm-sm">
                      <span className="text-[9px] font-mono text-[#5E665F] dark:text-[#9BA7A0] uppercase tracking-widest block">
                        Risk Score
                      </span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className={`font-serif text-2xl font-semibold ${scanResult.tierMeta.textColor}`}>
                          {(scanResult.riskScore * 100).toFixed(0)}%
                        </span>
                        <span className="text-[11px] font-mono text-[#5E665F] dark:text-[#9BA7A0]">
                          ({scanResult.riskScore.toFixed(3)})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Scanned URL Pill */}
                  <div className="mt-4 pt-2 flex items-center gap-2 text-xs font-mono text-[#5E665F] dark:text-[#9BA7A0] break-all">
                    <span className="text-[#5E665F] dark:text-[#9BA7A0] uppercase text-[10px] tracking-wider shrink-0 font-medium">
                      Scanned URL:
                    </span>
                    <span className="font-medium text-[#171B18] dark:text-[#F3F2EC] underline decoration-black/15 dark:decoration-white/10">{scanResult.scannedUrl}</span>
                  </div>

                  {/* Explanation / Why Section */}
                  <div className="mt-6 pt-6 border-t border-[#D9D6CD] dark:border-white/[0.06]">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-3.5 h-3.5 text-[#087A5B] dark:text-[#00A878]" />
                      <span className="text-[11px] font-mono uppercase tracking-[0.16em] font-semibold text-[#171B18] dark:text-[#F3F2EC]">
                        Why this result?
                      </span>
                    </div>

                    {scanResult.reasons && scanResult.reasons.length > 0 ? (
                      <div className="space-y-2.5">
                        {scanResult.reasons.map((reason, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-2xl bg-[#FAF8F2] dark:bg-[#111814] border border-[#D9D6CD] dark:border-white/[0.06] flex items-start gap-3 shadow-warm-sm"
                          >
                            <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 stroke-[1.6] ${
                              scanResult.tier === 'low'
                                ? 'text-[#0284C7] dark:text-[#38BDF8]'
                                : scanResult.tier === 'medium'
                                ? 'text-[#D97706] dark:text-[#F59E0B]'
                                : 'text-[#DC2626] dark:text-[#EF4444]'
                            }`} />
                            <p className="text-xs sm:text-sm text-[#171B18] dark:text-[#F3F2EC] leading-relaxed font-light">
                              {reason}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-[#FAF8F2] dark:bg-[#111814] border border-[#D9D6CD] dark:border-white/[0.06] space-y-2.5 shadow-warm-sm">
                        <div className="flex items-center gap-2.5 text-xs text-[#171B18] dark:text-[#F3F2EC]/90 font-light">
                          <CheckCircle2 className="w-4 h-4 text-[#087A5B] dark:text-[#00A878] shrink-0" />
                          <span>No deceptive URL patterns or credential traps detected</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-[#171B18] dark:text-[#F3F2EC]/90 font-light">
                          <CheckCircle2 className="w-4 h-4 text-[#087A5B] dark:text-[#00A878] shrink-0" />
                          <span>Domain structure appears consistent with legitimate services</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-[#171B18] dark:text-[#F3F2EC]/90 font-light">
                          <CheckCircle2 className="w-4 h-4 text-[#087A5B] dark:text-[#00A878] shrink-0" />
                          <span>Passed SAFORA machine-learning safety thresholds</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <span className="text-[11px] font-mono text-[#5E665F] dark:text-[#9BA7A0]">
                    Live detection powered by SAFORA ML backend
                  </span>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-medium text-[#171B18] dark:text-[#F3F2EC] bg-[#FAF8F2] hover:bg-[#E9E5DC] dark:bg-[#111814] dark:hover:bg-white/[0.08] border border-[#D9D6CD] dark:border-white/[0.08] transition-colors cursor-pointer shadow-warm-sm"
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
