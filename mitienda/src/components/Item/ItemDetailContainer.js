import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Spinner } from 'react-bootstrap';

import Data from "../../data/listaProductos.json"; //Información completa de los ITEMS
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
    const [itemDetail, setItemsDetail] = useState(null);
    const { id: productId } = useParams();


    /* Hook de Ciclo de Vida */
    useEffect(() => {
        /* Llamando al item para obtener TODOS los detalles a partir del ID entregado por Props */
        const getItem = async () => {
            await new Promise((resolve, reject) => setTimeout(resolve, 800))
                .then(() => Data.find(e => e.id === parseInt(productId)))
                .then((res) => {
                    setItemsDetail(res);
                    /* console.log("Llegó producto: ", res); */
                });
        };
        getItem();


    }, [productId]);



    return (
        <div>
            {/* Llamando al componeente que renderizará los detalles del Item */}
            {!itemDetail ? <Spinner animation="border" variant="primary" /> : <ItemDetail itemDetail={itemDetail} />}

            {/*  */}
        </div>
    );
};
export default ItemDetailContainer;

