import React, { useContext } from 'react';
import { CartContext } from 'context/CartContext';
import "./../../assets/css/ContadorCarrito.css";

//Muestra en el badge del carrito la cantidad total en color rojo solo cuando hay producto (render condicional)
const ContadorCarrito = () => {
    //Contexto de Cart
    const { totalItems } = useContext(CartContext);
    return (
        <span className="ContadorCarrito position-absolute badge rounded-pill bg-danger">
            {totalItems !== 0 ? totalItems : ''}
        </span>

    );
};

export default ContadorCarrito;
