import { useCallback, useEffect, useReducer } from "react"
import { authenticate, registerUser } from "../../services/userApi";
import { AuthContext } from "./userContext";
import { AuthReducer } from "./userReducer";
import {
  GoogleAuthProvider,
  signInWithPopup,
/*   onAuthStateChanged, */
  signOut,
} from "firebase/auth";
import { auth } from "../../config/firebase.config";

const initialState = {
    user: null,
    token: null
}

export const AuthProvider = ({ children }) => {

    const [ state, dispatch ] = useReducer(AuthReducer, initialState);

    // Memorizar la función fetchUser para evitar recrearla en cada render
    const fetchUser = useCallback(() => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        if(token && user) {
            dispatch({
                type: 'LOGIN_USER',
                payload: { user, token }
            });
        }
    }, []);

    // Ejecutar fetchUser solo una vez al montar el componente
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);



    const register = async(userData) => {
        try {
            const data = await registerUser(userData);
            const { token, user } = data; // Asegúrate de que tu backend retorna 'user' y 'token'

            if (token && user) {
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));

                dispatch({
                    type: "REGISTER_USER",
                    payload: { user, token },
              });
            } else {
              throw new Error("Token o usuario no recibido");
            }
        } catch (error) {
            throw new Error(`Error al registrar el usuario: ERROR: ${error}`)
        }
    }

    const loginWithGoogle = async() => {
        const provider = new GoogleAuthProvider()
        try {
            await signInWithPopup(auth, provider)
        } catch (error) {
            console.error("Error al loguear con Google", error)
        }
    }


    const login = async(credentials) => {
        try {
            const data = await authenticate(credentials)
            const { token, user } = data;

            if (token && user) {
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));

                dispatch({
                    type: "LOGIN_USER",
                    payload: { user, token },
                });
            } else {
                throw new Error("Token no recibido");
            }
        } catch (error) {
             throw new Error(`Error al autenticar el usuario: ERROR: ${error}`);
        }
    }

    const logout = async() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        await signOut(auth)

        dispatch({ type: 'LOGOUT_USER' })
    }


    return (
        <AuthContext.Provider 
            value={{
                user: state.user,
                token: state.token,
                register,
                login,
                logout,
                loginWithGoogle
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}