import storage from "./popup/storage";

const cheerio = require("cheerio");
const jsonframe = require("jsonframe-cheerio");

/**
 * Gets the DOM from the item page
 * @returns {string}
 */
const getInnerHTML = () => {
    return document.body.innerHTML
};

/**
 * Helper function for reversing a string
 * @param s
 * @returns {*}
 */
const reverseString = (s) => {
    return s.split("").reverse().join("");
};

/**
 * Formats price correctly
 * @param price
 * @returns {null}
 */
const formatPrice = (price) => {
    // price range, return null
    if (price.indexOf('-') !== -1) {
        return null
    }

    // replace all commas with dots
    price = price.replace(',', '.');

    // remove everything except numbers and dots
    price = price.replace(/[^0-9.]/g, '');

    // reverse the price
    price = reverseString(price);

    // remove all but one dot
    let t = 0;
    price = price.replace(/\./g, match => {
        t++;
        return (t === 2) ? "" : match;
    });

    // reverse the price again
    return reverseString(price);
};

/**
 * Returns two character string representing the store region.
 * For example, UK, DE, FR etc.
 * @param url
 * @returns {string | *}
 */
const getRegionFromUrl = (url) => {
    // split url into parts
    let urlParts = url.split('/');

    return urlParts[2].substr(urlParts[2].lastIndexOf('.') + 1, 2);
};

/**
 *
 * @param store
 * @param url
 */
export const captureItem = (store, url) => {
    chrome.tabs.executeScript({
        code: '(' + getInnerHTML + ')();'
    }, html => {
        // using cheerio to parse the DOM
        const $ = cheerio.load(html.toString());

        // jsonframe is a plugin for cheerio
        jsonframe($);

        let item = $('body').scrape(store.frame, {string: true});

        if (item !== undefined) {
            // item is a string, need to parse it as an object
            item = JSON.parse(item);

            // if the item_code wasn't scrapped try get it from the url
            if (!('item_code' in item))
                item.item_code = store.item_code(url);

            // check if price key exists in item object
            if ('price' in item)
                item.price = formatPrice(item.price);

            item.url = url;

            // sets the item's store
            item.store = {
                "name": store.name,
                "region": getRegionFromUrl(item.url)
            };

            storage.setData('item', item)
        }
    })
};
