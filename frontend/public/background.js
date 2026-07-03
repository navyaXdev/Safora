console.log("hello bhai")
importScripts("config.js");

chrome.webNavigation.onCompleted.addListener((details) => {
    if (details.frameId !== 0) return;
    const url = details.url;
    if (!url.startsWith("http")) return;
    checkUrl(url, details.tabId);
})

async function checkUrl(url, tabId) {
    try {
        setBadgeLoading(tabId)
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });
        if (!response.ok) throw new Error(`Backend returned ${response.status}`);
        const data = await response.json();

        updateBadge(tabId, data)
        console.log("The data is: ", data)
        chrome.tabs.sendMessage(tabId, {
            type: 'SCAN_RESULT',
            data
        }, () => {
            if (chrome.runtime.lastError) {

            }
        })


    } catch (error) {
        console.error("scan failed!", error)
        setBadgeError(tabId);
        chrome.action.setBadgeText({ tabId, text: '' })

    }
}

const updateBadge = (tabId, data) => {
    const tier = getRiskTier(data.risk_score);
    const cfg = TIER_CONFIG[tier];
    chrome.action.setBadgeBackgroundColor({ tabId, color: cfg.color });
    chrome.action.setBadgeText({ tabId, text: cfg.text });
}


const setBadgeLoading = (tabId) => {
    chrome.action.setBadgeBackgroundColor({ tabId, color: "#6b7280" });
    chrome.action.setBadgeText({ tabId, text: "..." });

}

const setBadgeError = (tabId) => {
    chrome.action.setBadgeBackgroundColor({ tabId, color: "#6b7280" });
    chrome.action.setBadgeText({ tabId, text: "" })
}


// if the user types manual url from the frontend then:

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "MANUAL_CHECK") {
        checkUrlManual(message.url).then(sendResponse);
        return true;
    }
})


async function checkUrlManual(url) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url })
        })

        if (!response.ok) throw new Error(`Backend returned ${response.status}`);
        const data = await response.json();
        return { ok: true, data }
    } catch (error) {
        return { ok: false, error: error.message }
    }
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "cyberX-check-link",
        title: "Check this link for scams",
        contexts: ["link"]
    })
})


chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId !== "cyberX-check-link" || !info.linkUrl) return;

    const result = await checkUrlManual(info.linkUrl);
    chrome.tabs.sendMessage(tab.id, {
        type: "CONTEXT_CHECK_RESULT",
        url: info.linkUrl,
        result
    }, () => {
        if (chrome.runtime.lastError) {

        }
    })
})
