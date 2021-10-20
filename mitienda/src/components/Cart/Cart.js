import React, { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { CartContext } from 'context/CartContext';
import { Spinner, Modal, Button } from 'react-bootstrap';
import Data from "./../../data/listaProductos.json"; //Información completa de los ITEMS
import './../../assets/css/Cart.css';

const Cart = () => {
    const [infoCart, setInfoCart] = useState(null);
    const [itemsInfoCompleta, setItemsInfoCompleta] = useState(null);
    //Estado de confirmación de eliminación
    const [confirmacionEliminacion, setConfirmacionEliminacion] = useState(false);
    const [idItemEliminar, setIdItemEliminar] = useState(null);

    //Context Cart
    const { itemsCarrito, totalItems, removeItem, addCountItem, removeCountItem } = useContext(CartContext);
    //Estados del Modal
    const [show, setShow] = useState(false);

    //Funciones del Modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        //console.log("items carrito: ", itemsCarrito);
        //

        let itemsFiltrados = itemsCarrito.map(e => ({
            'idProducto': e.idProducto,
            'title': Data.find(ef => e.idProducto == ef.id).title,
            'marca': Data.find(ef => e.idProducto == ef.id).marca,
            'pictureUrl': Data.find(ef => e.idProducto == ef.id).pictureUrl,
            'cantidad': e.cantidad
        }));
        //console.log("itemsFiltrados: ", itemsFiltrados);
        setItemsInfoCompleta(itemsFiltrados);
    }, []);

    //Efecto que está pendiente si se elimina un item del carrito
    useEffect(() => {
        let itemsFiltrados = itemsCarrito.map(e => ({
            'idProducto': e.idProducto,
            'title': Data.find(ef => e.idProducto == ef.id).title,
            'marca': Data.find(ef => e.idProducto == ef.id).marca,
            'stock': Data.find(ef => e.idProducto == ef.id).stock,
            'pictureUrl': Data.find(ef => e.idProducto == ef.id).pictureUrl,
            'cantidad': e.cantidad
        }));
        //console.log("itemsFiltrados: ", itemsFiltrados);
        setItemsInfoCompleta(itemsFiltrados);
    }, [itemsCarrito]);


    //Función que confirma la eliminación del Item de la lista
    const confirmaEliminacionItem = () => {
        //console.log("Entro a la confirmación eliminacion");
        removeItem(idItemEliminar);
    };

    //función que muestra el modal
    const modalEliminacionItem = () => {
        handleShow();
    };

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
                                    <th className="text-center">Editar cantidad</th>
                                    <th className="text-center">Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemsInfoCompleta.map(e => (
                                    <tr key={e.idProducto} className="">
                                        <td className="d-flex justify-content-end">
                                            <div className="text-capitalize">
                                                {e.title + ' ' + e.marca + ' id:' + e.idProducto}
                                                <img className="ms-3" src={`./../` + e.pictureUrl} alt="" width="50px" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="btn btn-primary rounded-pill" onClick={() => { removeCountItem(e.idProducto, 1); }}  >-</div>
                                            <div className="btn btn-primary rounded-pill" onClick={() => { addCountItem(e.idProducto, 1, e.stock); }}>+</div>
                                            <div className="btn btn-danger rounded-pill" onClick={() => { modalEliminacionItem(); setIdItemEliminar(e.idProducto); }}>x</div>

                                        </td>
                                        <td className="py-auto text-center" >{e.cantidad} </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot >
                                <tr>
                                    <th className="text-end" colSpan="2">Total</th>
                                    <th className="text-center">{totalItems}</th>
                                </tr>
                            </tfoot>
                        </table>
                    </>
                    :
                    <>
                        <h4>Tu carrito de compras está vacío</h4>
                        <h5 className="mt-5 mb-5">Da click en el siguiente botón para que puedas comprar </h5>
                        <Link className="btn btn-dark" to="/">Volver a Productos</Link>
                    </>
            }
            < Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>¡Confirmación Eliminación!</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Realmente deseas eliminar el producto del carrito de compras?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => { handleClose(); confirmaEliminacionItem(); }}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
};

export default Cart;
