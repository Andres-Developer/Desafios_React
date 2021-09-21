import React from 'react';
import { FaShoppingCart } from "react-icons/fa";
import ContadorCarrito from './ContadorCarrito'

import "./../assets/css/CartWidget.css";

const CartWidget = ({cantidad}) => {
    return (
        <div>
            <FaShoppingCart />
            <ContadorCarrito cantidad={cantidad}/>
        </div>
    );
};

export default CartWidget;
