import React, { useEffect, useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import Data from "./../../data/listaProductos.json"; //Información completa de los ITEMS
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = ({id}) => {
    const [itemDetail, setItemsDetail] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /* Hook de Ciclo de Vida */
    useEffect(() => {
        /* Llamando al item para obtener TODOS los detalles a partir del ID entregado por Props */
        const getItem = async () => {
            await new Promise((resolve, reject) => setTimeout(resolve, 2000)).then(()=> (Data.find(e => e.id === id))).then(res => setItemsDetail(res));
        };
        getItem();
        
    }, []);

    return (
        <div>
            <Button variant="success" onClick={handleShow}>
                Ver más
            </Button>
            <Modal show={show} onHide={handleClose}>
                <ItemDetail itemDetail={itemDetail} />
            </Modal>
        </div>
    );
};
export default ItemDetailContainer;

