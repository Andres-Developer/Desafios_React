import React from 'react';
import { FaShoppingCart } from "react-icons/fa";
import ContadorCarrito from './ContadorCarrito'

import "./../../assets/css/CartWidget.css";


const CartWidget = ({cantidad}) => {
    return (
        <div className="cartWidget position-relative">
            <FaShoppingCart/>
            <ContadorCarrito />
        </div>
    );
};

export default CartWidget;
