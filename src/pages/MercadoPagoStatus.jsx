import { useLocation, Link } from "react-router-dom"


export const MercadoPagoStatus = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');

    const message = {
        approved: {
            title: "💸 Pago Exitoso 💸",
            description: 'Felicidades! Tu pago ha sido aprobado. Muchas gracias por comprar con nosotros'
        },
        failure: {
            title: "🚫 Pago Fallido 🚫,",
            description: 'Lo sentimos :c El pago no se pudo procesar. Por favor intentalo más tarde c:'
        },
        pending: {
            title: '⏳ Pago Pendiente ⏳',
            description: 'El pago está pendiente de confirmación. Te notificaremos cuando sea procesado. Gracias por tu paciencia'
        },
        default: {
            title: '🫎 Estado Desconocido 🫎',
            description: 'No pudimos determinar el estado de tu pago. Por favor contacta con el proveedor o con soporte'
        }
    }

    const { title, description } = message[status] || message.default;

    return (
        <div className="status-container">
            <h2>{title}</h2>
            <p>{description}</p>
            <Link to={'/'} >Volver a la tienda</Link>

        </div>
    )
}