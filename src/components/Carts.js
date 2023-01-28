import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cart from "./Cart";
import './Cart.css';
import Loader from "./Loader";


class Carts extends Component {
    constructor(props) {
        super(props);

        this.API_STATES = {
            LOADING: "loading",
            LOADED: "loaded",
            ERROR: "error",
        }

        this.state = {
            items: null,
            status: this.API_STATES.LOADING,
            errorMessage: "",
        }

        this.URL = 'https://fakestoreapi.com/carts/1';

    }

    fetchData = (url) => {
        this.setState({
            status: this.API_STATES.LOADING,
        }, () => {
            axios.get(url)
                .then((response) => {
                    this.setState({
                        status: this.API_STATES.LOADED,
                        items: response.data,
                    })
                })
                .catch((err) => {
                    this.setState({
                        status: this.API_STATES.ERROR,
                        errorMessage: "An API error occurred. Please try again in a few minutes.",
                    })
                })
        })
    }

    componentDidMount = () => {
        console.log("Hello")
        this.fetchData(this.URL)
    }

    render() {

        console.log(this.state.items);

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
                {this.state.status === this.API_STATES.LOADED && this.state.items === null &&
                    <div className="no-data">
                        <h1>No products available at the moment. Please try again later.</h1>
                    </div>
                }
                {this.state.status === this.API_STATES.LOADED && this.state.items !== null &&
                    <div className="cart-wrapper">
                        <div className='main-container-body'>
                            <div className='main-right-container'>
                                <div className='header-container'>
                                    <h3>Items in your cart</h3>
                                    <p>(<span>{this.state.items.products.length}</span> )</p>
                                </div>
                            </div>
                            {
                                this.state.items.products.map((product) => {
                                    return (
                                        <div key={product.productId}>
                                            <Cart productId={product.productId}
                                                quantity={product.quantity}
                                                parentCallback={this.calculateTotal}
                                            />
                                        </div>
                                    )
                                })
                            }
                            <div className="footer-container">
                                <Link to="/" >
                                    <button className="shopping"><i className="fa-solid fa-arrow-left"></i> Continue shopping</button>
                                </Link>
                                <button className="checkout"><i className="fa-solid fa-cart-shopping"></i><span>Checkout</span></button>
                            </div>
                        </div>
                    </div >
                }
            </>
        );
    }
}


export default Carts;