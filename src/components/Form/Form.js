import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { consultarDocumentoDatabase, guardarDatabase, fechaFirebase } from './../../config/firebaseConfig';
import { Spinner, Modal, Button } from 'react-bootstrap';
import { CartContext } from 'context/CartContext';
import { useLocation, Link } from 'react-router-dom';
import './../../assets/css/Form.css';


export const Form = () => {
    const [ordenCompra, setOrdenCompra] = useState(null);
    const [loading, setLoading] = useState(false);

    const [nombre, setNombre] = useState(null);
    const [apellido, setApellido] = useState(null);
    const [email, setEmail] = useState(null);
    const [telefono, setTelefono] = useState(null);

    //Context de Cart
    const { totalItems, totalPrecio, setItemsCarrito } = useContext(CartContext);

    //Props del Lik
    const location = useLocation();
    const itemsInfoCompleta = location.itemsInfoCompleta;

    //Manejador eveto submit formulario
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("itemsInfoCompleta: ", itemsInfoCompleta);
        const nueva_orden = {
            buyer: {
                nombre,
                apellido,
                email,
                telefono
            },
            items: [...itemsInfoCompleta],
            date: fechaFirebase(),
            totalItems,
            totalPrecio
        };
        // console.log(ordenCompra);
        setLoading(true);
        let ordenGuardada = await guardarDatabase('ordenes_compra', nueva_orden);
        // console.log("orden Guardada: ", ordenGuardada.id);        
        //alert(`orden registrada con éxito, id: ${ordenGuardada.id}`);

        //Setea a 0 el contenido del carrito de compras
        setItemsCarrito([]);
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
        // console.log("orden Obtenida: ", ordenObtenida);
        setOrdenCompra(ordenObtenida);
    };

    //Función para convertir Timestamp a formato legible por el usuario
    const convierteFechaHora = (timeStamp) => {
        // console.log(timeStamp.toMillis())
        let fecha = new Date(timeStamp.toMillis()); //Fecha-hora con el timeStamp de Firebase
        let mes = fecha.getMonth() + 1; //obteniendo mes
        let dia = fecha.getDate(); //obteniendo dia
        let ano = fecha.getFullYear(); //obteniendo año
        let hora2 = fecha.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
        });
        return `${dia}/${mes}/${ano} -  ${hora2}`;
    };

    //Función que muestra un  número en formato separado por comas en los miles (para facilidad de ver el número)
    const muestraNumeroComas = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };



    if (itemsInfoCompleta !== undefined) {
        // console.log("itemsInfoCompleta: ", itemsInfoCompleta);
        // console.log("ordenCompra", ordenCompra);
        return (
            !ordenCompra ?
                <form className="container px-5 my-5 maxAncho" onSubmit={handleSubmit}>
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
                    <input type="submit" className="btn btn-primary" value="Generar orden de Compra" />
                </form>
                : loading ?
                    <Spinner />
                    :
                    <div className="container d-flex flex-column justify-content-center align-items-center pt-4 ">
                        <div className="text-primary h4">
                            Felicidades, el resumen de tu compra es: { }
                        </div>
                        <table className='table table-bordered align-middle mt-4 mb-3 maxAncho'>
                            <tr>
                                <th>Id de orden</th>
                                <td className="text-muted fw-bold">{ordenCompra.id}</td>
                            </tr>
                            <tr>
                                <th>Fecha/Hora de compra</th>
                                <td>{convierteFechaHora(ordenCompra.date)}</td>
                            </tr>
                            <tr>
                                <th>Nombre</th>
                                <td>{ordenCompra.buyer.nombre}</td>
                            </tr>
                            <tr>
                                <th>Apellido</th>
                                <td>{ordenCompra.buyer.apellido}</td>
                            </tr>
                            <tr>
                                <th>Teléfono</th>
                                <td>{ordenCompra.buyer.telefono}</td>
                            </tr>
                            <tr>
                                <th>e-mail</th>
                                <td>{ordenCompra.buyer.email}</td>
                            </tr>
                        </table>
                        <div className="text-primary h4 pt-4">
                            Items de tu compra:
                        </div>
                        <table id="tablaOrden" className='table table-bordered align-middle maxAncho'>
                            <thead  >
                                <tr>
                                    <th className="text-center">Producto</th>
                                    <th className="text-center">id</th>
                                    <th className="text-center">Cantidad</th>
                                    <th className="text-center">Precio unitario</th>
                                    <th className="text-center">Precio * cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordenCompra.items.map(e => (
                                    <tr key={e.idProducto} className="">
                                        <td className="d-flex justify-content-end">
                                            <div className="text-capitalize">
                                                {e.title + ' ' + e.marca}
                                                <img className="ms-3" src={`./../` + e.pictureUrl} alt="" width="50px" />
                                            </div>
                                        </td>
                                        <td>{e.idProducto}</td>
                                        <td className="py-auto text-center" >{e.cantidad} </td>
                                        <td className="py-auto text-center" >${muestraNumeroComas(e.precio)} </td>
                                        <td className="py-auto text-center" >${muestraNumeroComas(e.precio * e.cantidad)} </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot >
                                <tr>
                                    <th className="text-end" colSpan="2">Total cantidad</th>
                                    <th className="text-center">{ordenCompra.totalItems}</th>
                                    <th className="text-end" colSpan="1">Total precio</th>
                                    <th className="text-center">${muestraNumeroComas(ordenCompra.totalPrecio)}</th>
                                </tr>
                            </tfoot>
                        </table>
                        <Link className="btn btn-primary" to="/">Volver a Productos</Link>
                    </div>
        );
    }
    else {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center mt-4 pt-4">
                <h5>Para generar una órden de compra debes tener productos en tu carrito 🛒</h5>
                <h6 className="mt-4 mb-5">Da click en el siguiente botón para que puedas comprar </h6>
                <Link className="btn btn-primary" to="/">Volver a Productos</Link>
            </div>
        );

    }

};
