/**
 * Utility functions for manipulating numbers
 * @type {{numToDecimal: (function(*, *=): string)}}
 */
module.exports = {
    /**
     * Convert integer to decimal form
     * @param num
     * @param fractionDigits
     * @returns {string}
     */
    numToDecimal: (num, fractionDigits) => {
        return (num / 100).toFixed(fractionDigits)
    }
}
