import React from 'react';
import { consultarDocumentoDatabase, guardarDatabase, fechaFirebase, consultarDatabase, getFilterCollection } from '../../config/firebaseConfig';

const TestGeneraNroOrden = () => {

    let generaNumeroOrden = async () => {
        let dbConsultada = await consultarDatabase("ordenes_compra");
        if (dbConsultada.length === 0) {
            return 1;
        } else {
            //--Obtiene una lista ordenada descendentemente por "nro_orden" (>1)
            let datosOrdenados = await getFilterCollection("ordenes_compra", "nro_orden", ">", 1, 1, "desc");

            //--extrae el primer elemento de la lista ordenada
            let primerElementoLista = datosOrdenados[0];

            //--Obtiene el nro_orden del primer elemento:
            let nro_orden_maximo = primerElementoLista.nro_orden;
            //console.log("nro_orden_maximo: ", nro_orden_maximo);

            return nro_orden_maximo + 1;

        }
    };

 

    return (
        <>

        </>
    );
};

export default TestGeneraNroOrden;
