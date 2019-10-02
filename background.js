chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        // look one of the amazon stores in the url
                        pageUrl: {
                            urlMatches: '.amazon(\.co.uk|\.de|\.it|\.fr|\.es)'
                        },
                    })
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ])
    });
});
