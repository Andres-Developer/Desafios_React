import React, { useEffect, useState } from "react";
import { Spinner } from 'react-bootstrap';

const Cart = () => {
    const [infoCart, setInfoCart] = useState(null);
    /* Hook de Ciclo de Vida */
    useEffect(() => {
        const geCart = async () => {
            await new Promise((resolve, reject) => setTimeout(resolve, 800))
                .then(() => {
                    setInfoCart(true);
                });
        };
        geCart();
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center">
            {!infoCart ? <Spinner  animation="border" variant="primary" />
                :
                <div className="text-center">Este es el contenido de tu carrito de compras: </div>
            }
        </div>
    );
};

export default Cart;
