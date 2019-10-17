import {productHelper} from "./producthelper";

// initialise the product variable
let product = null

/**
 * Get product from the DOM
 * @returns {null|{product: *, price: *, title: *, storeRegion: *, url: *}}
 */
const getProduct = () => {
    try {
        // get the product id and price
        product = {asinId: productHelper.asinId(), price: productHelper.price()}

        // check if the product id and price are not null
        if (product.asinId !== null && product.price !== null) {
            // get the rest of the product details
            product.storeRegion = productHelper.storeRegion()
            product.url = location.href
            product.title = productHelper.title()
            product.image = productHelper.image()
        } else {
            product = null
        }
    } catch (e) {
        return null
    }

    return product
}

/**
 * Store product using the Chrome Storage API
 * @param product
 */
const storeProduct = (product = getProduct()) => {
    chrome.storage.local.set({product: product})
}

// get the get and store the product once
storeProduct()

// if product is still null we aren't on a product page
if (product !== null) {
    // Use MutationObserver to watch for changes in the DOM
    // For example, the DOM is changed when the user selects a different version of an item
    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
    const observerCallback = () => {
        // check if we have the same product, if not get new product
        let newAsinId = productHelper.asinId()
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

