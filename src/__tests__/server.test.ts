import { connectDB } from '../server'
import db from '../config/db'

jest.mock('../config/db')

// Test para verificar que la función connectDB maneja correctamente los errores de conexión a la base de datos
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