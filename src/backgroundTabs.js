import * as amazon from './amazon'

/**
 * Background script to manage what happens when tabs change
 */
const backgroundTabs = () => {
    // functions to change the toolbar icons
    const setIcons = {
        activeIcons: () => {
            chrome.browserAction.setIcon({
                path: {
                    "16": "static/icons/icon16.png",
                    "32": "static/icons/icon32.png"
                }
            })
        },
        defaultIcons: () => {
            chrome.browserAction.setIcon({
                path: {
                    "16": "static/icons/default_icon16.png",
                    "32": "static/icons/default_icon32.png"
                }
            })
        }
    }

    // check if the current tab url is Amazon
    const isTabAmazon = (url = '') => {
        url.match(amazon.storeUrl) !== null ? setIcons.activeIcons() : setIcons.defaultIcons()
    }

    // check the current active tab url
    const checkActiveTab = () => {
        chrome.tabs.query({'active': true}, (activeTabs) => {
            let activeTab = activeTabs[0]
            // url is undefined when opening a new tab
            activeTab.url === undefined ? isTabAmazon() : isTabAmazon(activeTab.url)
        })
    }

    // when the user clicks on a current tab
    chrome.tabs.onActivated.addListener((activeInfo) => {
        chrome.tabs.get(activeInfo.tabId, (tab) => {
            // check if the tab url is Amazon
            isTabAmazon(tab.url)
        })
    })

    // when a tab is updated
    chrome.tabs.onUpdated.addListener(() => {
        checkActiveTab()
    })

    // when a new tab is created
    chrome.tabs.onCreated.addListener(() => {
        checkActiveTab()
    })
}

backgroundTabs()

