const blockedUrls = [
  { hostSuffix: "twitter.com" },
  { hostSuffix: "reddit.com" },
  { hostSuffix: "x.com" }
];

chrome.webNavigation.onBeforeNavigate.addListener(
    function(details) { 
        if (details.frameId !== 0) return;
        chrome.storage.local.set({ 'originalUrl': details.url });
        chrome.tabs.update(details.tabId, { 
            url: chrome.runtime.getURL("redirect.html")
        });
    }, 
    { url: blockedUrls }
);
