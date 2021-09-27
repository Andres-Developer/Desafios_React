import React, { useState } from 'react';
import "./../../assets/css/ItemCount.css";

const ItemCount = ({ stock, initial }) => {
    console.log(stock, initial);//Testing props
    //Paso a Number los props
    stock = Number(stock);
    initial = Number(initial);
    //Estado:
    const [count, setCount] = useState(initial);
    //Lógica de botones
    let onAdd = () => { count < stock ? setCount(count + 1) : alert(`No puedes agregar más de ${stock} productos porque no hay más stock`); };
    let onMinus = () => { count > initial ? setCount(count - 1) : alert(`El valor mínimo es: ${initial}`); };
    //Render
    return (
        <>
            <div className="counter">
                <button className="buttonItem minus btn" onClick={() => onMinus()}>-</button>
                <div className="showCount">{count}</div>
                <button className="buttonItem add btn" onClick={() => onAdd()}>+</button>
            </div>
        </>
    );
};



export default ItemCount;
