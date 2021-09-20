import { useState } from 'react';
import React from 'react';
import './../assets/css/ItemListContainer.css';

const ItemListContainer = (props) => {
    const [catalogo, setCatalogo] = useState("--State (Catálogo de Productos)--");
    return (
        <div className="itemList">
            <h2>{props.greeting}</h2>
            <h3>Conoce todos nuestros productos: </h3>
            <h4>{catalogo}</h4>
        </div>
    );
};

export default ItemListContainer;
