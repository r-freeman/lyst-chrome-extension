export const parseXPath = (expression) => {
    let node, nodes = []
    let result = document.evaluate(
        expression,
        document,
        null,
        XPathResult.ANY_TYPE,
        null
    )

    node = result.iterateNext()
    while(node){
        nodes.push(node)
        node = result.iterateNext()
    }

    // handy for finding attributes on a node, remove later
    console.log(nodes)

    return nodes[0]
}
