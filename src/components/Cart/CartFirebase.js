import React, { useEffect, useState, useContext } from "react";

import { consultarDatabase } from './../../config/firebaseConfig';
import { Link } from 'react-router-dom';
import { CartContext } from 'context/CartContext';
import { Spinner, Modal, Button } from 'react-bootstrap';
import './../../assets/css/Cart.css';
import { FaCheck } from 'react-icons/fa';

const Cart = () => {
    const [infoCart, setInfoCart] = useState(null);
    const [data, setData] = useState(null);
    const [itemsInfoCompleta, setItemsInfoCompleta] = useState(null);
    const [idItemEliminar, setIdItemEliminar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(true); 

    //Context Cart
    const { itemsCarrito, setItemsCarrito, totalItems, removeItem, addCountItem, removeCountItem, totalPrecio } = useContext(CartContext);
    //Estados del Modal
    const [show, setShow] = useState(false);
    const [showVaciar, setShowVaciar] = useState(false);

    //Funciones del Modal
    const handleClose = () => { setShow(false); setShowVaciar(false); };
    const handleShow = () => setShow(true);
    const handleShowVaciar = () => setShowVaciar(true);

    //Efecto que está pendiente si se elimina un item del carrito
    useEffect(() => {

        setMounted(true); 

        setData(null);
        setLoading(true);
        if (itemsCarrito.length !== 0) {
            getCart();
        } else {
            setInfoCart(true);
        }
        setLoading(false);

        return () => setMounted(false);

    }, [itemsCarrito, data]); 

    // Función Carga productos desde la DB
    const getCart = async () => {
        if (mounted) {  
            setLoading(true);
            setData(null);
            const listaTemporal = await consultarDatabase('items');
            setLoading(false);
            setData(listaTemporal);
            if (!loading && data) { 
                setLoading(true);

                let itemsFiltrados = itemsCarrito.map(e => ({
                    'idProducto': e.idProducto,
                    'title': data.find(ef => e.idProducto === ef.id).title,
                    'marca': data.find(ef => e.idProducto === ef.id).marca,
                    'stock': data.find(ef => e.idProducto === ef.id).stock,
                    'pictureUrl': data.find(ef => e.idProducto === ef.id).pictureUrl,
                    'precio': data.find(ef => e.idProducto === ef.id).price,
                    'id_interno': data.find(ef => e.idProducto === ef.id).id_interno,
                    'cantidad': e.cantidad
                }));
                setItemsInfoCompleta(itemsFiltrados);
                setLoading(false);
                setInfoCart(true);
            }
        }
    };

    //Función que confirma la Eliminación del Item de la lista
    const confirmaEliminacionItem = () => {

        removeItem(idItemEliminar);
    };

    //Función que confirma Vaciar Contenido del Carrito de Compras
    const confirmaVaciarCarrito = () => {
        setItemsCarrito([]);
    };

    //función Muestra Modal de Eliminación de un Item del Carrito de Compras
    const modalEliminacionItem = () => {
        handleShow();
    };

    //Función muestra Modal de Vaciar Carrito
    const modalVaciarCarrito = () => {
        handleShowVaciar();
    };


    //Función que muestra un  número en formato separado por comas en los miles (para facilidad de ver el número)
    const muestraNumeroComas = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-3 pt-5">
            {!infoCart ?
                <div className="container d-flex flex-column justify-content-center align-items-center my-5 py-5">
                    <Spinner animation="border" variant="primary" />
                </div>
                :
                itemsCarrito.length !== 0
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
                                    <th className="text-center">Precio unitario</th>
                                    <th className="text-center">Precio*cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemsInfoCompleta.map(e => (
                                    <tr key={e.idProducto} className="">
                                        <td className="text-capitalize d-flex justify-content-between">
                                            <div>
                                                <div>{e.title}</div>
                                                <div className="fw-bold text-black-50">
                                                    {e.marca}
                                                </div>
                                                <div>
                                                    {'(Ref: ' + e.id_interno + ')'}
                                                </div>
                                            </div>
                                            <img className="ms-3" src={e.pictureUrl} alt="" width="50px" />
                                        </td>
                                        <td>
                                            <div className="btn btn-primary rounded-pill" onClick={() => { removeCountItem(e.idProducto, 1); }}  >-</div>
                                            <div className="btn btn-primary rounded-pill" onClick={() => { addCountItem(e.idProducto, 1, e.stock); }}>+</div>
                                            <div className="btn btn-danger rounded-pill" onClick={() => { modalEliminacionItem(); setIdItemEliminar(e.idProducto); }}>x</div>

                                        </td>
                                        <td className="py-auto text-center" >{e.cantidad} </td>
                                        <td className="py-auto text-center" >${muestraNumeroComas(e.precio)} </td>
                                        <td className="py-auto text-center" >${muestraNumeroComas(e.precio * e.cantidad)} </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot >
                                <tr>
                                    <th className="text-end" colSpan="2">Total cantidad</th>
                                    <th className="text-center">{totalItems}</th>
                                    <th className="text-end" colSpan="1">Total precio</th>
                                    <th className="text-center">${muestraNumeroComas(totalPrecio)}</th>
                                </tr>
                            </tfoot>
                        </table>
                        <div className="d-flex mb-3">
                            <Link className="btn btn-primary mx-1" to={{ pathname: "/form", itemsInfoCompleta }} >
                                <FaCheck className="me-2" />
                                Finalizar compra
                            </Link>
                            <Link type="" className="btn btn-success mx-1" to="/">Seguir Comprando</Link>

                        </div>
                        <div className="btn btn-outline-danger" onClick={() => { modalVaciarCarrito(); }}>
                            Vaciar carrito de compras
                        </div>
                    </>
                    :
                    <>
                        <div className="h4 pt-4">Tu carrito de compras está vacío</div>
                        <h5 className="mt-5 mb-5">Da click en el siguiente botón para que puedas comprar </h5>
                        <Link className="btn btn-warning" to="/">Volver a Productos</Link>
                    </>
            }
            {/* Modal Confirma Eliminar Item */}
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
            {/* Modal Copnfirma Vaciar Carrito */}
            < Modal show={showVaciar} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>¡Confirma Vaciar Carrito!</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Realmente deseas Vaciar todo el contenido del carrito de compras?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => { handleClose(); confirmaVaciarCarrito(); }}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
};

export default Cart;
