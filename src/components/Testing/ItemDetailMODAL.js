import { Modal } from "react-bootstrap";
import ItemCount from "../Item/ItemCount";

const ItemDetail = ({ itemDetail }) => {
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>{itemDetail.title + " " + itemDetail.marca.toUpperCase()}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex">
                <img src={itemDetail.pictureUrl} width="60%" alt="" />
                <div>
                    <button type="button" className="btn btn-warning" disabled data-bs-toggle="button">
                        Stock disponible: {itemDetail.stock}
                    </button>
                    <h4>{"Precio: " + itemDetail.price + "$"}</h4>
                    {/* Agrego ItemCount con datos de Stock traídos por props */}
                    <ItemCount stock={itemDetail.stock} initial={1} />

                </div>
            </Modal.Body>
        </>
    );
};
export default ItemDetail;