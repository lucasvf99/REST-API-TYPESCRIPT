import request from 'supertest'
import server from '../../server'
describe('POST /api/products', () => {

    it('should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({ }) 
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors') 
        expect(response.body.errors).toHaveLength(4) // Verifica que haya 4 errores de validación

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2) // Verifica que no haya 4 errores de validación
    })


    it('should validate that the price is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Monitor - Testing",
            price: -10
         })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors') 
        expect(response.body.errors).toHaveLength(1) 

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)    
    })

    it('should validate that the price is a number and greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Monitor - Testing",
            price: "hola"
         })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors') 
        expect(response.body.errors).toHaveLength(2) 

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(4)    
    })

    it('should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Mouse - Testing",
            price: 50
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data') // Verifica que la respuesta tenga una propiedad 'data'
        expect(response.body.data).toHaveProperty('id') 

        expect(response.status).not.toBe(404) 
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('errors') 
    })
})  

describe('GET /api/products', () => {
    it('should check if /api/products exsits', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).not.toBe(404)  
    })
    it('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/) // Verifica que el tipo de contenido sea JSON
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)

        expect(response.body).not.toHaveProperty('errors')

    })
})

describe('GET /api/products/:id', () => {
    it('should return 404 response for a non-existing product', async () => {
        const productId = 2000
        const response = await request(server).get(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')

        expect(response.status).not.toBe(200)
        expect(response.body.error).not.toHaveProperty('data')
    })
    it('should check a valid id in url', async () => {
        const productId = 'abc'
        const response = await request(server).get(`/api/products/${productId}`)
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('El id debe ser un número entero')
    })
    it('should get a product by id', async () => {
        const productId = 1
        const response = await request(server).get(`/api/products/${productId}`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

describe('PUT /api/products/:id', () => {
    it('should return 400 response for a non-existing url', async () => {
        const response = await request(server).put(`/api/products/abc`).send({
            name: "monitor - testing",
            price: 300,
            availability: true
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('ID no valido ')
    })
    it('should display validation error messages when updating a product', async () => {
        const response = await request(server).put('/api/products/1').send({})
        expect(response.status).toBe(400) 
        expect(response.body).toHaveProperty('errors') 
        expect(response.body.errors).toBeTruthy()   //si tiene informacion lo da como true
        expect(response.body.errors).toHaveLength(5) 

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data') 
    }) 
    it('should check a valid price when updating a product', async () => {
        const response = await request(server).put('/api/products/1').send({
            name: "Monitor - Testing",
            price: -10,
            availability: true
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('El precio no es valido') 
        expect(response.body.errors).toBeTruthy()   //si tiene informacion lo da como true
        expect(response.body.errors).toHaveLength(1) 

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data') 
    })
    it('should check a empty name when updating a product', async () => {
        const response = await request(server).put('/api/products/1').send({
            name: "",
            price: 300,
            availability: true 
        })
        expect(response.status).toBe(400)
        expect(response.body.errors[0].msg).toBe('El nombre del producto es obligatorio')
        expect(response.body.errors).toHaveLength(1) 
        expect(response.body.errors).toBeTruthy()   //si tiene informacion lo da como true
        expect(response.body.errors).toHaveLength(1) 

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data') 

    })
    it('should check a invalid availability when updating a product', async () => {
        const response = await request(server).put('/api/products/1').send({
            name: "monitor - testing",
            price: 300,
            availability: "hola"
        })
        expect(response.status).toBe(400)
        expect(response.body.errors[0].msg).toBe('El availability debe ser un valor booleano')
        expect(response.body.errors).toHaveLength(1) 
        expect(response.body.errors).toBeTruthy()   //si tiene informacion lo da como true
        expect(response.body.errors).toHaveLength(1) 

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data') 

    }) 
    it('should check if a product exist', async () => {
        const productId = 2000
        const response = await request(server).put(`/api/products/${productId}`)
                            .send({
                                    name: "monitor - testing",
                                    price: 300,
                                    availability: true
                            })
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data') 

    }) 
    it('should update a new product', async () => {
        const response = await request(server).put('/api/products/1').send({
            name: "monitor - testing",
            price: 300,
            availability: true
        })
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors') 

    }) 
})

describe('PATCH /api/products/:id', () => {
    it('should check if a product exist', async () => {
        const productId = 2000
        const response = await request(server).patch(`/api/products/${productId}`)
                            .send({
                                    name: "monitor - testing",
                                    price: 300,
                                    availability: true
                            })
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data') 

    }) 
    it('should response a 200 status code when updating availability', async () => {
        const response = await  request(server).patch('/api/products/1').send({
            name: "monitor - testing",
            price: 300,
            availability: false
        })
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body).not.toHaveProperty('errors')
        expect(response.body.status).not.toBe(404)
    })
})

describe('DELETE /api/products/:id', () => {
    it('should return 400 for a non-existing url ', async  () => {
        const response = await request(server).put('/api/products/hola')
                            .send({
                                    name: "monitor - testing",
                                    price: 300,
                                    availability: true
                            })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no valido ')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data') 
    })
    it('should return 404 for a non-existing product ', async  () => {
        const product = 20000
        const response = await request(server).delete(`/api/products/${product}`)
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data') 

    })
    it('should delete a product', async () => {
        const response = await request(server).delete('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body.data).toBe('Producto eliminado correctamente')

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('error')
    })
})



