import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//Consulta a configuracion firebase
import { consultarDocumentoDatabase } from './../../config/firebaseConfig';
import { Spinner } from 'react-bootstrap';
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
    const [itemDetail, setItemDetail] = useState(null);
    const { id: productId } = useParams();
    const [loading, setLoading] = useState(false);
    const [noEncontrado, setNoEncontrado] = useState(false);


    // Carga producto desde la DB
    const getItem = async () => {
        setLoading(true);
        const productoObtenido = await consultarDocumentoDatabase('items', productId);
        setLoading(false);

        if (!loading) {
            setLoading(true);
            setItemDetail(null);
            if (productoObtenido !== null) {
                setItemDetail(productoObtenido);
            } else {
                setNoEncontrado(true);
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        getItem();
    }, [productId]);

    return (
        <div>
            {/* Llamando al componeente que renderizar√° los detalles del Item */}
            {
                !noEncontrado ?
                    !itemDetail ?
                        <div className="container d-flex flex-column justify-content-center align-items-center my-5 py-5">
                            <Spinner animation="border" variant="primary" />
                        </div>
                        :
                        <ItemDetail itemDetail={itemDetail} />
                    :
                    <div className="container d-flex align-items-center justify-content-center my-5 py-5">
                        <div className="h3">Producto con id: <strong className="text-danger">{productId}</strong> no encontrado en la base de datos</div>
                    </div>
            }
        </div>
    );
};
export default ItemDetailContainer;

