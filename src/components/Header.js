import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
    return (
        <header>
            <div className="header-container-1">
                <h1>Fake Store</h1>
                <Link to="/"><button>Home</button></Link>
            </div>
        </header>
    );
}


export default Header;