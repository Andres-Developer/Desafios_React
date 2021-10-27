import ItemCount from "./ItemCount";
import { useState, useEffect } from 'react';
import './../../assets/css/ItemDetail.css'

const ItemDetail = ({ itemDetail }) => {
    const [totalProductos, setTotalProductos] = useState(0);
    /* console.log(itemDetail); */

    const productosAgregadosCarrito = (quantityToAdd) => {
        setTotalProductos(quantityToAdd);
    };


    useEffect(() => {
        //console.log("Productos traídos de ItemCount: ", totalProductos);
    }, [totalProductos]);
    return (
        <div className="container d-flex justify-content-center align-items-center mt-5 pt-4">
            <div id="columnas" className="row">
                <div className="col-12 col-md-6">
                    <img className ="img-fluid" src={`./../` + itemDetail.pictureUrl}  alt="" />
                </div>
                <div className="col-12 col-md-6 pt-3">
                    <div className="h3 text-capitalize">{itemDetail.title + " " + itemDetail.marca.toUpperCase()}</div>
                    <div className="h5 text-black-50 ">{itemDetail.descripcion}
                        
                    </div>
                    <div className="">
                        <div className="mt-4">
                            <button type="button" className="btn btn-warning" disabled data-bs-toggle="button">
                                Stock disponible: {itemDetail.stock}
                            </button>
                            <div className="h4 mt-3">{"Precio: " + itemDetail.price + "$"}</div>
                            {/* Agrego ItemCount con datos de Stock traídos por props */}
                            {/* Le paso el evento para que desde ItemCount Me guarde la cantiidad de productos Agregados al Carrito */}
                            <ItemCount productosAgregadosCarrito={productosAgregadosCarrito} idProducto={itemDetail.id} stock={itemDetail.stock} precio={itemDetail.price} initial={1} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ItemDetail;