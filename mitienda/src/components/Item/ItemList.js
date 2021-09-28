import React, { useState } from 'react';
import Item from './Item';
import moduleName from './../../assets/css/ItemList.css';

const ItemList = ({ itemsArray }) => {
    //console.log(items);
    const [items, setItems] = useState(itemsArray);

    return (
        <div>            
            <div className="listaItems">
                {items.map(e => (<Item id={e.id} title={e.title} pictureUrl={e.pictureUrl} />))}
                {/* {console.log(items)} */}
            </div>
        </div>
    );
};

export default ItemList;
