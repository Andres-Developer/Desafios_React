import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
//Consulta a configuracion firebase
import { consultarDatabase } from './../../config/firebaseConfig';
import './../../assets/css/ItemListContainer.css';
import ItemList from './ItemList';
import { useParams } from 'react-router';

const ItemListContainer = (props) => {

    const [items, setItems] = useState(null);

    //Obteniendo parámetros por URL
    const { id: idCategory } = useParams();
    const [loading, setLoading] = useState(false);

    const categorias = ['Accesorios', 'Calzado', 'Vestir'];

    // Carga productos desde la DB
    const llamadaServidor = async () => {
        setLoading(true);
        const listaTemporal = await consultarDatabase('items');
        setLoading(false);

        if (!loading) {
            if (idCategory) {
                setLoading(true);
                setItems(null);
                const categoryFilter = listaTemporal.filter(
                    (producto) => producto.IdCategory === parseInt(idCategory));
                setItems(categoryFilter);
                setLoading(false);
            } else {
                setItems(null);
                setItems(listaTemporal);
            }
        }
    };


    /* Hook de Ciclo de Vida pendiente de la categoría */
    useEffect(() => {
        /* Llamando al servidor  */

        setItems(null);
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
