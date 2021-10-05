import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import React from 'react';
import './../../assets/css/ItemListContainer.css';
import ItemCount from './ItemCount';
import ItemList from './ItemList';
import listaProductos from './../../data/listaProductos';

const ItemListContainer = (props) => {
    const [catalogo, setCatalogo] = useState("--State (Catálogo de Productos)--");
    const [items, setItems] = useState(null);

    /* Simulación llamada a Servidor que entrega un Array de Items */
    /* 1) Creo array de Items */
    const itemsArray = [
        { id: 1, title: "Remera Vintage", stock: 10, pictureUrl: "http://lorempixel.com/400/200/" },
        { id: 2, title: "Reloj Digital", stock: 5, pictureUrl: "http://lorempixel.com/400/200/" },
        { id: 3, title: "Gorro", stock: 4, pictureUrl: "http://lorempixel.com/400/200/" },
        { id: 4, title: "Bufanda", stock: 2, pictureUrl: "http://lorempixel.com/400/200/" },
        { id: 5, title: "Medias", stock: 10, pictureUrl: "http://lorempixel.com/400/200/" },
    ];

    /* Hook de Ciclo de Vida */
    useEffect(() => {
        /* setTimeout(() => setTextoTest("Listo"), 2000); */
        /* Llamando al servidor  */
        const llamadaServidor = async () => {
            /* await new Promise((resolve, reject) => setTimeout(() => setTextoTest("Listo"), 2000)); */
            /* await new Promise((resolve, reject) => setTimeout(resolve, 2000)).then(() => setTextoTest("Listo")); */
            await new Promise((resolve, reject) => setTimeout(resolve, 2000)).then(() => setItems(listaProductos));
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
