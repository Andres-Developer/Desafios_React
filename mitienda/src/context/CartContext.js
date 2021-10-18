import React, { createContext, useState, useEffect } from "react";

const ProviderCart = ({ children }) => {
    const [totalItems, setTotalItems] = useState(0);
    const [itemsCarrito, setItemsCarrito] = useState([
    ]);

    useEffect(() => {
        console.log(itemsCarrito);
        let sumaCantidad = 0;
        //---Suma cantidad TOTAL de productos en el Carrito
        itemsCarrito.forEach(e => sumaCantidad += e.cantidad);
        // console.log("sumatoria de cantidad productos: ", sumaCantidad);
        setTotalItems(sumaCantidad);
    }, [itemsCarrito]);

    //Función que agrega items a la lista de objetos de items
    const addItem = (item) => {
        //console.log("click addItem: ", item); //---Testing
        //console.log("Items del context:", itemsCarrito);//---Testing
        //----Verifica si la lista está vacía
        if (itemsCarrito.length == 0) {
            setItemsCarrito([...itemsCarrito, item]);
        } else {
            //----Busca si el item está repetido
            let itemRepetido = itemsCarrito.find(e => e.idProducto == item.idProducto);
            console.log("rta find:", itemRepetido);
            //----Condición si hay repetidos
            if (itemRepetido) {
                //console.log("Item para actualizar cantidad:", item);//---Testing
                let itemActualizado = { ...itemRepetido, 'cantidad': itemRepetido.cantidad + Number(item.cantidad) };
                let itemsSinItemRepetido = itemsCarrito.map(e => (e.idProducto == item.idProducto ? itemActualizado : e));
                setItemsCarrito(itemsSinItemRepetido);
            } else {
                //console.log("Nuevo item para agregar:", item);//---Testing
                setItemsCarrito([...itemsCarrito, item]);
            }
        }
    };
    return (
        <CartContext.Provider value={{ itemsCarrito, addItem, totalItems }}>
            {children}
        </CartContext.Provider>
    );
};
export default ProviderCart;
export const CartContext = createContext();
