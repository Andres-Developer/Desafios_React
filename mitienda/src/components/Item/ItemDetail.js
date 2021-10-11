import ItemCount from "./ItemCount";

const ItemDetail = ({ itemDetail }) => {
    /* console.log(itemDetail); */
    return (
        <>
            <h3>{itemDetail.title + " " + itemDetail.marca.toUpperCase()}</h3>
            <div className="d-flex align-items-center">
                <img src={`./../`+itemDetail.pictureUrl} width="30%" alt="" />           
                <div>
                    <button type="button" className="btn btn-warning" disabled data-bs-toggle="button">
                        Stock disponible: {itemDetail.stock}
                    </button>
                    <h4>{"Precio: " + itemDetail.price + "$"}</h4>
                    {/* Agrego ItemCount con datos de Stock traídos por props */}
                    <ItemCount stock={itemDetail.stock} initial={1} />

                </div>
            </div>
        </>
    );
};
export default ItemDetail;