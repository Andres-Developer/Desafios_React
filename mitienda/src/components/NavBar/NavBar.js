import React from 'react';
import CartWidget from "./../Cart/CartWidget";
import shoppingLogo from './../../img/shoppingLogo.svg';
import { Link } from "react-router-dom";

import './../../assets/css/NavBar.css';

const NavBar = () => {
    return (
        <ul>
            <Link className="brand" to="/">
                <input type="image" alt="logo" src={shoppingLogo} height="25px" />
                <div>Mi TiendAPP</div>
            </Link>
            <Link to="/category/1">Accesorios</Link>
            <Link to="/category/2">Zapatos</Link>
            <Link to="/category/3">Ropa</Link>
            <Link to="/category/"><CartWidget cantidad="10" /></Link>
        </ul>
    );
};

export default NavBar;
