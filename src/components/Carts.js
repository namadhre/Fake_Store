import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cart from "./Cart";
import './Cart.css';
import Loader from "./Loader";


class Carts extends Component {
    constructor() {
        super();
        this.state = {
            total: 798.04,
            items: null,
            isFetch: true
        }
    }

    componentDidMount() {
        axios.get('https://fakestoreapi.com/carts/1')
            .then((response) => {
                this.setState({ items: response.data });
            })
            .catch((err) => {
                this.setState({ isFetch: false });
                console.error(err);
            })
    }

    render() {
        return (
            this.state.isFetch === false ?
                <div className='fetch-fail'>
                    <h2> Something went wrong !</h2>
                </div>
                :
                this.state.items === null ?
                    <Loader />
                    :
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
        );
    }
}


export default Carts;