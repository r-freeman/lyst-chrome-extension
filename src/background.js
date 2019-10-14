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
        }, () => {
            console.log(chrome.runtime.lastError)
        })
    }, {url: [{urlMatches: amazonUrl}]})

    chrome.runtime.onInstalled.addListener(() => {
        // We'll check this value later and display an intro page
        chrome.storage.local.set({hasSeenIntro: false})
    });
}

background()


