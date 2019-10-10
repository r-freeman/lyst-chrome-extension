/**
 * Utility functions for interacting with the DOM
 * @type {{parseXPath: (function(*=): null)}}
 */
module.exports = {
    /**
     * Parse the DOM tree looking for nodes with a given expression
     * @param exp
     * @returns {null}
     */
    parseXPath: (exp) => {
        let node, nodes = []
        let result = document.evaluate(
            exp,
            document,
            null,
            XPathResult.ANY_TYPE,
            null
        )
        // iterate to kick things off
        node = result.iterateNext()
        while (node) {
            // push each node onto the nodes array
            nodes.push(node)
            node = result.iterateNext()
        }
        // return the first matching node
        return typeof nodes[0] !== 'undefined' ? nodes[0] : null
    }
}
