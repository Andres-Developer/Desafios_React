import React, { useContext } from 'react';
import { CartContext } from 'context/CartContext';
import "./../../assets/css/ContadorCarrito.css";


const ContadorCarrito = ({ cantidad }) => {
    //Contexto de Cart
    const { totalItems } = useContext(CartContext);
    return (
        <span className="ContadorCarrito position-absolute badge rounded-pill bg-danger">
            {totalItems != 0 ? totalItems : ''}
        </span>

    );
};

export default ContadorCarrito;
