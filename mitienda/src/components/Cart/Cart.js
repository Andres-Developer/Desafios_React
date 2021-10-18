import React, { useEffect, useState, useContext } from "react";
import { CartContext } from 'context/CartContext';
import { Spinner } from 'react-bootstrap';
import Data from "./../../data/listaProductos.json"; //Información completa de los ITEMS
import './../../assets/css/Cart.css';

const Cart = () => {
    const [infoCart, setInfoCart] = useState(null);
    const [itemsInfoCompleta, setItemsInfoCompleta] = useState(null);
    //Context Cart
    const { itemsCarrito, totalItems } = useContext(CartContext);


    /* Hook de Ciclo de Vida */
    useEffect(() => {
        const getCart = async () => {
            await new Promise((resolve, reject) => setTimeout(resolve, 800))
                .then(() => {
                    setInfoCart(true);
                });
        };
        getCart();
        //
        console.log("items carrito: ", itemsCarrito);
        //

        let itemsFiltrados = itemsCarrito.map(e => ({
            'title': Data.find(ef => e.idProducto == ef.id).title,
            'marca': Data.find(ef => e.idProducto == ef.id).marca,
            'pictureUrl': Data.find(ef => e.idProducto == ef.id).pictureUrl,
            'cantidad': e.cantidad
        }));
        //console.log("itemsFiltrados: ", itemsFiltrados);
        setItemsInfoCompleta(itemsFiltrados);


    }, []);

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            {!infoCart ? <Spinner animation="border" variant="primary" />
                :
                itemsCarrito.length != 0
                    ?
                    <>
                        <h5 className="mt-5">
                            Tienes los siguientes productos en tu carrito:
                        </h5>
                        <table id="tablaCart" className='table table-bordered align-middle'>
                            <thead  >
                                <tr>
                                    <th className="text-center">Producto</th>
                                    <th className="text-center">Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemsInfoCompleta.map(e => (
                                    <tr key={e.idProducto} className="">
                                        <td className="d-flex justify-content-end">
                                            <div className="text-capitalize">
                                                {e.title + ' '+ e.marca}
                                            <img className="ms-3" src={`./../` + e.pictureUrl} alt="" width="50px" />
                                            </div>
                                        </td>
                                        <td className="py-auto text-center" >{e.cantidad} </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot >
                                <tr>
                                    <th className="text-end">Total</th>
                                    <th className="text-center">{totalItems}</th>
                                </tr>
                            </tfoot>
                        </table>
                    </>
                    :
                    <h4>Tu carrito de compras está vacío</h4>

            }
        </div >
    );
};

export default Cart;
