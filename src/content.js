import {parseXPath} from "./parsexpath";

try {
    // look for an asinId on the page
    let asinId = parseXPath("(//input[@id='ASIN']/@value)[1]")
    if (asinId !== null) {
        // asinId found, get the product details
        chrome.storage.local.set({
            'product': {
                'asinId': asinId.value,
                'url': location.href,
                'title': parseXPath("//span[@id='productTitle']").innerText,
                'price': parseXPath("(//span[@class='a-color-price'])[1]").innerHTML
            }
        }, () => {
            chrome.storage.local.get('product', (product) => {
                console.log(product)
            })
        })
    }
} catch (e) {
}
