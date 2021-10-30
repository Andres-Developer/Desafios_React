import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { consultarDocumentoDatabase, guardarDatabase, fechaFirebase, consultarDatabase, getFilterCollection } from './../../config/firebaseConfig';
import { Spinner, Modal, Button } from 'react-bootstrap';
import { CartContext } from 'context/CartContext';
import { useLocation, Link } from 'react-router-dom';
import './../../assets/css/Form.css';


export const Form = () => {
    const [ordenCompra, setOrdenCompra] = useState('');
    const [loading, setLoading] = useState(false);

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [emailVerification, setEmailVerification] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [emailVerificationErr, setEmailVerificationErr] = useState(false);
    const [telefono, setTelefono] = useState('');

    //Context de Cart
    const { totalItems, totalPrecio, setItemsCarrito } = useContext(CartContext);

    //Props del LINK
    const location = useLocation();
    const itemsInfoCompleta = location.itemsInfoCompleta;

    // Effect que está pendiente si se genera orden compra para poner loading en false (puesto que ordenCmpra se toma su tiempo)
    useEffect(() => {
        if (ordenCompra) {
            setLoading(false);
        }
    }, [ordenCompra]);


    //--Función Submit que envía la información de Orden de Compra a la DB
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (email === emailVerification && !emailErr && !emailVerificationErr) {
            // console.log("itemsInfoCompleta: ", itemsInfoCompleta);
            setLoading(true);
            let nro_orden = await generaNumeroOrden();
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
                totalPrecio,
                nro_orden
            };
            // console.log(ordenCompra);            
            let ordenGuardada = await guardarDatabase('orders', nueva_orden);
            // console.log("orden Guardada: ", ordenGuardada.id);        
            //Setea a 0 el contenido del carrito de compras
            setItemsCarrito([]);
            //Obtiene toda la orden desde la DB
            getOrder(ordenGuardada.id);
        } else {
            alert("Los e-mail deben coincidir para realizar la la orden de compra");
        }
    };

    //---Funciones Validación Doble Email--------------------------
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const handleEmail = (e) => {
        const emailInput = e.target.value;
        setEmail(emailInput);
        if (emailRegex.test(emailInput)) {
            // console.log("email ok: ", emailInput);
            setEmailErr(false);
        } else {
            setEmailErr(true);
            // console.log("email fail: ", emailInput);
        }
    };

    const handleEmailVerification = (e) => {
        const emailInput = e.target.value;
        setEmailVerification(emailInput);
        if (emailRegex.test(emailInput)) {
            // console.log("email verification ok: ", emailInput);
            setEmailVerificationErr(false);
        } else {
            setEmailVerificationErr(true);
            // console.log("email verification fail: ", emailInput);
        }
    };

    //---Funcion Carga la Orden generada desde la DB--------------------
    const getOrder = async (idOrder) => {
        setOrdenCompra(null);
        const ordenObtenida = await consultarDocumentoDatabase('orders', idOrder);
        // console.log("orden Obtenida: ", ordenObtenida);
        setOrdenCompra(ordenObtenida);
    };

    //----Función para convertir Timestamp a formato legible por el usuario
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

    //---Función que muestra un  número en formato separado por comas en los miles (para facilidad de ver el número)
    const muestraNumeroComas = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    //--Función Generadora de Número de Orden (verifica si existe, lo incrementa)
    let generaNumeroOrden = async () => {
        let dbConsultada = await consultarDatabase("orders");
        if (dbConsultada.length === 0) {
            return 1;
        } else {
            //--Obtiene una lista ordenada descendentemente por "nro_orden" (>0)
            let datosOrdenados = await getFilterCollection("orders", "nro_orden", ">", 0, 1, "desc");

            //--extrae el primer elemento de la lista ordenada
            let primerElementoLista = datosOrdenados[0];

            //--Obtiene el nro_orden del primer elemento:
            let nro_orden_maximo = primerElementoLista.nro_orden;
            //console.log("nro_orden_maximo: ", nro_orden_maximo);

            //Retorna el numero de orden para ser usado
            return nro_orden_maximo + 1;
        }
    };

    //============================= RENDER =========================================================================================
    //--Render Condicional (Renderiza solo si vienen elementos en el carrito de compras)
    if (itemsInfoCompleta !== undefined) {
        // console.log("itemsInfoCompleta: ", itemsInfoCompleta);
        // console.log("ordenCompra", ordenCompra);
        return (
            !ordenCompra && !loading ?
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <div className="headerForm container mt-5 d-flex flex-column justify-content-center align-items-center">
                                <div className="h4">¡Ya casi lo tienes!</div>
                                <div className="h6">Para finalizar la compra por favor diligencia el siguiente formulario</div>
                            </div>
                            <form className="container  pt-4 maxAncho" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="inputNombre" className="form-label">Nombre</label>
                                    <input type="text" className="form-control" id="inputNombre" aria-describedby="name" placeholder="Ingresa tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputApellido" className="form-label">Apellido</label>
                                    <input type="text" className="form-control" id="inputApellido" aria-describedby="last_name" placeholder="Ingresa tu apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputEmail" className="form-label">Email</label>
                                    <input type="email"
                                        className="form-control"
                                        id="inputEmail"
                                        aria-describedby="emailHelp"
                                        placeholder="e-mail"
                                        value={email}
                                        onChange={handleEmail}
                                        required
                                    />
                                    {
                                        emailErr ?
                                            <div id="emailHelp" className="form-text text-danger">Ingresa un email válido: nombre@dominio.net</div>
                                            :
                                            email !== emailVerification ?
                                                <div id="emailHelp" className="form-text text-danger">Los email no coinciden</div>
                                                :
                                                null
                                    }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputEmailVerification" className="form-label">*Repite tu Email</label>
                                    <input type="email"
                                        className="form-control"
                                        id="inputEmailVerification"
                                        aria-describedby="emailHelp"
                                        placeholder="Repite tu e-mail"
                                        value={emailVerification}
                                        onChange={handleEmailVerification}
                                        required />
                                    {
                                        emailVerificationErr ?
                                            <div id="emailHelp" className="form-text text-danger">Ingresa un email válido: nombre@dominio.net</div>
                                            :
                                            email !== emailVerification ?
                                                <div id="emailHelp" className="form-text text-danger">Los email no coinciden</div>
                                                :
                                                null
                                    }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputTelefono" className="form-label">Telefono</label>
                                    <input type="text" className="form-control" id="inputTelefono" aria-describedby="phone" placeholder="Telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                                </div>
                                {email !== emailVerification && (emailErr && emailVerificationErr && !email && !emailVerification) ?
                                    <>
                                        <div className="text-danger form-text">
                                            *Los e-mail deben coincidir para que se habilite el botón "Realizar Compra"
                                        </div>
                                        <input type="submit" className="btn btn-primary" value="Realizar Compra" disabled />
                                    </>
                                    :
                                    (email === emailVerification && email && emailVerification && !emailErr && !emailVerificationErr && nombre && apellido && telefono) ?
                                        <>
                                            <input type="submit" className="btn btn-primary" value="Realizar Compra" />
                                        </>
                                        :
                                        <>
                                            <div className="text-muted form-text">
                                                *Debes ingresar todos los datos para que se habilite el botón "Realizar Compra"
                                            </div>
                                            <input type="submit" className="btn btn-primary" value="Realizar Compra" disabled />
                                        </>

                                }
                            </form>
                        </div>
                        <div className="col-6 mt-5 justify-content-end">
                            <div className="h5">
                                Resumen de tu carrito de compras:
                            </div>
                            {itemsInfoCompleta.map(e => (

                                <ul key={e.idProducto} className="listaResumen " >
                                    <li className="itemListaResumen border border-2 p-2">
                                        <div className=" d-flex justify-content-start align-items-center">
                                            <img className="mx-1" src={`./../` + e.pictureUrl} alt="" width="50px" />
                                            <div>
                                                <div className="h6 text-capitalize">
                                                    {e.title + ' ' + e.marca}
                                                </div>
                                                <div>
                                                    Unidades: {e.cantidad} - Valor unidad: ${muestraNumeroComas(e.precio)}
                                                </div>
                                                <div >
                                                    Valor por cantidad:  ${muestraNumeroComas(e.precio * e.cantidad)}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            ))}
                            <div className="fw-bold">
                                Total cantidades: {totalItems} - Precio Total: ${muestraNumeroComas(totalPrecio)}

                            </div>
                        </div>
                    </div>
                </div >
                : loading ?
                    <div className="container d-flex flex-column justify-content-center align-items-center my-5 py-5">
                        <div className="my-3">
                            Procesando tu compra, aguarda unos segundos...
                        </div>
                        <Spinner animation="border" variant="primary" />
                    </div>
                    :
                    <div className="container d-flex flex-column justify-content-center align-items-center pt-4 ">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <div className="h2 text-success">¡Felicidades! </div>
                            <div className="h5 text-primary">El resumen de tu compra es: </div>
                        </div>
                        <table className='table table-bordered align-middle mt-4 mb-3 maxAncho'>
                            <tr>
                                <th>Id de orden</th>
                                <td className="text-muted fw-bold">{ordenCompra.id}</td>
                            </tr>
                            <tr>
                                <th>N° de orden</th>
                                <td className="text-muted fw-bold">{ordenCompra.nro_orden}</td>
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
                                    <th className="text-center">Ref</th>
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
                                        <td>{e.id_interno}</td>
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
