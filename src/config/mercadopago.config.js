import { initMercadoPago } from "@mercadopago/sdk-react";

if(!window.mercadoPagoInitialized) {
    initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, { locale: 'es-CL' });
    window.mercadoPagoInitialized = true;
}