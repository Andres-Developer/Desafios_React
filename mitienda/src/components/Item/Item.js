import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Item = ({ id, title, pictureUrl }) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={pictureUrl} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    Id del Item: {id}
                    {/* <img src={pictureUrl} alt="" /> */}
                </Card.Text>
                <Button variant="primary">Comprar</Button>
            </Card.Body>
        </Card>
    );
};

export default Item;
