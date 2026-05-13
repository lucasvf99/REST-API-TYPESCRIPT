import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'

// Conectar a la base de datos
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.green.bold('Conexión a la base de datos establecida'))
    } catch (error) {
        // console.log(error)
        console.log(colors.red.bold( 'Error al conectar a la base de datos'))
    }
}
connectDB()
//instancia del express
const server = express()

//leer datos del formulario
server.use(express.json())

server.use('/api/products', router)

// supertesting

server.get('/api', (req, res) => {
    res.json({message: 'desde api'}    )
})

export default server