
import { useState } from 'react';
import { apiCLient } from '../../services/userApi';
import { Wallet } from '@mercadopago/sdk-react';

export const MercadoPagoButton = ({ cart, total, onPaymentSuccess}) => {
    const [ preferenceId, setPreferenceId ] = useState(null);
    const [ loading, setLoading ] = useState(false)

    const handleGeneratePreference = async() => {
        try {
            const { data } = await apiCLient.post("/create_preference", { cart, total });
            setPreferenceId(data.id)
        } catch (error) {
            console.error('Error al generar las preferencias de Pago', error.reponse?.data || error)
        } finally {
            setLoading(true)
        }
    }

    return (
        <>
            <button
                onClick={handleGeneratePreference}
                className="button button-pay"
                disabled={loading}
            >
                {loading ? 'Cargando pasarela de pago...' : "Opciones de Mercado de Pago"}
            </button>

            {
                preferenceId && (
                    <Wallet
                        initialization={{ preferenceId }}
                        onReady={() => console.log("Wallet Ready")}
                        onError={(error) => console.error('Error en Wallet', error)}
                        onPayment={(details) => onPaymentSuccess(details)}
                    />
                )
            }
        </>
    )
}