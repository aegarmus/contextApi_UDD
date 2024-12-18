import { Route, Routes } from "react-router-dom"
import { HomePage, AboutPage } from "../pages"
import { Navbar } from "../components"
import { CartPage } from "../pages/CartPage"
import { MercadoPagoStatus } from "../pages/MercadoPagoStatus"
import { LoginPage } from "../pages/LoginPage"
import { PrivateRoute } from "./PrivateRoute"


export const AppRouter = () => {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            }
          />
          <Route 
            path="/mercadopago/status"
            element={
                <PrivateRoute>
                    <MercadoPagoStatus />
                </PrivateRoute>
            }
          />
        </Routes>
      </>
    );
}