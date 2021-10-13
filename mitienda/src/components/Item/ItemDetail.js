import ItemCount from "./ItemCount";
import { useState, useEffect } from 'react';


const ItemDetail = ({ itemDetail }) => {
    const [totalProductos, setTotalProductos] = useState(0);
    /* console.log(itemDetail); */

    const productosAgregadosCarrito = (quantityToAdd) => {
        setTotalProductos(quantityToAdd);
    };


    useEffect(() => {
        console.log("Productos traídos de ItemCount: ", totalProductos);
    }, [totalProductos]);
    return (
        <>
            <h3>{itemDetail.title + " " + itemDetail.marca.toUpperCase()}</h3>
            <div className="d-flex align-items-center">
                <img src={`./../` + itemDetail.pictureUrl} width="30%" alt="" />
                <div>
                    <button type="button" className="btn btn-warning" disabled data-bs-toggle="button">
                        Stock disponible: {itemDetail.stock}
                    </button>
                    <h4>{"Precio: " + itemDetail.price + "$"}</h4>
                    {/* Agrego ItemCount con datos de Stock traídos por props */}
                    {/* Le paso el evento para que desde ItemCount Me guarde la cantiidad de productos Agregados al Carrito */}
                    <ItemCount productosAgregadosCarrito={productosAgregadosCarrito} stock={itemDetail.stock} initial={1} />
                </div>
            </div>
        </>
    );
};


export default ItemDetail;