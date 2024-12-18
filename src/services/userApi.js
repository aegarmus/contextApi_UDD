import axios from 'axios';

const API_URL = "http://localhost:3000/api/v1";


export const apiCLient = axios.create({
    baseURL: API_URL,
})

apiCLient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)


export const registerUser = async(userData) => {
    try {
        const { data } = await apiCLient.post('/auth', userData)
        return data //Devuelve el id y token
    } catch (error) {
        throw new Error(`No pudimos registrar al usuario. ${error}`)
    }
}




//JSDocs

/**
 * Esta función recibe unas credenciales como objeto y me retorna un token desde el llamado a la API de autenticación
 * @param {object} credentials - Objeto que contiene email y contraseña como strings
 * @returns {string} - Retorna el Token
 */


export const authenticate = async(credentials) => {
    try {
        const { data } = await apiCLient.post('/auth/login', credentials)
        return data //Vuelve solo el token y datos del usuario
    } catch (error) {
        throw new Error(`Credenciales Invalidas. ${error}`);
    }
}