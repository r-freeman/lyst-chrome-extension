import {parseXPath} from "./parsexpath";

try {
    // look for an asinId on the page
    let asinId = parseXPath("//input[@id='ASIN']/@value")
    if (asinId !== null) {
        // asinId found, get the product details
        chrome.storage.local.set({
            'product': {
                'asinId': asinId.value,
                'storeRegion': location.href.match('.(\\uk|\de|\it|\fr|\es)')[1].toUpperCase(),
                'url': location.href,
                'title': parseXPath("//span[@id='productTitle']").innerText,
                'price': parseXPath(
                    "//div[@class='a-section']/span[@id='price_inside_buybox']" +
                    "|//span[@class='inlineBlock-display']/span" +
                    "|//span[@id='priceblock_ourprice']"
                ).innerText
            }
        }, () => {
            chrome.storage.local.get('product', (product) => {
                console.log(product)
            })
        })
    }
} catch (e) {
}
