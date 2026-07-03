chrome.runtime.onMessage.addListener((message) => {
    if (message.type !== "SCAN_RESULT") return;
    console.log("the message received is: ", message)

    // const { risk_score, label, reasons } = message.data;
    const tier = getRiskTier(message.data.risk_score);

    removeExisting();

    if (tier === "high") {
        showFullWarning(message.data, tier);
    }
    else if (tier === "medium" || tier === "low") {
        showBanner(message.data, tier);
    }

})

function removeExisting() {
    const overlay = document.getElementById("cyberX-overlay");
    if (overlay) overlay.remove();
    const banner = document.getElementById("cyberX-banner");
    if (banner) banner.remove();
}

function showFullWarning(data, tier) {
    const element = document.createElement("div");
    element.id = "cyberX-overlay"
    const cfg = TIER_CONFIG[tier];
    const hasReasons = Array.isArray(data.reasons) && data.reasons.length > 0;
    const reasonsHtml = hasReasons
        ? `<ul style="text-align:left;margin:16px 0;padding-left:20px;line-height:1.6;">${data.reasons
            .map((r) => `<li>${escapeHtml(r)}</li>`)
            .join("")}</ul>`
        : `<p style="margin:16px 0;">This site matches known scam patterns.</p>`;
    element.innerHTML = ` 
    
        <div style="position:fixed;inset:0;background:rgba(10,10,10,0.95);
                z-index:2147483647;display:flex;align-items:center;
                justify-content:center;font-family:-apple-system,Segoe UI,Roboto,sans-serif;">
      <div style="max-width:480px;width:90%;text-align:center;color:#fff;
                  background:#18181b;border:1px solid ${cfg.color};
                  border-radius:16px;padding:32px;">
        <div style="font-size:48px;margin-bottom:8px;">\u26A0\uFE0F</div>
        <h1 style="font-size:22px;margin:0 0 8px;">This site looks like a scam</h1>
        <p style="color:#a1a1aa;margin:0 0 4px;font-size:14px;">
          Detected as <strong style="color:${cfg.color};">${escapeHtml(data.label)}</strong>
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
        </div>`

    document.documentElement.appendChild(element);
    document.getElementById("cyberX-leave").addEventListener("click", () => {
        window.location.href = "https://www.google.com"
    })

    document.getElementById("cyberX-proceed").addEventListener("click", () => {
        element.remove();
    })

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
        data.risk_score * 100
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
    })

}

function escapeHtml(str) {
    const element = document.createElement("div");
    element.textContent = str;
    return element.innerHTML;
}
