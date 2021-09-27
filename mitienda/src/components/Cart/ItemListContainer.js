import { useState } from 'react';
import React from 'react';
import './../../assets/css/ItemListContainer.css';
import ItemCount from './ItemCount';


const ItemListContainer = (props) => {
    const [catalogo, setCatalogo] = useState("--State (Catálogo de Productos)--");
    let onAdd = () => { console.log("click!!") };
    return (
        <div className="itemList">
            <h2>{props.greeting}</h2>
            <h3>Conoce todos nuestros productos: </h3>
            <h4>{catalogo}</h4>
            <ItemCount stock="5" initial="1" /* onAdd={onAdd} */ />
        </div>
    );
};



export default ItemListContainer;
