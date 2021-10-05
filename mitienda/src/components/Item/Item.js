import React from 'react';
import { Card, Button } from 'react-bootstrap';
import foto from './../../img/accesorio_casual_billetera_tommy-hilfiger_hombre_negro_cuero.jpg';
import ItemDetailContainer from './ItemDetailContainer';

const Item = ({ id, title, pictureUrl, stock }) => {
    return (
        //Renderizo una Card de Bootstrap
        <Card style={{ width: '10rem' }}>
            <Card.Img variant="top" src={pictureUrl} width="10px" />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    Id del Item: {id}
                    <br />
                    Stock del producto: {stock}                    
                </Card.Text>
                {/* Llamando al componente encargado de cargar los detalles del Item */}
                <ItemDetailContainer id={id}/>
            </Card.Body>
        </Card>
    );
};



export default Item;
