import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//Consulta a configuracion firebase
import { consultarDatabase, consultarDocumentoDatabase } from './../../config/firebaseConfig';
import { Spinner } from 'react-bootstrap';
//import Data from "../../data/listaProductos.json"; //Información completa de los ITEMS
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
    const [itemDetail, setItemDetail] = useState(null);
    const { id: productId } = useParams();
    const [loading, setLoading] = useState(false);


    // Carga producto desde la DB
    const getItem = async () => {
        setLoading(true);
        const productoObtenido = await consultarDocumentoDatabase ('productos', productId)
        setLoading(false);

        if (!loading) {
            setLoading(true);
            setItemDetail(null);
            setItemDetail(productoObtenido);
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
            {!itemDetail ?
                <div className="container d-flex flex-column justify-content-center align-items-center my-5 py-5">
                <Spinner animation="border" variant="primary" />
            </div>
                :
                <ItemDetail itemDetail={itemDetail} />}

            {/*  */}
        </div>
    );
};
export default ItemDetailContainer;

