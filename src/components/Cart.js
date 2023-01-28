import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';

class Cart extends Component {
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

        };

        this.URL = `https://fakestoreapi.com/products/${this.props.productId}`;
    }

    fetchData = (url) => {
        this.setState({
            status: this.API_STATES.LOADING,
        }, () => {
            axios.get(url)
                .then((response) => {
                    this.setState({
                        status: this.API_STATES.LOADED,
                        product: response.data,
                    })

                })
                .catch((error) => {
                    this.setState({
                        status: this.API_STATES.ERROR,
                        errorMessage: "An API error occurred. Please try again in a few minutes."
                    })
                })
        })
    }

    componentDidMount = () => {
        this.fetchData(this.URL)
    }

    render() {

        return (
            <>
                {this.state.status === this.API_STATES.ERROR &&
                    <div className='fetch-fail'>
                        <h2>{this.state.errorMessage}</h2>
                    </div>
                }
                {this.state.status === this.API_STATES.LOADING &&
                    <Loader />
                }

                {this.state.status === this.API_STATES.LOADED && this.state.product === "" &&
                    <div className='fetch-fail'>
                        <h2>No products available at the moment. Please try again later.</h2>
                    </div>
                }
                {this.state.status === this.API_STATES.LOADED && this.state.product !== "" &&
                    <div className="left-container">
                        <div className="box">
                            <Link to={`/product/${this.state.product.id}`}>
                                <div className="item-thumbnail">
                                    <img src={this.state.product.image} alt={this.state.product.title}></img>
                                </div>
                            </Link>
                            <div className="box-left">
                                <h1>{this.state.product.title}</h1>
                                <p>{this.state.product.description}</p>
                                <i className="fa-solid fa-gift"></i>
                                <span>Add gift package </span>
                            </div>
                            <div className="box-right">
                                <div className="final-ammount">
                                    <div className="ammount-container">
                                        <p>${this.state.product.price}</p>
                                    </div>

                                    <div className="quantity">
                                        <p>{this.props.quantity}</p>
                                    </div>

                                </div>
                                <h3>${(this.state.product.price) * (this.props.quantity)}</h3>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }
}

export default Cart;