import {stores} from "./stores";
import storage from "./popup/storage";
import {captureItem} from "./captureitem";

const background = () => {
    chrome.runtime.onInstalled.addListener(() => {
        storage.setData('settings', {
            'setup': false
        });
    });

    // functions to change the toolbar icons
    const setIcons = {
        active: () => {
            chrome.browserAction.setIcon({
                path: {
                    "16": "icons/icon16.png",
                    "32": "icons/icon32.png"
                }
            })
        },
        default: () => {
            chrome.browserAction.setIcon({
                path: {
                    "16": "icons/default_icon16.png",
                    "32": "icons/default_icon32.png"
                }
            })
        }
    };

    // loop through stores in stores.js
    const isStore = (url = '') => {
        if (url !== '') {
            stores.some(store => {
                // check if tab url matches the store item page
                if (url.match(store.regx)) {
                    setIcons.active();
                    // capture the item
                    captureItem(store, url);
                    return true;
                }
                setIcons.default();
                storage.setData('item', null);
            });
        }
    };

    // when the user clicks on a current tab
    chrome.tabs.onActivated.addListener((activeInfo) => {
        chrome.tabs.get(activeInfo.tabId, (tab) => {
            isStore(tab.url)
        })
    });

    // when a tab is updated
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (changeInfo.status === 'complete') {
            isStore(tab.url);
        }
    });

    // when new tab is created
    chrome.tabs.onCreated.addListener(() => {
        setIcons.default();
    })
};

background();
