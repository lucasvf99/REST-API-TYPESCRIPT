import {exit} from 'node:process'
import db from '../config/db'

const clearDb = async () => {
    try {
        await db.sync({force: true}) // Elimina todas las tablas y las vuelve a crear
        console.log("Base de datos limpiada y sincronizada correctamente")
        exit(0)
        
    } catch (error) {
        console.log(error)
        exit(1) // Salir con código de error
    }
}

if (process.argv.includes('--clear')) {
    clearDb()
}

//console.log(process.argv) // process.argv es un array que contiene los argumentos de la línea de comandos. El primer elemento es la ruta del ejecutable de Node.js, el segundo elemento es la ruta del archivo que se está ejecutando, y los siguientes elementos son los argumentos adicionales.