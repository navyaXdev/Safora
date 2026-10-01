/**
 * SAFORA Real-Time Phishing Detection API Client
 * Connects to the Flask backend running on Render
 */

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_BACKEND_URL ||
  "https://safora.onrender.com"
).replace(/\/$/, "");

/**
 * Reconciled Risk Tier Classifier
 * Aligns strictly with backend label (0.5 splits Low / Medium)
 * Safe:   < 0.3
 * Low:    0.3 - 0.49
 * Medium: 0.5 - 0.69
 * High:   >= 0.7
 */
export function getRiskTier(riskScore) {
  if (typeof riskScore !== "number" || isNaN(riskScore)) return "safe";
  if (riskScore >= 0.7) return "high";
  if (riskScore >= 0.5) return "medium";
  if (riskScore >= 0.3) return "low";
  return "safe";
}

export const TIER_METADATA = {
  safe: {
    tier: "safe",
    label: "SAFE",
    badge: "Safe",
    title: "Low Risk / Legitimate",
    summary: "This website shows normal patterns consistent with legitimate web services.",
    color: "emerald",
    textColor: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-500/10 dark:bg-emerald-500/15",
    borderColor: "border-emerald-500/30",
    glowColor: "rgba(16, 185, 129, 0.25)",
  },
  low: {
    tier: "low",
    label: "LOW RISK",
    badge: "Low Risk",
    title: "Minor Anomaly Detected",
    summary: "Minor unusual pattern noted, but overall risk remains low.",
    color: "amber",
    textColor: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-500/10 dark:bg-amber-500/15",
    borderColor: "border-amber-500/30",
    glowColor: "rgba(245, 158, 11, 0.25)",
  },
  medium: {
    tier: "medium",
    label: "MEDIUM RISK",
    badge: "Medium Risk",
    title: "Suspicious Site",
    summary: "Multiple suspicious signs detected. Exercise caution before entering information.",
    color: "orange",
    textColor: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-500/10 dark:bg-orange-500/15",
    borderColor: "border-orange-500/30",
    glowColor: "rgba(249, 115, 22, 0.25)",
  },
  high: {
    tier: "high",
    label: "HIGH RISK",
    badge: "High Risk",
    title: "Dangerous / Likely Phishing",
    summary: "Strong phishing or deceptive impersonation signals found. Do NOT enter sensitive data.",
    color: "red",
    textColor: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-500/10 dark:bg-red-500/15",
    borderColor: "border-red-500/30",
    glowColor: "rgba(239, 68, 68, 0.25)",
  },
};

/**
 * Normalizes input URL so lexical features calculate accurately.
 * Defaults to https:// if scheme is missing.
 */
export function normalizeUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== "string") return "";
  let trimmed = rawUrl.trim();
  if (!trimmed) return "";
  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = `https://${trimmed}`;
  }
  return trimmed;
}

/**
 * Scans a URL using the live SAFORA backend API.
 * POST https://safora.onrender.com/predict
 * Body: { "url": "..." }
 */
export async function scanUrl(inputUrl, { timeoutMs = 60000, onSlowResponse } = {}) {
  const normalized = normalizeUrl(inputUrl);
  if (!normalized) {
    throw new Error("Please enter a website address to scan.");
  }

  try {
    const parsed = new URL(normalized);
    if (!parsed.hostname || !parsed.hostname.includes(".")) {
      throw new Error("Please enter a valid website address with a domain (e.g., example.com).");
    }
  } catch (e) {
    if (e.message && e.message.includes("valid website")) throw e;
    throw new Error("Please enter a valid website address (e.g., https://example.com).");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  let slowTimer = null;
  if (onSlowResponse) {
    slowTimer = setTimeout(() => {
      onSlowResponse();
    }, 2800);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: normalized }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    if (slowTimer) clearTimeout(slowTimer);

    if (!response.ok) {
      let errorMsg = `Backend returned status ${response.status}`;
      try {
        const errJson = await response.json();
        if (errJson && errJson.error) {
          errorMsg = errJson.error;
        }
      } catch {
        // ignore parse failure
      }
      throw new Error(errorMsg);
    }

    const data = await response.json();

    const riskScore = typeof data.risk_score === "number" ? data.risk_score : 0;
    const label = data.label || (riskScore >= 0.5 ? "phishing" : "legitimate");
    const reasons = Array.isArray(data.reasons) ? data.reasons : [];
    const tier = getRiskTier(riskScore);
    const tierMeta = TIER_METADATA[tier];

    return {
      scannedUrl: normalized,
      riskScore,
      label,
      tier,
      tierMeta,
      reasons,
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    clearTimeout(timeoutId);
    if (slowTimer) clearTimeout(slowTimer);

    if (err.name === "AbortError") {
      throw new Error(
        "Request timed out. The SAFORA cloud engine may be waking up from sleep (Render cold start). Please try scanning again."
      );
    }
    if (err.message && err.message.includes("Failed to fetch")) {
      throw new Error(
        "Unable to connect to the SAFORA detection engine. Please check your network or try again shortly."
      );
    }
    throw err;
  }
}
