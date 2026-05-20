import {exit} from 'node:process'
import db from '../config/db'

// Función para limpiar la base de datos
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

