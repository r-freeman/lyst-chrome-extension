import {parseXPath} from "./utils/xpath";
import {numToDecimal} from './utils/numbers'
import * as amazon from './amazon'

let product = null
/**
 * Get product from the DOM
 * @returns {null|{product: *, price: *, title: *, storeRegion: *, url: *}}
 */
const getProduct = () => {w
    try {
        // look for an asinId and price on the page
        product = {
            asinId: parseXPath(amazon.productAsinId).value,
            price: parseXPath(amazon.productPrice)
        }

        // check if asinId is not null and price is valid
        if (product.asinId !== null && product.price.innerText.indexOf('-') === -1) {
            // strip all non-alphanumeric characters from price and convert integer to decimal
            product.price = numToDecimal(product.price.innerText.replace(/\D/g, ''), 2)
            // get the two letter country code of the Amazon store from the url
            product.storeRegion = location.href.match(amazon.storeUrl)[1]
                .replace('co.', '')
                .toUpperCase()

            product.url = location.href
            product.title = parseXPath(amazon.productTitle).innerText
            product.image = parseXPath(amazon.productImage).value

            return product
        }
        return null
    } catch (e) {
        // Something went wrong return null
        return null
    }
}

/**
 * Store product using the Chrome Storage API
 * @param product
 */
const storeProduct = (product = getProduct()) => {
    chrome.storage.local.set({product: product})
}

storeProduct()

if (product !== null) {
    // Use MutationObserver to watch for changes in the DOM
    // For example, the DOM is changed when the user selects a different version of an item
    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
    const observerCallback = () => {
        // check if we have the same product, if not get new product
        let newAsinId = parseXPath(amazon.productAsinId).value
        if (newAsinId !== product.asinId) {
            storeProduct()
        }
    }

    const observer = new MutationObserver(observerCallback);
    observer.observe(
        // Observe the child nodes in centerCol for changes
        document.getElementById('centerCol'), {
            childList: true,
            subtree: true
        }
    )
}

