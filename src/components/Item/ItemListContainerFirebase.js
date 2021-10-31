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
        <div className="itemList mt-5 pt-5">
            <h4>Conoce nuestros productos: </h4>
            {idCategory ?
                <h5> Categoría: <span className="text-danger">{categorias[idCategory - 1]}</span></h5>
                :
                <h5 className="text-danger">(Todos)</h5>
            }

            {
                items ?
                    <div className="showCards container mx-5 px-5">
                        <ItemList itemsArray={items} />
                    </div>
                    :
                    <div className="showCards container mx-5 px-5">
                        <Spinner animation="border" variant="primary" />
                    </div>
            }
        </div >
    );
};

export default ItemListContainer;
