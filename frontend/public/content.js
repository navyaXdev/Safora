let currentTier = "safe";
let passwordWarningShown = false;
chrome.runtime.onMessage.addListener((message) => {

  if (message.type === "SCAN_RESULT") {
    const tier = getRiskTier(message.data.risk_score);
    currentTier = tier;

    removeExisting();
    displayWarning(message,tier);

   
  }

  if (message.type === "CONTEXT_CHECK_RESULT") {
    showContextCheckToast(message, message.url);
  }
});


async function displayWarning(message,tier){
  const {showWarnings=true} = await chrome.storage.local.get("showWarnings")

   if (tier === "high") {
      showFullWarning(message.data, tier);
    } else if (showWarnings && (tier === "medium" || tier === "low")) {
      showBanner(message.data, tier);
    }
}



function removeExisting() {
  const overlay = document.getElementById("cyberX-overlay");
  if (overlay) overlay.remove();
  const banner = document.getElementById("cyberX-banner");
  if (banner) banner.remove();
}

function showFullWarning(data, tier) {
  const element = document.createElement("div");
  element.id = "cyberX-overlay";
  const cfg = TIER_CONFIG[tier];
  const hasReasons = Array.isArray(data.reasons) && data.reasons.length > 0;
  const reasonsHtml = hasReasons
    ? `<ul style="text-align:left;margin:16px 0;padding-left:20px;line-height:1.6;">${data.reasons
        .map((r) => `<li>${escapeHtml(r)}</li>`)
        .join("")}</ul>`
    : `<p style="margin:16px 0;">This site matches known scam patterns.</p>`;
  element.innerHTML = ` 
    
      <div style="position:fixed;
        inset:0;
        background:rgba(10,10,10,0.95);
                z-index:2147483647;display:flex;align-items:center;
                justify-content:center;font-family:-apple-system,Segoe UI,Roboto,sans-serif;">
          <div style="max-width:480px;width:90%;text-align:center;color:#fff;
                  background:#18181b;border:1px solid ${cfg.color};
                  border-radius:16px;padding:32px;">
        <div style="font-size:48px;margin-bottom:8px;">\u26A0\uFE0F</div>
        <h1 style="font-size:22px;margin:0 0 8px;">This site looks like a scam</h1>
        <p style="color:#a1a1aa;margin:0 0 4px;font-size:14px;">
          Detected as <strong style="color:${cfg.color};">${escapeHtml(tier)}</strong>
          &middot; risk score ${Math.round(data.risk_score * 100)}%
        </p>
        ${reasonsHtml}
        <div style="display:flex;gap:12px;justify-content:center;margin-top:20px;">
          <button id="cyberX-leave" style="background:#ef4444;color:#fff;border:none;
              padding:10px 20px;border-radius:8px;font-size:14px;cursor:pointer;">
            Leave this site
          </button>
          <button id="cyberX-proceed" style="background:transparent;color:#a1a1aa;
              border:1px solid #3f3f46;padding:10px 20px;border-radius:8px;
              font-size:14px;cursor:pointer;">
            Proceed anyway
          </button>
        </div>
        </div>
      </div>`;

  document.documentElement.appendChild(element);
  document.getElementById("cyberX-leave").addEventListener("click", () => {
    window.location.href = "https://www.google.com";
  });

  document.getElementById("cyberX-proceed").addEventListener("click", () => {
    element.remove();
  });
}

function showBanner(data, tier) {
  const cfg = TIER_CONFIG[tier];
  const banner = document.createElement("div");
  banner.id = "cyberX-banner";
  banner.innerHTML = `
    <div style="
    position:fixed; 
    top:0;
    left:0;
    right:0;
    z-index:2147483647;
    background:${cfg.color};
    color:#1a1a1a;
    font-family:-apple-system,Segoe UI,Roboto,sans-serif;
    padding:10px 16px;
    display:flex;
    align-items:center;
    justify-content:center;
    gap:12px;
    font-size:14px;">
      <span>\u26A0\uFE0F ${tier === "medium" ? "This site looks a little suspicious" : "This site has a minor risk flag"} (${Math.round(
        data.risk_score * 100,
      )}% risk). Be careful entering personal info.</span>
      <button id="cyberX-dismiss" style="
      background:rgba(0,0,0,0.15);
      border:none;
    padding:4px 10px;
    border-radius:6px;
    cursor:pointer;
    font-size:13px;">
    Dismiss
    </button>
    </div>`;

  document.documentElement.appendChild(banner);
  document.getElementById("cyberX-dismiss").addEventListener("click", () => {
    banner.remove();
  });
}

function escapeHtml(str) {
  const element = document.createElement("div");
  element.textContent = str;
  return element.innerHTML;
}

function showContextCheckToast(message, url) {
  // how message will look like: 
  // message:{
  //     type:,
  //     url:,
  //     result:{
  //         data:{},
  //         ok:
  //     }
  // }
  const result = message.result;
  const exists = document.getElementById("cyberX-context-toast");
  if (exists) exists.remove();

  const contextDiv = document.createElement("div");
  contextDiv.id = "cyberX-context-toast";

  let inner;
  if (!result.data || !result.ok) {
    inner = `<p style="margin:0;font-size:13px;">Couldn't check that link right now.</p>`;
  } else {
    const tier = getRiskTier(result.data.risk_score);
    const cfg = TIER_CONFIG[tier];

    const reasons =
      Array.isArray(result.data.reasons) && result.data.reasons.length > 0
        ? `<div style="margin-top: 10px; border-top: 1px solid #27272a; padding-top: 8px;">
            <p style="margin: 0 0 6px; font-size: 11px; font-weight: 600; text-transform: uppercase; tracking-wider; color: #71717a;">Details</p>
            <ul style="margin: 0; padding: 0; list-style: none; font-size: 12px; color: #d4d4d8; display: flex; flex-direction: column; gap: 6px;">
                ${result.data.reasons
                  .map(
                    (r) => `
                        <li style="display: flex; align-items: flex-start; gap: 8px; line-height: 1.4;">
                            <span style="display: inline-block; width: 5px; height: 5px; background: #52525b; border-radius: 50%; margin-top: 6px; flex-shrink: 0;"></span>
                            <span style="flex: 1;">${escapeHtml(r)}</span>
                        </li>
                    `,
                  )
                  .join("")}
            </ul>
           </div>`
        : "";

    inner = `
  <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px;">
    <p style="margin: 0; font-size: 13px; font-weight: 600; color: #fff; display: flex; align-items: center; gap: 6px;">
      ${cfg.text} <span style="color: ${cfg.color}; font-weight: 700;">${escapeHtml(tier)}</span>
    </p>

    <div style="display:flex; align-items:center; gap:8px;" >
    <span style="font-size: 11px; font-weight: 700; background: ${cfg.color}15; color: ${cfg.color}; border: 1px solid ${cfg.color}30; padding: 2px 6px; border-radius: 6px; white-space: nowrap;">
      ${Math.round(result.data.risk_score * 100)}% risk
    </span>

     <div id="close-context-div" style="
  font-size: medium; 
  cursor: pointer;  ">x</div>
    </div>

  </div>
  <p style="margin: 0; font-size: 11px; color: #a1a1aa; word-break: break-all; opacity: 0.8; line-height: 1.4;">
    ${escapeHtml(url)}
  </p>
  ${reasons}`;

    contextDiv.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; z-index: 2147483647;
            width: 300px; box-sizing: border-box; background: #121214; 
            border: 1px solid #27272a; border-radius: 12px; padding: 14px; 
            color: #fff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            box-shadow: 0 12px 32px -4px rgba(0,0,0,0.6), 0 4px 12px -2px rgba(0,0,0,0.4);
            transition: all 0.2s ease;">
            
             ${inner}
            </div>`;

    document.documentElement.appendChild(contextDiv);
    document
      .querySelector("#close-context-div")
      .addEventListener("click", () => {
        contextDiv.remove();
      });
    setTimeout(() => {
      contextDiv.remove();
    }, 8000);
  }
}

document.addEventListener("focusin", (e) => {
  const ele = e.target; 
  const cfg = TIER_CONFIG[currentTier]
  if (!ele || passwordWarningShown) return;
  if (currentTier !== "medium" && currentTier !== "high") return;

  const existing = document.querySelector("#cyberX-input-warning");
  if (existing) existing.remove();
  const newElement = document.createElement("div");
  newElement.id = "cyberX-input-warning";
  if (
    ele.type !== "password" &&
    ele.type !== "text" &&
    ele.type !== "email" &&
    ele.type !== "number"
  )
    return;
  const fieldType = ele.type;
  const fieldName = {
    password:"password",
    text:"information",
    email:"email",
    number:"number"
  }

  newElement.innerHTML = `
  <div style="position:fixed;
        inset:0;
        background:rgba(10,10,10,0.95);
                z-index:2147483647;display:flex;align-items:center;
                justify-content:center;font-family:-apple-system,Segoe UI,Roboto,sans-serif;">
                
    <div style="max-width:480px;width:90%;text-align:center;color:#fff;
            background:#18181b;border:1px solid ${cfg.color || '#ef4444'};
            border-radius:16px;padding:32px;
            font-family:-apple-system,Segoe UI,Roboto,sans-serif;
            box-shadow:0 8px 24px rgba(0,0,0,0.4);">
  
  <div style="font-size:48px;margin-bottom:12px;">⚠️</div>
  
  <h1 style="font-size:22px;margin:0 0 12px;font-weight:600;">
    Wait — this site was flagged as risky
  </h1>
  
  <p style="color:#a1a1aa;margin:0 0 24px;font-size:14px;line-height:1.5;">
    You're about to enter a ${fieldName[fieldType] || "information"} 
    on a site Safora doesn't trust. Only continue if you're sure this is legitimate.
  </p>
  
  <div style="display:flex;justify-content:center;">
    <button id="cyberX-input-dismiss" style="background:#ef4444;color:#fff;border:none;
        padding:10px 24px;border-radius:8px;font-size:14px;cursor:pointer;font-weight:500;">
      Got it
    </button>
  </div>
  
</div>
    </div>`;

  document.documentElement.appendChild(newElement);
  document
    .querySelector("#cyberX-input-dismiss")
    .addEventListener("click", () => {
      newElement.remove();
    });
  passwordWarningShown = true;
});
