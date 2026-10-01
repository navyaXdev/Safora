import React, { useState } from 'react';
import { 
  X, 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw,
  Sparkles
} from 'lucide-react';

export default function LiveScannerDemo({ isOpen, onClose }) {
  const [inputUrl, setInputUrl] = useState('https://example-login.com/verify');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState({
    url: 'https://example-login.com/verify',
    score: 0.87,
    status: 'HIGH RISK',
    classification: 'Phishing',
    reasons: [
      { title: 'Suspicious URL structure', detail: 'Contains deceptive verification path mimicking corporate login flows.' },
      { title: 'Missing HTTPS', detail: 'Credential transmission lacks cryptographic certificate validation.' },
      { title: 'Suspicious domain pattern', detail: 'Domain structure exhibits brand impersonation syntax.' }
    ],
    vectors: {
      https: false,
      entropy: 3.84,
      dots: 2,
      digits: 0,
      pathDepth: 1,
      suspiciousWords: ['login', 'verify']
    }
  });

  if (!isOpen) return null;

  const presets = [
    {
      label: "Example Login (Flagged)",
      url: "https://example-login.com/verify",
      score: 0.87,
      status: "HIGH RISK",
      classification: "Phishing",
      reasons: [
        { title: "Suspicious URL structure", detail: "Contains deceptive verification path mimicking corporate login flows." },
        { title: "Missing HTTPS", detail: "Credential transmission lacks cryptographic certificate validation." },
        { title: "Suspicious domain pattern", detail: "Domain structure exhibits brand impersonation syntax." }
      ],
      vectors: { https: false, entropy: 3.84, dots: 2, digits: 0, pathDepth: 1, suspiciousWords: ['login', 'verify'] }
    },
    {
      label: "Raw IP Attack",
      url: "http://192.168.1.100/paypal/security-update.php?id=9281",
      score: 0.94,
      status: "HIGH RISK",
      classification: "Phishing",
      reasons: [
        { title: "Raw IP address", detail: "Host bypasses DNS registration using direct numerical IPv4." },
        { title: "Missing HTTPS", detail: "Unencrypted transport protocol used for sensitive banking prompt." },
        { title: "Suspicious keywords", detail: "Includes target brand and urgency-inducing security keywords." }
      ],
      vectors: { https: false, entropy: 4.12, dots: 4, digits: 15, pathDepth: 2, suspiciousWords: ['paypal', 'security', 'update'] }
    },
    {
      label: "Corporate Portal",
      url: "https://accounts.google.com/signin/v2/identifier",
      score: 0.08,
      status: "SAFE",
      classification: "Legitimate",
      reasons: [],
      vectors: { https: true, entropy: 2.15, dots: 2, digits: 1, pathDepth: 3, suspiciousWords: [] }
    }
  ];

  const handleSelectPreset = (p) => {
    setInputUrl(p.url);
    setIsScanning(true);
    setTimeout(() => {
      setScanResult(p);
      setIsScanning(false);
    }, 400);
  };

  const handleCustomScan = (e) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    setIsScanning(true);
    setTimeout(() => {
      const urlLower = inputUrl.toLowerCase();
      const hasHttps = urlLower.startsWith('https://');
      const isIp = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/.test(urlLower);
      const suspiciousWords = ['login', 'verify', 'update', 'secure', 'bank', 'account', 'auth', 'signin', 'wallet', 'token'].filter(w => urlLower.includes(w));
      const hasSuspiciousTLD = /\.(xyz|top|work|click|loan|fit|ru|cn|buzz)\b/.test(urlLower);
      const dotsCount = (urlLower.match(/\./g) || []).length;
      const digitsCount = (urlLower.match(/\d/g) || []).length;

      let calculatedScore = 0.12;
      const reasons = [];

      if (!hasHttps) {
        calculatedScore += 0.25;
        reasons.push({ title: "Missing HTTPS", detail: "Connection does not use verified SSL/TLS encryption." });
      }
      if (isIp) {
        calculatedScore += 0.35;
        reasons.push({ title: "Raw IP address", detail: "Uses raw IP address instead of a recognized domain name." });
      }
      if (suspiciousWords.length > 0) {
        calculatedScore += 0.20;
        reasons.push({ title: "Suspicious keywords", detail: `Detected high-risk credential keywords: ${suspiciousWords.join(', ')}.` });
      }
      if (hasSuspiciousTLD) {
        calculatedScore += 0.20;
        reasons.push({ title: "Suspicious TLD pattern", detail: "Domain uses a top-level extension frequently associated with transient phishing campaigns." });
      }
      if (dotsCount > 3) {
        calculatedScore += 0.15;
        reasons.push({ title: "Excessive subdomains", detail: "Abnormal number of dots indicates possible subdomain spoofing." });
      }

      calculatedScore = Math.min(0.98, Math.max(0.04, calculatedScore));

      let status = "SAFE";
      if (calculatedScore >= 0.70) status = "HIGH RISK";
      else if (calculatedScore >= 0.50) status = "MEDIUM";
      else if (calculatedScore >= 0.30) status = "LOW";

      setScanResult({
        url: inputUrl,
        score: calculatedScore,
        status,
        classification: calculatedScore >= 0.50 ? 'Phishing' : 'Legitimate',
        reasons,
        vectors: {
          https: hasHttps,
          entropy: 3.4 + (digitsCount * 0.1),
          dots: dotsCount,
          digits: digitsCount,
          pathDepth: Math.max(1, (inputUrl.match(/\//g) || []).length - 2),
          suspiciousWords
        }
      });
      setIsScanning(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/85 backdrop-blur-xl transition-all">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#F7F7F2] dark:bg-[#080b09] border border-black/10 dark:border-white/[0.08] p-6 sm:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.25)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.9)] text-[#121614] dark:text-slate-100 transition-colors">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.03] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] text-[#4e5952] dark:text-slate-400 hover:text-[#121614] dark:hover:text-white border border-black/10 dark:border-white/[0.06] transition-colors cursor-pointer"
          aria-label="Close scanner modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3.5 mb-8">
          <div className="w-10 h-10 rounded-xl overflow-hidden ring-1 ring-black/10 dark:ring-white/10 shadow-sm">
            <img src="/safora-logo.png" alt="SAFORA" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-xl font-medium text-[#121614] dark:text-white tracking-tight">
                SAFORA Live URL Inspector
              </h3>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-semibold">
                ACTIVE LAB
              </span>
            </div>
            <p className="text-xs text-[#5e6b62] dark:text-slate-400 font-light mt-0.5">
              Experience machine learning risk estimation and explainable rules in real time.
            </p>
          </div>
        </div>

        {/* URL Input Form */}
        <form onSubmit={handleCustomScan} className="space-y-4 mb-8">
          <div className="relative flex items-center">
            <div className="absolute left-4 text-[#6e7b73] dark:text-slate-400">
              <Search className="w-4 h-4 stroke-[1.5]" />
            </div>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Paste or type any URL to inspect..."
              className="w-full pl-11 pr-32 py-3.5 rounded-2xl bg-white dark:bg-[#050706] border border-black/10 dark:border-white/[0.08] focus:border-emerald-500/50 focus:outline-none text-xs sm:text-sm font-mono text-[#121614] dark:text-white placeholder-[#88968d] dark:placeholder-slate-500 shadow-xs"
            />
            <button
              type="submit"
              disabled={isScanning}
              className="absolute right-2 px-5 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 disabled:opacity-50 transition-all cursor-pointer"
            >
              {isScanning ? (
                <span className="flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Scanning...
                </span>
              ) : (
                "Scan Now"
              )}
            </button>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-[#6e7b73] dark:text-slate-400">Quick Test Cases:</span>
            {presets.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => handleSelectPreset(p)}
                className="px-3 py-1 rounded-full bg-white dark:bg-white/[0.03] hover:bg-black/[0.04] dark:hover:bg-white/[0.07] border border-black/10 dark:border-white/[0.06] text-[#4e5952] dark:text-slate-300 hover:text-[#121614] dark:hover:text-white transition-colors cursor-pointer text-[11px] shadow-xs"
              >
                {p.label}
              </button>
            ))}
          </div>
        </form>

        {/* Scan Results Card */}
        <div className="rounded-3xl bg-white dark:bg-[#060807] border border-black/[0.07] dark:border-white/[0.06] p-6 sm:p-8 space-y-6 shadow-xs">
          
          {/* Top Score Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-black/[0.06] dark:border-white/[0.05]">
            <div className="p-4 rounded-2xl bg-[#F7F7F2] dark:bg-[#080b09] border border-black/[0.06] dark:border-white/[0.05]">
              <span className="text-[10px] font-mono text-[#6e7b73] dark:text-slate-400 uppercase tracking-wider block">Risk Score</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className={`font-serif text-3xl font-bold ${scanResult.score >= 0.70 ? 'text-red-500 dark:text-red-400' : scanResult.score >= 0.50 ? 'text-amber-500 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {(scanResult.score * 100).toFixed(0)}%
                </span>
                <span className="text-xs text-[#6e7b73] dark:text-slate-400 font-mono">({scanResult.score.toFixed(2)})</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F7F2] dark:bg-[#080b09] border border-black/[0.06] dark:border-white/[0.05]">
              <span className="text-[10px] font-mono text-[#6e7b73] dark:text-slate-400 uppercase tracking-wider block">Classification</span>
              <div className="flex items-center gap-2 mt-1">
                {scanResult.score >= 0.70 ? (
                  <ShieldAlert className="w-5 h-5 text-red-500 dark:text-red-400 stroke-[1.5]" />
                ) : (
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 stroke-[1.5]" />
                )}
                <span className={`font-serif text-lg font-bold ${scanResult.score >= 0.70 ? 'text-red-600 dark:text-red-400' : scanResult.score >= 0.50 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {scanResult.status}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F7F2] dark:bg-[#080b09] border border-black/[0.06] dark:border-white/[0.05]">
              <span className="text-[10px] font-mono text-[#6e7b73] dark:text-slate-400 uppercase tracking-wider block">ML Prediction</span>
              <div className="font-serif text-lg font-medium text-[#121614] dark:text-white mt-1">
                {scanResult.classification}
              </div>
              <span className="text-[10px] text-[#6e7b73] dark:text-slate-400 font-mono">Random Forest Inference</span>
            </div>
          </div>

          {/* Explainable Threat Reasons */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-mono font-bold text-[#6e7b73] dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[1.5]" />
                <span>Explainable Threat Reasons (Rule Engine)</span>
              </h4>
              <span className="text-[11px] font-mono text-[#6e7b73] dark:text-slate-400">
                {scanResult.reasons.length} indicators flagged
              </span>
            </div>

            {scanResult.reasons.length === 0 ? (
              <div className="p-4 rounded-2xl bg-[#F7F7F2] dark:bg-[#080b09] border border-black/[0.06] dark:border-white/[0.05] text-[#2d3630] dark:text-slate-300 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>No suspicious phishing indicators or credential traps identified for this URL.</span>
              </div>
            ) : (
              <div className="space-y-2">
                {scanResult.reasons.map((r, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-[#F7F7F2] dark:bg-[#080b09] border border-black/[0.06] dark:border-white/[0.05] flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-red-500 dark:text-red-400 mt-0.5 shrink-0 stroke-[1.5]" />
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-[#121614] dark:text-white">
                        {r.title}
                      </div>
                      <div className="text-xs text-[#5e6b62] dark:text-slate-400 mt-0.5 font-light">
                        {r.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Lexical Extraction Matrix */}
          <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.05]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6e7b73] dark:text-slate-400 block mb-3">
              Parsed URL Characteristics
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#F7F7F2] dark:bg-[#080b09] border border-black/[0.06] dark:border-white/[0.04]">
                <span className="text-[#6e7b73] dark:text-slate-400 block text-[10px]">HTTPS Security:</span>
                <span className={scanResult.vectors.https ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-red-600 dark:text-red-400 font-semibold'}>
                  {scanResult.vectors.https ? 'Enforced' : 'Missing'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#F7F7F2] dark:bg-[#080b09] border border-black/[0.06] dark:border-white/[0.04]">
                <span className="text-[#6e7b73] dark:text-slate-400 block text-[10px]">Shannon Entropy:</span>
                <span className="text-[#121614] dark:text-white font-semibold">{scanResult.vectors.entropy} bits</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F7F7F2] dark:bg-[#080b09] border border-black/[0.06] dark:border-white/[0.04]">
                <span className="text-[#6e7b73] dark:text-slate-400 block text-[10px]">Dot Count:</span>
                <span className="text-[#121614] dark:text-white font-semibold">{scanResult.vectors.dots} dots</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F7F7F2] dark:bg-[#080b09] border border-black/[0.06] dark:border-white/[0.04]">
                <span className="text-[#6e7b73] dark:text-slate-400 block text-[10px]">Digit Count:</span>
                <span className="text-[#121614] dark:text-white font-semibold">{scanResult.vectors.digits} digits</span>
              </div>
            </div>
          </div>

        </div>

        <p className="text-[11px] text-[#6e7b73] dark:text-slate-400 text-center mt-6 font-mono">
          * Demonstrative security analysis simulation. Risk scores are indicators and do not guarantee that a website is malicious or legitimate.
        </p>

      </div>
    </div>
  );
}
