const blockedUrls = [ "*://*.twitter.com/*", "*://*.reddit.com/*" ];

chrome.webNavigation.onBeforeNavigate.addListener((details) => { if (details.frameId !== 0) return;

const storeUrl = chrome.storage.local.set({ 'originalUrl' : details.url });

const redirectUrl = chrome.tabs.update(details.tabId, { url: chrome.runtime.getURL("redirect.html")});

}, { url: blockedUrls.map(site => ({ urlMatches: site })) 
});
