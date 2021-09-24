import React from 'react'
import "./../../assets/css/ContadorCarrito.css"

const ContadorCarrito = ({cantidad}) => {
    return (
        
            <span className="ContadorCarrito position-absolute badge rounded-pill bg-danger">
                {cantidad}
            </span>
        
    )
}

export default ContadorCarrito
