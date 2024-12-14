import { useContext } from "react"
import { CartContext } from "../../context/Cart/cartContext"
import { formatPriceCLP } from "../../utils/formatPrice";

export const ProductItem = ({ product }) => {
    const { nombre, imagen, precio, description } = product; 

    const { addToCart } = useContext(CartContext)



    return (
      <div className="product-item">
        <div className="product-item__header">
          <img className="product-item__image" src={imagen} alt={nombre} />
          <h2>{nombre}</h2>
        </div>

        <div className="product-item__body">
          <p>Precio: {formatPriceCLP(precio)}</p>
          <p>{description}</p>
          <button onClick={() => addToCart(product)}>Agregar al Carrito</button>
        </div>
      </div>
    );
}