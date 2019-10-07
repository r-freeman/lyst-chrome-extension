/**
 * Background scripts listen for events in the background
 * https://developer.chrome.com/extensions/background_pages
 */
const background = () => {
    let amazonUrl = '.amazon.(\co.uk|\de|\it|\fr|\es)'

    // execute the content script if the current url is Amazon
    chrome.webNavigation.onCompleted.addListener(() => {
        chrome.tabs.executeScript({
            file: './static/js/content.js'
        })
    }, {url: [{urlMatches: amazonUrl}]})

    chrome.runtime.onInstalled.addListener(() => {
        // When the extension is first installed, display the intro page explaining what it does
        if (!window.localStorage.getItem('displayedIntro')) {
            window.localStorage.setItem('displayedIntro', 'yes');
            chrome.tabs.create({
                url: 'intro.html'
            });
        }
    });
}

background()


