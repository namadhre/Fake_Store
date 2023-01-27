import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
    return (
        <header>
            <div className="header-container-1">
                <h1>Fake Store</h1>
                <div className="wrapper">
                    <Link to="/">
                        <button>Home</button>
                    </Link>
                    <Link to="/cart">
                        <button className="cart-button">
                            <i className="fa-solid fa-cart-shopping"></i>Cart
                        </button>
                    </Link>
                </div>

            </div>
        </header>
    );
}


export default Header;