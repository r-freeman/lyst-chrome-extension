import {parseXPath} from "./parsexpath";

let asinId = null

/**
 * Get product from the DOM
 * @returns {null|{product: *, price: *, title: *, storeRegion: *, url: *}}
 */
const getProduct = () => {
    try {
        // look for an asinId on the page
        asinId = parseXPath("(//input[@id='ASIN']/@value)[1]")
        if (asinId !== null) {
            // asinId found return the rest of the product details
            return {
                asinId: asinId.value,
                storeRegion: location.href.match('.(\\uk|\de|\it|\fr|\es)')[1].toUpperCase(),
                url: location.href,
                title: parseXPath("//span[@id='productTitle']").innerText,
                price: parseXPath(
                    "//div[@class='a-section']/span[@id='price_inside_buybox']" +
                    "|//span[@class='inlineBlock-display']/span" +
                    "|//span[@id='priceblock_ourprice']" +
                    "|//span[@id='priceblock_dealprice']" +
                    "|//span[@id='priceblock_saleprice']"
                ).innerText
            }
        } else {
            return null
        }
    } catch (e) {
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

if(asinId !== null) {
    // Use MutationObserver to watch for changes in the DOM
    // For example, the DOM is changed when the user selects a different version of an item
    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
    const observerCallback = () => {
        // store product again if change was found
        storeProduct()
    }

    const observer = new MutationObserver(observerCallback);
    observer.observe(
        // Observe the child nodes in title_feature_div for changes
        document.getElementById('title_feature_div'), {
            childList: true,
        }
    )
}

