import React from 'react';
import CartWidget from "./../Cart/CartWidget";
import shoppingLogo from './../../img/shoppingLogo.svg';

import './../../assets/css/NavBar.css';

const NavBar = () => {
    return (
        <ul>
            <li className="brand">
                <input type="image" alt="logo" src={shoppingLogo} height="25px" />
                <div>Mi TiendAPP</div>
            </li>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Sobre Nosotros</a></li>
            <li><a href="#">Productos</a></li>
            <li><a href="#">Contacto</a></li>
            <li><CartWidget cantidad="10"/></li>
        </ul>
    );
};

export default NavBar;
