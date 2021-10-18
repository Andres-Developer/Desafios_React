import React  from 'react';
import CartWidget from "./../Cart/CartWidget";
import shoppingLogo from './../../img/shoppingLogo.svg';
import { NavLink } from "react-router-dom";

import './../../assets/css/NavBar.css';

const NavBar = () => {
    return (
        <ul className="Navbar">
            <NavLink className="brand " to="/">
                <input type="image" alt="logo" src={shoppingLogo} height="25px" />
                <span>Mi TiendAPP</span>
            </NavLink>
            <NavLink className="nav_link" to="/category/1">Accesorios</NavLink>
            <NavLink className="nav_link" to="/category/2">Zapatos</NavLink>
            <NavLink className="nav_link" to="/category/3">Ropa</NavLink>
            <NavLink className="nav_link" to="/cart/"><CartWidget /></NavLink>
        </ul>
    );
};

export default NavBar;
