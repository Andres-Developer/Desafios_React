import React from 'react';
import { useEffect } from 'react';
import { consultarDatabase } from './../../config/firebaseConfig';

const TestObtenerIdFirebase = () => {

    useEffect(() => {
        const consultarBD = async () => {
            const listaProductos = await consultarDatabase('productos');
            console.log("lista Productos: ", listaProductos);
        };

        consultarBD();
    }, []);

    return (
        <div>
            ID firebase
        </div>
    );
};

export default TestObtenerIdFirebase;
