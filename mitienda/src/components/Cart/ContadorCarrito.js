import React, { useContext } from 'react';
import { CartContext } from 'context/CartContext';
import "./../../assets/css/ContadorCarrito.css"


const ContadorCarrito = ({cantidad}) => {
    const [state, setState] = useContext(CartContext);
    return (        
            <span className="ContadorCarrito position-absolute badge rounded-pill bg-danger">
                {state.count}
            </span>
        
    )
}

export default ContadorCarrito
