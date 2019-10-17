import {parseXPath} from './utils/xpath'
import {numToDecimal} from './utils/numbers'
import * as amazon from './amazon'

/**
 * Helper function to extract the product details from the DOM using xpath
 * @type {{image: (function(*=): null), price: productHelper.price, title: (function(*=): any), storeRegion: (function(*=): string), asinId: (function(*=): null)}}
 */
export const productHelper = {
    asinId: (asinId = parseXPath(amazon.productAsinId)) => {
        // get the product id
        if (asinId !== null && "value" in asinId) {
            return asinId.value
        } else {
            return null
        }
    },
    price: (price = parseXPath(amazon.productPrice)) => {
        // check if price is valid
        if (price !== null && "innerText" in price && price.innerText.indexOf('-') === -1) {
            return numToDecimal(price.innerText.replace(/\D/g, ''), 2)
        } else {
            return null
        }
    },
    storeRegion: (storeRegion = location.href.match(amazon.storeUrl)[1]) => {
        // get the two character country code from the url
        return storeRegion.replace('co.', '').toUpperCase()
    },
    title: (title = parseXPath(amazon.productTitle)) => {
        // get the product title
        if (title !== null && "innerText" in title) {
            // remove leading and trailing white space from title
            return title.innerText.trim()
        } else {
            return null
        }
    },
    image: (image = parseXPath(amazon.productImage)) => {
        // get the product image
        if (image !== null && "value" in image) {
            return image.value
        } else {
            return null
        }
    }
}
