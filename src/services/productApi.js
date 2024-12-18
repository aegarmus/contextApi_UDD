import axios from 'axios';

const URL_BASE = "http://localhost:4000/api/v1";

export const apiProductsClients = axios.create({
    baseURL: URL_BASE
})


export const getAllProducts = async () => {
    try {
        const { data } = await apiProductsClients.get('/product')
        return data
    } catch (error) {
        console.error(error)
    }
}


/* const objeto = {
    nombre: 'Juanito',
    apellido: 'Adasme',
    edad: 31,
    ocupacion: 'Dev'

}



const nombreObejto = objeto.nombre
const apellidoObjeto = objeto.apellido
const edadObjeto = objeto.edad
const ocupacion = objeto.ocupacion


//Destructuración o Destructuring
const { apellido } = objeto */