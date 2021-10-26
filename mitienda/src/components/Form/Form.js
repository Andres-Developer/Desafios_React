import React from 'react';
import { useState } from 'react';
import { guardarDatabase } from './../../config/firebaseConfig';
import { Spinner, Modal, Button } from 'react-bootstrap';

export const Form = () => {
    const [ordenCompra, setOrdenCompra] = useState(null);
    const [loading, setLoading] = useState(false);

    const [nombre, setNombre] = useState(null);
    const [apellido, setApellido] = useState(null);
    const [email, setEmail] = useState(null);
    const [telefono, setTelefono] = useState(null);



    const handleSubmit = async (event) => {
        event.preventDefault();
        const ordenCompra = {
            nombre,
            apellido,
            email,
            telefono,
            productos:[
                {title:"gorra", price:55, stock:90 },
                {title:"pantalon", price:155, stock:10 },
                {title:"camiseta", price:545, stock:3 }
            ]
        };
        // console.log(ordenCompra);
        setLoading(true);
        let ordenGuardada = await guardarDatabase('ordenes_compra', ordenCompra);
        // console.log("orden Guardada: ", ordenGuardada.id);        
        alert(`orden registrada con éxito, id: ${ordenGuardada.id}` );
        setLoading(false);
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
            <div>
                Felicidades, tu orden de compra es: {ordenCompra}
            </div>
    );
};
