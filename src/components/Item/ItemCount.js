import React, { useState, useContext } from 'react';
import "./../../assets/css/ItemCount.css";
import { Link } from 'react-router-dom';
import { CartContext } from 'context/CartContext';

const ItemCount = ({ productosAgregadosCarrito, stock, initial, idProducto, precio }) => {
    //Paso a Number los props
    stock = Number(stock);
    initial = Number(initial);
    //Estado:
    const [count, setCount] = useState(initial);
    const [agregadoCarrito, setAgregadoCarrito] = useState(false);
    //Context:
    const { addItem } = useContext(CartContext);
    //Lógica de botones
    let onAdd = () => { count < stock ? setCount(count + 1) : alert(`No puedes agregar más de ${stock} productos porque no hay más stock`); };
    let onMinus = () => { count > initial ? setCount(count - 1) : alert(`El valor mínimo es: ${initial}`); };
    //Render
    return (
        <>
            <div>
                {!agregadoCarrito ?
                    <>
                        <div className="counter">
                            <button className="buttonItem minus btn" onClick={() => onMinus()}>-</button>
                            <div className="showCount">{count}</div>
                            <button className="buttonItem add btn" onClick={() => onAdd()}>+</button>
                        </div>
                        <div className="botonAgregar">
                            <button type="" className="btn btn-dark" onClick={() => { productosAgregadosCarrito(count); setAgregadoCarrito(true); addItem({ idProducto, 'cantidad': count, precio }); }}>Agregar al carrito</button>
                        </div>
                    </>
                    :
                    <div className="botonTerminarCompra">
                        <br />
                        <Link type="" className="btn btn-primary my-2" to="/cart">Terminar mi Compra</Link>
                        <br />

                    </div>
                }
                <Link type="" className="btn btn-outline-success mt-5" to="/">Seguir Comprando</Link>
            </div>
        </>
    );
};



export default ItemCount;
