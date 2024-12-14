import { useContext } from "react"
import { CartContext } from "../../context/Cart/cartContext"
import { formatPriceCLP } from "../../utils/formatPrice";



export const CartItem = ({ product }) => {
    const { _id, nombre, imagen, precio } = product;

    const { removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

    return (
        <div className="cart-item">
            <img className="cart-item__image" src={imagen} alt={nombre} />
            <div className="cart-item__details">
                <h3>{nombre}</h3>
                <p>Precio: {formatPriceCLP(precio)}</p>
                <div className="quantity-control">
                    <button className="button" onClick={() => decreaseQuantity(_id)} disabled={product.quantity <= 1}>-</button>
                    <span>{product.quantity}</span>
                    <button className="button" onClick={() => increaseQuantity(_id)}>+</button>
                </div>
                <p>Subtotal: {formatPriceCLP(precio * product.quantity)}</p>
            </div>
            <button className="button remove-button" onClick={() => removeFromCart(_id)}>Eliminar</button>
        </div>
    )
}