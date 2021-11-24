import React, { useState } from 'react';
import Item from './Item';
import './../../assets/css/ItemList.css';

const ItemList = ({ itemsArray }) => {
    const [items, setItems] = useState(itemsArray);

    return (
        <div>
            <div className="listaItems">
                {items.map((e, idx) => {
                    return <Item id={e.id} id_interno={e.id_interno} title={e.title} stock={e.stock} pictureUrl={e.pictureUrl} key={idx} />;
                })}
            </div>
        </div>
    );
};

export default ItemList;
