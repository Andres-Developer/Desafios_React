import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import './../../assets/css/ItemListContainer.css';
import ItemList from './ItemList';
import listaProductos from './../../data/listaProductos';
import { useParams } from 'react-router';

const ItemListContainer = (props) => {
    const [items, setItems] = useState(null);
    //Obteniendo parámetros por URL
    const { id: idCategory } = useParams();
    const [loading, setLoading] = useState(false);
    const categorias = ['Accesorios', 'Calzado', 'Vestir'];

    /* Hook de Ciclo de Vida */
    useEffect(() => {

        const cargaProductos = new Promise((resolve, reject) => {
            setLoading(true);
            setTimeout(() => {
                if (idCategory != 0) {
                    resolve(listaProductos.filter((producto) => producto.IdClasficacion == idCategory));
                } else {
                    resolve(listaProductos);
                }
            }, 1000);
        });
        /* Llamando al servidor  */
        /*         const llamadaServidor = async () => {            
                    await new Promise((resolve, reject) => setTimeout(resolve, 2000))
                        .then(() => {
                            if (idCategory) {
                                console.log("Entró por URL params: ", idCategory);
                                const categoryFilter = listaProductos.filter(
                                    (producto) => producto.IdClasficacion === parseInt(idCategory));
        
                                setItems(categoryFilter);
                            } else {
                                setItems(listaProductos);
                            }
        
                        });
                };
                llamadaServidor(); */

        //
        cargaProductos.then((response) => {
            setLoading(false);
            setItems(response);
        });
    }, [idCategory]);

    if (loading) { return <Spinner animation="border" variant="primary" />; }
    else {
        return (
            <div className="itemList">
                <h2>{props.greeting}</h2>
                <h3>Conoce todos nuestros productos </h3>

                <div className="showCards">
                    {idCategory ? <h5>Estos son los Items de la categoría: {categorias[idCategory - 1]}</h5> : <h5>Estos son todos nuestros productos</h5>}
                    {items == null ? <Spinner animation="border" variant="primary" /> : <ItemList itemsArray={items} />}

                </div>
            </div>
        );
    }
};

const muestraItems = (items) => {
    console.log(items);
};
export default ItemListContainer;
