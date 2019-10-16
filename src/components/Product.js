import React, { Component } from 'react'

class Product extends Component {
    render() {
        let {product} = this.props
        return (
            <div>
                <img src={product.image} alt={product.image}/>
                <h3>{product.title}</h3>
                <p>{product.price}</p>
                <p>{product.asinId}</p>
                <p>{product.storeRegion}</p>
            </div>
        )
    }
}

export default Product
