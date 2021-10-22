import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ItemDetailContainer from './ItemDetailContainer.js_';

const Item = ({ id, title, pictureUrl, stock }) => {
    return (
        //Renderizo una Card de Bootstrap        
        <Card style={{ width: '10rem' }}>
            {/* {console.log(pictureUrl)} */}
            <Card.Img variant="top" src={`./../`+pictureUrl} width="10px" />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    Id del Item: {id}
                    <br />
                    Stock del producto: {stock}
                </Card.Text>
                {/* Llamando al componente encargado de cargar los detalles del Item */}
                {/* <ItemDetailContainer id={id} /> */}
                <Link to={`/item/${id}`} className="btn btn-success">
                    detalle
                </Link>
            </Card.Body>
        </Card>
    );
};



export default Item;
