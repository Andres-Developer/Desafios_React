import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import './../../assets/css/ItemListContainer.css';
import ItemList from './ItemList';
import listaProductos from './../../data/listaProductos';
import { useParams } from 'react-router';

const ItemListContainer = (props) => {
    const [catalogo, setCatalogo] = useState("--State (Catálogo de Productos)--");
    const [items, setItems] = useState(null);
    //Obteniendo parámetros por URL
    const { id: idCategory } = useParams();

    /* Hook de Ciclo de Vida */
    useEffect(() => {
        /* setTimeout(() => setTextoTest("Listo"), 2000); */
        /* Llamando al servidor  */
        const llamadaServidor = async () => {
            /* await new Promise((resolve, reject) => setTimeout(() => setTextoTest("Listo"), 2000)); */
            /* await new Promise((resolve, reject) => setTimeout(resolve, 2000)).then(() => setTextoTest("Listo")); */
            await new Promise((resolve, reject) => setTimeout(resolve, 2000))
                .then(() => {
                    if (idCategory) {
                        const categoryFilter = listaProductos.filter(
                            (producto) =>
                        );
                    }
                    setItems(listaProductos);

                });
        };
        llamadaServidor();
    }, []);

    return (
        <div className="itemList">
            <h2>{props.greeting}</h2>
            <h3>Conoce todos nuestros productos: </h3>
            <h4>{catalogo}</h4>
            {/* <ItemCount stock="5" initial="1"  /> */}
            {/* **** Mostrando Items**** */}
            <div className="showCards">
                <h5>Estos son los Items: </h5>
                {items == null ? <Spinner animation="border" variant="primary" /> : <ItemList itemsArray={items} />}
            </div>
        </div>
    );
};

export default ItemListContainer;
