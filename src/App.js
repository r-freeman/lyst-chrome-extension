import React, { Component } from 'react'
import Product from "./components/Product";

class App extends Component {
    state = {
        product: {}
    }

    componentDidMount() {
        chrome.storage.local.get(['product'], (item) => {
            this.setState({product: item.product})
        })
    }

    render() {
        let {product} = this.state
        return (
            <div className='app-container'>
                {product ? (
                    <Product product={product}/>
                ) : (
                    <h3>No product</h3>
                )}
            </div>
        )
    }
}

export default App
