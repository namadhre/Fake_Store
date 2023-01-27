import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            isLoaded: true
        }

    }
    componentDidMount() {
        axios.get(`https://fakestoreapi.com/products/${this.props.productId}`)
            .then((response) => {
                this.setState({ product: response.data });
            })
            .catch((err) => {
                this.setState({ isLoaded: false })
            })
    }

    render() {
        return (
            this.state.isLoaded === false ?
                <div className='fetch-fail'>
                    <h2> Something went wrong !</h2>
                </div>
                :
                this.state.product === null ?
                    <Loader />
                    :
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
        )
    }
}

export default Cart;