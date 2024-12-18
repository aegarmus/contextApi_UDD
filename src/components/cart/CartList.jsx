import { useContext } from "react"
import { CartContext } from "../../context/Cart/cartContext"
import { CartItem } from "./CartItem"
import { formatPriceCLP } from "../../utils/formatPrice"
import { MercadoPagoButton } from "../Pagos/MercadoPagoButton"



export const CartList = () => {
    const { cart, clearCart } = useContext(CartContext)

    if(!cart || cart.lenght === 0) {
        return (
            <div className="cart-list empty">
                <h2>Tu Carrito esta vacío</h2>
                <p>Por favor Agrega Productos para verlos aquí</p>
            </div>
        )
    }

    const total = cart.reduce((accum, product) => accum + product.precio * product.quantity, 0)

    const handlePaymentSuccess = (details) => {
        console.log('Pago Exitoso', details);
        alert('Pago realzado con éxito, Muchas gracias por tu compra');
        clearCart()
    }

    return (
        <div className="cart-list">
            <h2>Tu Carrito</h2>
            {
                cart.map((product) => (
                    <CartItem product={product} key={product._id} />
                ))
            }

            <div className="cart-total">
                <h3>Total: {formatPriceCLP(total)}</h3>
                <button className="button button-clear" onClick={clearCart}>Vaciar Carrito</button>
            </div>

            <section className="payment-options">
                <MercadoPagoButton cart={cart} total={total} onPaymentSuccess={handlePaymentSuccess} />
            </section>
        </div>
    )

}