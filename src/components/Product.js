import React, { Component } from 'react';
import axios from 'axios';
import Loader from './Loader';
import './Product.css'

class Product extends Component {

    constructor(props) {
        super(props);

        this.API_STATES = {
            LOADING: "loading",
            LOADED: "loaded",
            ERROR: "error",
        }

        this.state = {
            product: null,
            status: this.API_STATES.LOADING,
            errorMessage: "",
        }

        this.URL = `https://fakestoreapi.com/products/${this.props.match.params.id}`;
    }

    fetchData = (url) => {
        this.setState({
            status: this.API_STATES.LOADED,
        }, () => {
            axios.get(url)
                .then((response) => {
                    this.setState({
                        status: this.API_STATES.LOADED,
                        product: response.data,
                    })


                })
                .catch((err) => {
                    this.setState({
                        status: this.API_STATES.ERROR,
                        errorMessage: "An An API error occurred. Please try again in a few minutes.",
                    })
                })
        })
    }

    componentDidMount = () => {
        this.fetchData(this.URL);
    }

    render() {

        return (
            <>

                {this.state.status === this.API_STATES.ERROR &&
                    <h1 className='fail-fetch'>
                        {this.state.errorMessage}
                    </h1>
                }

                {this.state.status === this.API_STATES.LOADING &&
                    <Loader />
                }

                {this.state.status === this.API_STATES.LOADED && this.state.product === "" &&
                    <h1 className='no-product'>No products available at the moment. Please try again later.</h1>
                }
                {this.state.status === this.API_STATES.LOADED && this.state.product !== "" && this.state.product !== null &&
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
                }

            </>


        );
    }
}

export default Product;