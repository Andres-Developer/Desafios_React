import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//Consulta a configuracion firebase
import { consultarDatabase } from './../../config/firebaseConfig';
import { Spinner } from 'react-bootstrap';
//import Data from "../../data/listaProductos.json"; //Información completa de los ITEMS
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
    const [itemDetail, setItemDetail] = useState(null);
    const { id: productId } = useParams();
    const [loading, setLoading] = useState(false);


    // Carga productos desde la DB
    const getItem = async () => {
        setLoading(true);
        const listaTemporal = await consultarDatabase('productos');
        setLoading(false);
        //setListaProductos(listaTemporal);
        // console.log("lista Temporal: ", listaTemporal);

        if (!loading) {
            setLoading(true);
            setItemDetail(null);
            let productoEncontrado = listaTemporal.find(e => e.id === parseInt(productId));
            setItemDetail(productoEncontrado);
            setLoading(false);
        }
    };




    /* Hook de Ciclo de Vida */
    useEffect(() => {
        /* Llamando al item para obtener TODOS los detalles a partir del ID entregado por Props */

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

