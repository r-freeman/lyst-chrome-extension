/**
 * Parses the DOM looking for a set of nodes for a given expression
 * @param expression
 * @returns {null}
 */
export const parseXPath = (expression) => {
    let node, nodes = []
    let result = document.evaluate(
        expression,
        document,
        null,
        XPathResult.ANY_TYPE,
        null
    )
    // iterate to kick things off
    node = result.iterateNext()
    while(node){
        // push each node onto the nodes array
        nodes.push(node)
        node = result.iterateNext()
    }
    // return the first matching node
    return typeof nodes[0] !== 'undefined' ? nodes[0] : null
}
