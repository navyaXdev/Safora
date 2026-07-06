<p align="center">
  <img src="./assets/safora_banner.png" alt="Safora - You're protected now" width="700"/>
</p>

<h1 align="center">Grandma's Guardians (SAFORA)</h1>
<p align="center"><b>Real-time phishing URL detection — Chrome Extension + ML Backend</b></p>

**Hackathon:** NYC CodeQuest 2026 — Challenge CYBER-01
**Team:** Suraj (ML/Backend, Lead) · Mohit (Chrome Extension/Frontend) · Kartikey (UI/UX Designer) · Dinesh (Security Architecture & Rule Logic/Domain Knowledge)

---

## 📌 Overview

Real-time phishing URL detection delivered as a Chrome extension. A user's
browsing is scanned automatically; any URL can also be checked manually or via
right-click. Detection combines a trained ML risk score with an independent,
plain-English rule-based explanation layer, so the extension tells people not
just *that* a site is risky but *why*.

SAFORA watches for suspicious links, fake login pages, and risky sender
patterns while the user browses — warnings are always one click away.

---

## 🏗️ System Architecture

```
+-----------------------------------------------+
|  Chrome Extension (Mohit - React + Tailwind)   |
|  - Automatic scan on page load                 |
|  - Manual URL scanner                          |
|  - Right-click "Scan with Safora"               |
|  - chrome.storage for cross-popup state         |
|  - Per-tab isolated scan results (tabId)        |
+---------------------+---------------------------+
                      | POST /predict  {"url": "..."}
                      v
+-----------------------------------------------+
|  Flask API (Suraj) - deployed on Render        |
|  https://example.onrender.com/predict           |
+---------------------+---------------------------+
|  extract_features()      get_reasons()         |
|  (11 lexical features)   (7 rules, Kartikey)   |
|         v                       v              |
|  RandomForestClassifier   Rule-based checks     |
|  -> risk_score (0-1)      -> reasons[]          |
+---------------------+---------------------------+
                      v
    {"risk_score": 0.87, "label": "phishing",
     "reasons": ["...", "..."]}
```

**Risk tier mapping — backend and frontend now reconciled.** The backend
returns a strictly binary `label` (`"phishing"` / `"legitimate"`, threshold
0.5) plus a continuous `risk_score`. The extension displays a four-tier UI on
top of that score:

| Tier | `risk_score` range | Agrees with backend `label` |
|---|---|---|
| Safe | < 0.3 | `legitimate` |
| Low | 0.3 – 0.49 | `legitimate` |
| Medium | 0.5 – 0.69 | `phishing` |
| High | >= 0.7 | `phishing` |

This boundary placement (0.5 splits Low/Medium) was chosen specifically so no
`risk_score` produces a frontend tier that contradicts the backend's binary
decision. **Previous tier boundaries (0.1/0.4/0.7) created a band between 0.4
and 0.5 where the frontend showed "medium risk" while the backend had already
classified the URL as legitimate — resolved as of this write-up.** If judges
ask how "Suspicious"/"Medium" is defined, the answer is the table above, not
"the extension decides."

```javascript
// Current, reconciled version — API/frontend/src wherever tiering happens
function getRiskTier(riskScore) {
    if (riskScore >= 0.7) return 'high';
    if (riskScore >= 0.5) return 'medium';
    if (riskScore >= 0.3) return 'low';
    return 'safe';
}
```

---

## 🖥️ Frontend — Chrome Extension (Mohit)

### Features

- **Automatic Website Scanning** — every visited site is scanned in real time,
  no user interaction required
- **Manual URL Scanner** — check any URL before opening it
- **Double Protection System** — if a site is already flagged Dangerous and
  the user attempts to enter sensitive info (username, password, personal
  details), a second check fires with an additional warning
- **Right-Click Context Menu Scanner** — scan any link directly from the
  browser's context menu
- **Risk Score & Security Classification** — numerical score plus the
  four-tier classification (table above)
- **Threat Explanation** — surfaces the backend's `reasons[]` so users see
  *why* a site was flagged, not just a verdict
- **Smart Warning Overlay** — on-page warning banner for high-risk sites
- **Clean & Modern Interface** — React + Tailwind CSS, dark/light mode support
- **Privacy-First Design** — only processes what's needed for the security
  check; no unnecessary data collection

### Technical Challenges & Solutions

**1. Managing Popup State**
*Challenge:* Chrome extension popups are destroyed on close, losing scan
results and any in-flight updates.
*Solution:* State moved to `chrome.storage`. The background service worker
persists the latest scan result; the popup reads from storage on open, so it
always reflects current status even if it wasn't open during the scan.

**2. Separating Automatic and Manual Scan Data**
*Challenge:* Automatic and manual scans originally shared state — a manual
scan would overwrite the active tab's real security status.
*Solution:* Automatic and manual scan data split into independent stores, so
a manual check no longer corrupts the current site's live status.

**3. Handling Multiple Browser Tabs**
*Challenge:* Scan results leaked across tabs with no tab-level isolation.
*Solution:* Every scan result is now keyed to Chrome's `tabId`, so warnings,
scores, and UI state are fully isolated per tab.

---

## ⚙️ Backend — ML + Flask API (Suraj)

### Status

**Deployed and verified end-to-end.** Live at
`https://example.onrender.com/predict`, tested against the deployed instance
(not just locally) as of this session.

### Design Principle — Decoupling

`risk_score` comes exclusively from `model.predict_proba()`. `reasons` comes
exclusively from an independent rule engine (Kartikey). Neither depends on the
other's internals — this let ML and rule-logic work happen in parallel, and it
means the system can still explain itself even where the model's decision
boundary is hard to interpret. The cost, disclosed below: the two can
legitimately diverge — a URL can score high risk with few or zero itemized
reasons.

### Dataset

1. **Phishing (label=1):** Kaggle-sourced, cross-referenced with PhishTank-style
   examples. 159,244 rows after cleaning.
2. **Legitimate (label=0):** `balanced_urls.csv`, real-world scraped URLs —
   87.2% contain genuine paths/subdomains/query strings, not bare domains.
   316,254 rows.

*(Row counts as reported in the original dataset-selection session — not
independently re-verified this session; confirm against the actual CSVs if
precision matters for judging.)*

**Data cleaning:**
- Removed ~440 fabricated/templated rows (`safeexample1.net`, `university1.edu`,
  etc. — programmatic placeholders, not real sites)
- Fixed a scheme-prefix gap: ~11% of `balanced_urls.csv` rows lacked
  `http://`/`https://`, which would have misread `has_https` as false-absent
  rather than unknown; all schemeless rows normalized before feature extraction
- Deliberately excluded `balanced_urls.csv`'s "malicious" class (mixed malware
  and compromised-site content — out of this project's phishing-specific scope)

**Dataset iteration history (the core technical story — don't bury it):**
An earlier iteration used Tranco (bare top-visited domains) as the legitimate
class. This caused the model to learn "any URL with a path = phishing," since
its only clean examples were path-less. Tested on
`mail.google.com/mail/u/0/#inbox` -> 99.6% phishing risk. Diagnosed via
`feature_importances_`: two features (`num_dots`, `num_subdirs`) accounted for
60%+ of decision weight — a shortcut, not a real signal. A third candidate
dataset was checked and rejected before settling on `balanced_urls.csv` — it
had 0% path diversity in its legitimate class and would have reproduced the
same flaw. Fixed by switching to `balanced_urls.csv`; re-tested the same 11
hard-case URLs, 9 of 11 corrected.

**Retrain history:** 5 retrains specifically targeting the leakage problem —
from a 1.00-recall baseline (later proven false via real-world testing) through
intermediate synthetic-template attempts (0.96, then 0.92, leakage shifting
rather than resolving) and a feature-removal experiment (precision collapsed to
0.14, reverted), landing on the real-dataset swap (0.937 mean CV recall,
verified against real-world cases). *(Retrain count and trajectory confirmed
by the team from memory; no saved logs/notebooks independently verify the
intermediate 0.96/0.92/0.14 figures — locate supporting artifacts, e.g. git
history or saved output, before the demo in case a judge asks to see them.)*

### Feature Engineering

11 lexical, URL-string-only features — no external lookups, kept fast and
dependency-free:

| Feature | Description |
|---|---|
| `has_https` | Boolean — HTTPS in use |
| `num_dots` | Count of `.` characters |
| `url_length` | Total character count |
| `digits_count` | Count of numeric characters |
| `special_char_count` | Count of `-_@?=&` characters |
| `has_ip` | Raw IP address instead of domain (regex) |
| `num_subdirs` | Path depth |
| `suspicious_words` | Matches against a 22-word list (`login`, `verify`, `urgent`, etc.) |
| `num_params` | Query string complexity (`?`/`&` count) |
| `suspicious_tld` | Binary flag for commonly-abused TLDs |
| `entropy` | Shannon entropy of the URL string |

`extract_features()` is duplicated between `train.py` and `app.py` by design
(see Rule Layer maintenance note) — both must stay in sync; verified matching
via direct diff as of this session.

**Feature importances (current deployed model):**

| Feature | Importance |
|---|---|
| `num_subdirs` | 0.321 |
| `has_https` | 0.201 |
| `url_length` | 0.134 |
| `has_ip` | 0.115 |
| `digits_count` | 0.093 |
| `entropy` | 0.047 |
| `num_dots` | 0.046 |
| `special_char_count` | 0.025 |
| `suspicious_tld` | 0.018 |
| `num_params` | 0.016 |
| `suspicious_words` | 0.0003 |

`num_subdirs` remains the single largest weight at 32% even after the leakage
fix — worth being ready to explain this isn't a residual leakage signal but a
genuinely informative feature (phishing URLs skew toward deep/obfuscated
paths), distinct from the earlier *combined* 60%+ concentration in the leaky
model.

### Model

**Algorithm:** RandomForestClassifier
```python
RandomForestClassifier(
    n_estimators=100, class_weight='balanced',
    max_depth=10, min_samples_leaf=5, random_state=42
)
```

**Performance:**
- 5-fold cross-validation: **mean recall 0.937, std 0.046**
- Per-class recall (held-out test set): legitimate 0.98, phishing 0.94 —
  confirmed via direct classification_report output this session (precision
  0.97/0.97, recall 0.98/0.94, f1 0.98/0.95)
- 9 of 11 real-world hard-case URLs correctly classified after the dataset fix
- Do not cite the earlier 0.98-1.00 figures from the Tranco run — inflated by
  data leakage, not genuine generalization
- Decision: 0.937 accepted as sufficient for this submission; no further
  tuning planned

**Known rough edge:** every prediction triggers a
`UserWarning: X does not have valid feature names` from scikit-learn, because
feature input is passed as a plain list rather than a DataFrame with named
columns. Not currently causing wrong predictions (feature order is verified
matching between `train.py` and `app.py`), but it's a latent risk — if the two
`feature_cols` lists ever drift out of sync, this warning will not catch it,
and predictions will silently be wrong. Fix (optional, ~10 min): wrap model
input in a `pd.DataFrame(..., columns=feature_cols)` in both files.

### Rule Layer (Kartikey) — independent of the model

`phishing_rules_fixed_v2.py`, 7 rules:

1. IP address instead of domain
2. Digit substitution for letters (`g00gle.com`, `paypa1.com`)
3. No HTTPS
4. Urgent/threatening keywords — **corroboration-gated**, fires only if >=1
   other rule also triggers
5. Excessive subdomains (>3 dots)
6. Downloadable file extension in path
7. Suspicious TLD — **corroboration-gated**, same reasoning as Rule 4

**Maintenance note:** two independent implementations exist in this file
(`evaluate_phishing_rules` for the test harness, `get_reasons` for what the API
actually returns) — a known fragility, not a design choice. A built-in
consistency check (`python phishing_rules_fixed_v2.py`) compares both across 19
test URLs; verified zero mismatches as of this session.

### API Contract

**`POST /predict`**

Request: `{"url": "http://suspicious-site.com"}`

Response:
```json
{
  "risk_score": 0.87,
  "label": "phishing",
  "reasons": ["This link is not secure...", "This link is trying to scare you..."]
}
```

- `label` is strictly binary (`"phishing"` / `"legitimate"`, threshold 0.5) —
  see the reconciled tier table under Architecture above
- `reasons` may legitimately be empty even when `risk_score` is high — expected
  decoupled behavior, not a bug

### Deployment (Render)

- Root directory: `API` · Language: Python 3 · Build: `pip install -r requirements.txt`
- Start: `gunicorn app:app` (not the Flask dev server — single-threaded, not
  production-suitable)
- Python pinned via `.python-version` at repo root (`3.13.9`), confirmed
  correctly picked up by Render's build
- Free tier cold-start: 30-50s after 15 min idle — **test before the demo, hit
  the URL a minute ahead of time**

### Known Limitations (state proactively, don't wait to be asked)

1. **Keyword-density false positives on legitimate auth flows.** Isolated and
   confirmed: `secure.chase.com/` alone scores 0.016 (correct), but
   `secure.chase.com/web/auth/login` scores 0.769 (flagged phishing) with
   **zero rule-based reasons**. Cause: the `suspicious_words` feature counts
   words like "login"/"auth"/"verify" anywhere in the URL and can't
   distinguish a genuine auth page from a phishing lure using the same
   vocabulary. Structural limitation of keyword-density features, not a
   training-data bug. This score falls in the "High" frontend tier (>= 0.7),
   so the UI will show this as a strong warning on a real bank login page if
   demoed live.
2. **`mail.google.com` — path-dependent, not model-version-dependent.**
   Resolved a prior discrepancy: bare `mail.google.com/` scores 0.009
   (correct); the deep-path `mail.google.com/mail/u/0/#inbox` scores 0.732
   (elevated, "High" tier) — these are two different URLs, not two different
   model states. The elevated score is a real, reproducible limitation of the
   deep-path case specifically.
3. **`risk_score` and `reasons` can legitimately diverge** — several model
   features have no rule-layer equivalent, so high-risk results don't always
   come with itemized explanations.
4. Urgency-keyword and suspicious-TLD rules require corroboration before
   firing — deliberate precision/recall tradeoff, not an oversight.
5. Scope is phishing detection specifically, not general malware or
   compromised-site detection.

### Backend Setup

```bash
cd API
pip install -r requirements.txt
python app.py
# http://127.0.0.1:5000

curl -X POST http://127.0.0.1:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"url": "http://paypa1.com/login"}'
```

Requires `scikit-learn==1.7.2` exactly — pinned to match `model.pkl`'s training
environment; a mismatch can throw `InconsistentVersionWarning` and silently
change output.

---

## 🚀 Frontend Installation

Follow the steps below to set up the Safora Chrome Extension locally.

### Prerequisites

Before you begin, ensure you have:

* **Node.js** installed
* **npm** (comes with Node.js)
* **Google Chrome**

### 1. Clone the Repository

```bash
git clone https://github.com/navyaXdev/Safora.git
cd Safora/frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure the Backend URL

The frontend communicates with the backend server using its API URL.

Update the backend URL in the following locations:

* `.env`
* `manifest.json`
* `src/config.js`

> **Note:** Ensure the backend server is running before using the extension.

### 4. Build the Extension

Generate the production build:

```bash
npm run build
```

This creates a `dist` folder containing the extension.

### 5. Load the Extension in Chrome

1. Open Chrome.
2. Navigate to:

```
chrome://extensions
```

3. Enable **Developer mode** (top-right).
4. Click **Load unpacked**.
5. Select the generated `dist` folder.

The Safora extension is now installed and ready to use.

### Development

Whenever you make changes to the source code:

```bash
npm run build
```

Then reload the extension from the **Chrome Extensions** page by clicking the **Reload** button on the Safora extension card.

### Troubleshooting

**Extension fails to load**
* Make sure you selected the **dist** folder, not the project root.
* Run `npm run build` again if the `dist` folder is missing.

**Backend requests fail**
* Verify that the backend server is running.
* Ensure the backend URL is correctly configured in:
  * `.env`
  * `manifest.json`
  * `src/config.js`

**Changes are not reflected**
1. Open `chrome://extensions`
2. Click **Reload** on the Safora extension.
3. Refresh the webpage where the extension is being used.

---

<p align="center"><i>Built with ❤️ for NYC CodeQuest 2026 by Team SAFORA</i></p>