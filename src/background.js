/**
 * Background scripts listen for events in the background
 * https://developer.chrome.com/extensions/background_pages
 */
const background = () => {
    // When the extension is first installed, display the intro page explaining what it does
    chrome.runtime.onInstalled.addListener(() => {
        if (!window.localStorage.getItem('displayedIntro')) {
            window.localStorage.setItem('displayedIntro', 'yes');
            chrome.tabs.create({
                url: 'intro.html'
            });
        }
    })

    // when the user navigates to a new page, check the url and if it matches one of the Amazon stores
    // allow the user to access the UI by clicking on the extension icon
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


