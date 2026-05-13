import request from 'supertest'
import server, {connectDB} from '../server'
import db from '../config/db'

describe('GET / api' , () => {
    it('should send back a json response', async () => {
        const res = await request(server).get('/api')

        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/) // Verificar que el encabezado de tipo de contenido sea JSON
        expect(res.body.message).toBe('desde api') 

        expect(res.status).not.toBe(404) // Verificar que el estado no sea 404
        console.log(res.status)
    })
})

jest.mock('../config/db')

describe('Connect db', () => {
    it('should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValue(new Error('Database connection error'))
        const consoleSpy = jest.spyOn(console, 'log')
        await connectDB()   
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Error al conectar a la base de datos')
        )
    })
})