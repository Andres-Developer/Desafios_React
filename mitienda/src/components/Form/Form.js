import React from 'react';
import { useState, useContext } from 'react';
import { consultarDocumentoDatabase, guardarDatabase, fechaFirebase } from './../../config/firebaseConfig';
import { Spinner, Modal, Button } from 'react-bootstrap';
import { CartContext } from 'context/CartContext';

export const Form = () => {
    const [ordenCompra, setOrdenCompra] = useState(null);
    const [loading, setLoading] = useState(false);

    const [nombre, setNombre] = useState(null);
    const [apellido, setApellido] = useState(null);
    const [email, setEmail] = useState(null);
    const [telefono, setTelefono] = useState(null);

    //Context de Cart
    const { itemsCarrito, setItemsCarrito, totalItems, removeItem, addCountItem, removeCountItem, totalPrecio } = useContext(CartContext);

    //Manejador eveto submit formulario
    const handleSubmit = async (event) => {
        event.preventDefault();
        const nueva_orden = {
            buyer: {
                nombre,
                apellido,
                email,
                telefono
            },
            items: [...itemsCarrito],
            date: fechaFirebase(),
            total: totalPrecio
        };
        // console.log(ordenCompra);
        setLoading(true);
        let ordenGuardada = await guardarDatabase('ordenes_compra', nueva_orden);
        // console.log("orden Guardada: ", ordenGuardada.id);        
        alert(`orden registrada con éxito, id: ${ordenGuardada.id}`);
        //Obtiene toda la orden desde la DB
        getOrder(ordenGuardada.id);
        setLoading(false);
    };

    // Carga la Orden generada desde la DB
    const getOrder = async (idOrder) => {
        setLoading(true);
        setOrdenCompra(null);
        const ordenObtenida = await consultarDocumentoDatabase('ordenes_compra', idOrder);
        setLoading(false);
        console.log("orden Obtenida: ", ordenObtenida);
        setOrdenCompra(ordenObtenida);
    };

    //Función que muestra un  número en formato separado por comas en los miles (para facilidad de ver el número)
    const muestraNumeroComas = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    
    return (
        !ordenCompra ?
            <form className="container px-5 my-5" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="inputNombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="inputNombre" aria-describedby="name" placeholder="Ingresa tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label for="inputApellido" className="form-label">Apellido</label>
                    <input type="text" className="form-control" id="inputApellido" aria-describedby="last_name" placeholder="Ingresa tu apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label for="inputEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <div id="emailHelp" className="form-text">Nunca compartiremos tu e-mail con nadie</div>
                </div>
                <div className="mb-3">
                    <label for="inputTelefono" className="form-label">Telefono</label>
                    <input type="text" className="form-control" id="inputTelefono" aria-describedby="phone" placeholder="Telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                </div>
                <input type="submit" className="btn btn-primary" value="Orden de Compra" />
            </form>
            :
            <>
                <div className="h3">
                    Felicidades, tu orden de compra es: { }
                </div>
                <table id="tablaCart" className='table table-bordered align-middle'>
                    <thead  >
                        <tr>
                            <th className="text-center">Producto</th>
                            <th className="text-center">Cantidad</th>
                            <th className="text-center">Precio unitario</th>
                            <th className="text-center">Precio*cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordenCompra.items.map(e => (
                            <tr key={e.idProducto} className="">
                                <td className="d-flex justify-content-end">
                                    <div className="text-capitalize">
                                        {e.title + ' ' + e.marca + ' id:' + e.idProducto}
                                        <img className="ms-3" src={`./../` + e.pictureUrl} alt="" width="50px" />
                                    </div>
                                </td>
                                <td className="py-auto text-center" >{e.cantidad} </td>
                                <td className="py-auto text-center" >${muestraNumeroComas(e.precio)} </td>
                                <td className="py-auto text-center" >${muestraNumeroComas(e.precio * e.cantidad)} </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot >
                        <tr>
                            <th className="text-end" colSpan="2">Total cantidad</th>
                            <th className="text-center">{totalItems}</th>
                            <th className="text-end" colSpan="1">Total precio</th>
                            <th className="text-center">${muestraNumeroComas(totalPrecio)}</th>
                        </tr>
                    </tfoot>
                </table>
            </>
    );
};
