import React, { useState } from 'react';

/*Componente que muestra la hora del último click*/

const CuentaClick = ({ cantidad }) => {
    const [click, setClick] = useState(0);
    /* MOSTRAR HORA (método 2) */
    let time = new Date();
    let hora2 = time.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    });
    return (
        <>
            <button onClick={() => setClick(click + 1)}>hola</button>
            <h1>{click}</h1>
            <h5>{`La hora del último click fue: ${click === 0 ? 'Sin  Definir' : hora2}`}</h5>
        </>
    );
};

export default CuentaClick;
