import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
//Consulta a configuracion firebase
import { consultarDatabase } from './../../config/firebaseConfig';
import './../../assets/css/ItemListContainer.css';
import ItemList from './ItemList';
//import listaProductos from './../../data/listaProductos';
import { useParams } from 'react-router';

const ItemListContainer = (props) => {
    const [listaProductos, setListaProductos] = useState(null);
    const [items, setItems] = useState(null);
    const [itemsFiltrados, setItemsFiltrados] = useState(null);


    //Obteniendo parámetros por URL
    const { id: idCategory } = useParams();
    const [loading, setLoading] = useState(false);

    const categorias = ['Accesorios', 'Calzado', 'Vestir'];

    // Carga productos desde la DB
    const llamadaServidor = async () => {
        setLoading(true);
        const listaTemporal = await consultarDatabase('items');
        setLoading(false);
        //setListaProductos(listaTemporal);
        // console.log("lista Temporal: ", listaTemporal);

        if (!loading) {
            if (idCategory) {
                setLoading(true);
                setItems(null);
                setItemsFiltrados(null);
                // console.log("Entró por URL params: ", idCategory);
                // console.log("Entró con lista temporal: ", listaTemporal);
                const categoryFilter = listaTemporal.filter(
                    (producto) => producto.IdCategory === parseInt(idCategory));
                // console.log("categoryFilter: ", categoryFilter)
                setItems(categoryFilter);
                setItemsFiltrados(categoryFilter);
                // console.log("Items por categoría: filtrados ", itemsFiltrados);
                setLoading(false);
            } else {
                // console.log("entró por else: sin categoría, loading:", loading);
                setItems(null);
                setItemsFiltrados(null);
                setItems(listaTemporal);
            }
        }
    };


    /* Hook de Ciclo de Vida */
    // useEffect(() => {
    //     llamadaServidor();
    //     setLoading(false);
    // }, []);

    /* Hook de Ciclo de Vida pendiente de la categoría */
    useEffect(() => {
        /* Llamando al servidor  */

        setItems(null);
        setItemsFiltrados(null);
        llamadaServidor(idCategory);

    }, [idCategory]);


    return (
        <div className="itemList">
            <h2>{props.greeting}</h2>
            <h3>Conoce todos nuestros productos </h3>

            {idCategory ? <h5>Estos son los Items de la categoría: {categorias[idCategory - 1]}</h5> : <h5>Estos son todos nuestros productos</h5>}

            {
                items ?
                    <div className="showCards">
                        <ItemList itemsArray={items} />
                    </div>
                    :
                    <div className="showCards">
                        <Spinner animation="border" variant="primary" />
                    </div>
            }
        </div >
    );
};

export default ItemListContainer;
