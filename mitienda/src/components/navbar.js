import React from 'react';
import './../assets/css/NavBar.css';

import shoppingLogo from './../img/shoppingLogo.svg';

const NavBar = () => {
    return (
        <ul>
            <li><input type="image" alt="logo" src={shoppingLogo} height="30px"/></li>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Sobre Nosotros</a></li>
            <li><a href="#">Productos</a></li>
            <li><a href="#">Contacto</a></li>
        </ul>
    );
};

export default NavBar;
