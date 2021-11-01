import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import './../../assets/css/ItemListContainer.css';
import ItemList from '../Item/ItemList';
import listaProductos from './../../data/listaProductos';
import { useParams } from 'react-router';

const ItemListContainer = (props) => {
    const [items, setItems] = useState(null);
    //Obteniendo parámetros por URL
    const { id: idCategory } = useParams();

    const categorias = ['Accesorios', 'Calzado', 'Vestir'];

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
                            (producto) => producto.IdClasficacion === parseInt(idCategory));

                        setItems(categoryFilter);
                    } else {
                        setItems(listaProductos);
                    }

                });
        };
        llamadaServidor();
    }, [idCategory]);

    return (
        <div className="itemList">
            <h2>{props.greeting}</h2>
            <h3>Conoce todos nuestros productos </h3>

            <div className="showCards">
                {idCategory ? <h5>Estos son los Items de la categoría: {categorias[idCategory - 1]}</h5> : <h5>Estos son todos nuestros productos</h5>}
                {items === null ? <Spinner animation="border" variant="primary" /> : <ItemList itemsArray={items} />}
            </div>
        </div>
    );
};

export default ItemListContainer;
