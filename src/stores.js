/**
 * The background script
 * @type {*[]}
 */

export const stores = [
    {
        name: "amazon",
        regx: "(?:(dp\\/|gp\\/product\\/))[A-Z0-9]+",
        frame: {
            "title": "[id=productTitle]",
            // "category": "[id=nav-subnav] @ data-category",
            "image": ".imgTagWrapper > img @ src",
            "price": "#price_inside_buybox, #priceblock_pospromoprice, #priceblock_ourprice, #priceblock_dealprice, #priceblock_saleprice",
            "item_code": "[id=ASIN] @ value"
        },
        // item_code: (url) => {
        //     return url.match("(?:dp\\/)([A-Z0-9]+)(?=\\?)")[1];
        // }
    },
    {
        name: "ebay",
        regx: "(?:itm\\/)[A-Z0-9]+",
        frame: {
            "title": "[id=itemTitle] < h1",
            "image": "#icImg @ src",
            "price": "span[id=prcIsum]",
            "item_code": "a[rel=nofollow] @ data-itemid"
        }
    },
    // {
    //     name: "asos",
    //     regx: "(?:prd\\/)[A-Z0-9]+",
    //     frame: {
    //         "title": ".product-hero > h1",
    //         "image": "[class=fullImageContainer] > img @ src",
    //         "price": "[class=current-price]",
    //     },
    //     item_code: (url) => {
    //         return url.match("(?:prd\\/)([A-Z0-9]+)(?=\\?)")[1];
    //     }
    // }
];
