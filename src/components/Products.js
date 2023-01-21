import React, { Component } from "react";
import './Products.css';


class Products extends Component {
    render() {
        return this.props.products.map((product) => (
            <li key={product.id}>
                <div className="content-container">
                    <img src={product.image} alt={product.title}></img>
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <h4>{product.category}</h4>
                </div>
                <div className="container">
                    <div className="price-rating-container">
                        <div className="rating">
                            <button className="rating-button">{product.rating.rate} <i className="fa-regular fa-star"></i></button>
                            <span>{"(" + product.rating.count + ")"}</span>
                        </div>
                        <h3>${product.price}</h3>
                    </div>
                    <button className="buy-now">Add to Cart</button>
                </div>
            </li>
        ));
    }
}


export default Products;