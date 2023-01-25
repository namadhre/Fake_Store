import React, { Component } from 'react';
import axios from 'axios';
import Loader from './Loader';
import './Product.css'

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            isProduct: true
        }
    }
    componentDidMount() {
        let { id } = this.props.match.params;
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then((response) => {
                this.setState({ product: response.data });
            })
            .catch((err) => {
                console.error(err);
                this.setState({ isProduct: false })
            });
    }

    render() {
        return (
            !this.state.isProduct ?
                <h1 className='fail-fetch'>Something went wrong please try again</h1>
                :
                (this.state.product === null) ?
                    <Loader />
                    :
                    this.state.product === '' ?
                        <h1 className='no-product'>Nothing to display</h1>
                        :
                        (
                            <div className='container-wrapper'>
                                <div className='main-container-product'>
                                    <div className="content-container-product">
                                        <img src={this.state.product.image} alt={this.state.product.title} className="img-wrapper"></img>
                                        <div className='description-container-product'>
                                            <h2>{this.state.product.title}</h2>
                                            <p>{this.state.product.description}</p>
                                            <h4>{this.state.product.category}</h4>
                                        </div>
                                    </div>
                                    <div className="container-product">
                                        <div className="price-rating-container">
                                            <div className="rating">
                                                <button className="rating-button">{this.state.product.rating.rate} <i className="fa-regular fa-star"></i></button>
                                                <span>{"(" + this.state.product.rating.count + ")"}</span>
                                            </div>
                                            <h3>${this.state.product.price}</h3>
                                        </div>
                                        <button className="buy-now">Check-out</button>
                                    </div>
                                </div>
                            </div>
                        )
        );
    }
}

export default Product;