import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import './../../assets/css/ItemListContainer.css';
import ItemList from './ItemList';
import listaProductos from './../../data/listaProductos';
import { useParams } from 'react-router';

const ItemListContainer = (props) => {
    const [catalogo, setCatalogo] = useState("--State (Catálogo de Productos)--");
    const [items, setItems] = useState(null);
    const [loading, setLoading] = useState(true);
    //Obteniendo parámetros por URL
    const { id: idCategory } = useParams();

    const categorias = ['Accesorios', 'Calzado', 'Vestir'];

    /* Hook de Ciclo de Vida */
    useEffect(() => {
        /* Llamando al servidor  */
        // console.log("Hook efecto");
        const llamadaServidor = async () => {
            await new Promise((resolve, reject) => setTimeout(resolve, 800))
                .then(() => {
                    setLoading(true);
                    if (idCategory) {
                        setItems(null);
                        //console.log("Entró por URL params: ", idCategory);
                        const categoryFilter = listaProductos.filter(
                            (producto) => producto.IdClasificacion === parseInt(idCategory));                        
                        setItems(categoryFilter);                       
                    } else {
                        setItems(null);
                        setItems(listaProductos); 
                    }           
                });
        };
        llamadaServidor();
        setLoading(false);
    }, [idCategory]);


    return (
        <div className="itemList">
            <h2>{props.greeting}</h2>
            <h3>Conoce todos nuestros productos </h3>

            {idCategory ? <h5>Estos son los Items de la categoría: {categorias[idCategory - 1]}</h5> : <h5>Estos son todos nuestros productos</h5>}
            {!loading ? <div className="showCards">
                <Spinner animation="border" variant="primary" />
            </div> :
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
