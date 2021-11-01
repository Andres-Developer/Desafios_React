import React, { createContext, useState, useEffect } from "react";

const ProviderCart = ({ children }) => {
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrecio, setTotalPrecio] = useState(0);
    const [itemsCarrito, setItemsCarrito] = useState([]);

    useEffect(() => {
        let sumaCantidad = 0;
        let sumaPrecios = 0;
        //---Suma cantidad TOTAL de productos en el Carrito
        itemsCarrito.forEach(e => {
            sumaCantidad += e.cantidad;
            sumaPrecios += e.cantidad * e.precio;
        });
        setTotalItems(sumaCantidad);
        setTotalPrecio(sumaPrecios);
    }, [itemsCarrito]);

    //Función que agrega items a la lista de objetos de items
    const addItem = (item) => {
        //----Verifica si la lista está vacía
        if (itemsCarrito.length === 0) {
            setItemsCarrito([...itemsCarrito, item]);
        } else {
            //----Busca si el item está repetido
            let itemRepetido = itemsCarrito.find(e => e.idProducto === item.idProducto);
            //----Condición si hay repetidos
            if (itemRepetido) {
                let itemActualizado = { ...itemRepetido, 'cantidad': itemRepetido.cantidad + Number(item.cantidad) };
                let itemsSinItemRepetido = itemsCarrito.map(e => (e.idProducto === item.idProducto ? itemActualizado : e));
                setItemsCarrito(itemsSinItemRepetido);
            } else {
                setItemsCarrito([...itemsCarrito, item]);
            }
        }
    };
    //Función para remover item de la lista de items:
    const removeItem = (idProducto) => {
        let listaSinItem = itemsCarrito.filter(e => e.idProducto !== idProducto);
        setItemsCarrito(listaSinItem);
    };
    //Función para agregar más Cantidad a un mismo item
    const addCountItem = (idProducto, cantidad, stock) => {
        let listaModCantidadItem = itemsCarrito.map(e => {
            if (e.idProducto === idProducto) {
                if (e.cantidad < Number(stock)) {
                    return { ...e, 'cantidad': e.cantidad += Number(cantidad) };
                } else {
                    alert(`No puedes agregar más productos que el stock de ${stock}`);
                    return e;
                }
            } else {
                return e;
            }
        });
        setItemsCarrito(listaModCantidadItem);
    };
    //Funcion para remover Cantidad a un mismo item
    const removeCountItem = (idProducto, cantidad) => {
        let listaModCantidadItem = itemsCarrito.map(e => {
            if (e.idProducto === idProducto) {
                if (e.cantidad > 1) {
                    return { ...e, 'cantidad': e.cantidad -= Number(cantidad) };
                } else {
                    alert(`No puedes eliminar menos productos que 1, si deseas puedes eliminar el item con el botón de: X`);
                    return e;
                }
            } else {
                return e;
            }
        });
        setItemsCarrito(listaModCantidadItem);
    };

    return (
        <CartContext.Provider value={{ itemsCarrito, setItemsCarrito, addItem, removeItem, addCountItem, removeCountItem, totalItems, totalPrecio }}>
            {children}
        </CartContext.Provider>
    );
};
export default ProviderCart;
export const CartContext = createContext();
