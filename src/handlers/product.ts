import { Request, Response } from "express"
import Products from "../models/Product.model"

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Products.findAll({
            order: [
                ['id', 'DESC']
            ],

        })
        res.json({data: products})
    } catch (error) {
        console.log(error)
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const product = await Products.findByPk(`${id}`)
        if(!product){
            return res.status(404).json({error: "Producto no encontrado"})    
        }

        res.json({data: product})
    } catch (error) {
        console.log(error)
    }
}

export const generateProduct = async (req: Request, res: Response) => {

    try {
        const product = await Products.create(req.body)
        res.json({ data: product })
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const product = await Products.findByPk(`${id}`)
        if(!product){
            return res.status(404).json({error: "Producto no encontrado"})    
        }
        
        // Actualizar 
        await product.update(req.body) // lo actualiza
        await product.save() // lo guarda en la base de datos

        res.json({data: product})
    } catch (error) {
        console.log(error)
    }
}

export const updateAvailability = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const product = await Products.findByPk(`${id}`)
        if(!product){
            return res.status(404).json({error: "Producto no encontrado"})    
        }
        
        // Actualizar 
        await product.update(req.body) // lo actualiza
        await product.save() // lo guarda en la base de datos

        res.json({data: product})
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async (req : Request, res: Response) => { 
    try {
        const id = req.params.id
        const product = await Products.findByPk(`${id}`)
        if(!product){
            return res.status(404).json({error: "Producto no encontrado"})    
        }
        
        await product.destroy() // lo elimina de la base de datos
        res.json({data: "Producto eliminado correctamente"})

    } catch (error) {
        console.log(error)
    }
}