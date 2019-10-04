/**
 * Background script triggers the page action when we detect one of the Amazon stores in the url
 * https://developer.chrome.com/extensions/background_pages
 */
const background = () => {
    chrome.runtime.onInstalled.addListener(() => {
        chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
            chrome.declarativeContent.onPageChanged.addRules([
                {
                    conditions: [
                        new chrome.declarativeContent.PageStateMatcher({
                            pageUrl: {
                                urlMatches: '.amazon.(\co.uk|\de|\it|\fr|\es)'
                            },
                        })
                    ],
                    actions: [new chrome.declarativeContent.ShowPageAction()]
                }
            ])
        });
    });
}

background()


