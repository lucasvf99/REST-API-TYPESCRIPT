import { Router } from "express"
import { deleteProduct, generateProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import { body, param } from "express-validator"
import { handleInputErrors } from "./middleware"

const router = Router()
/**
*@swagger 
*components:
*        schemas: 
*            Product:
*                type: object
*                properties:
*                    id:
*                        type: integer 
*                        description: The product ID
*                        example: 2 
*                    name: 
*                        type: string 
*                        description: The product name
*                        example: Monitor Curvo 42 pulgadas
*                    price:
*                       type: number
*                       description: The product price  
*                    availability: 
*                       type: boolean
*                       description: The product availability
*                       example: true
*/

/**
 * @swagger
 * /api/products:
 *   get:
 *    summary: Get a list of all products
 *    tags:
 *      - Products
 *    description: Retunr a list of products
 *    responses:
 *      200:
 *              description: Succesful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 */
 
router.get("/",  getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *    summary: Get a product by ID
 *    tags:
 *      - Products
 *    description: Retunr a product by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The product ID
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      404:
 *             description: Product not found
 *      400:
 *             description: Invalid ID supplied
 *      200:
 *              description: Succesful response
 *              content:
 *                  application/json:
 *                      schema:
 *                              $ref: '#/components/schemas/Product'
 */
router.get('/:id',  
    param('id').isInt().withMessage("El id debe ser un número entero"), // Validación para asegurarse de que el id sea un número entero
    handleInputErrors,
    getProductById
)

/**
 * @swagger
 * /api/products:
 *   post:
 *    summary: Create a new product
 *    tags:
 *      - Products
 *    description: Returns a new record in the database
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                          description: "Monitor Curvo 42 pulgadas"
 *                      price:
 *                          type: number
 *                          description: 500.99 
 *    responses:
 *      400:
 *              description: Invalid input
 *      200:
 *              description: Succesful response
 *              content:
 *                  application/json:
 *                      schema:
 *                              $ref: '#/components/schemas/Product'
 */
router.post("/", 
    // validacion
    body("name")
                .notEmpty().withMessage("El nombre del producto es obligatorio"),
    body("price")
                .isNumeric().withMessage("El price debe ser un número")
                .notEmpty().withMessage("El price del producto es obligatorio") //
                .custom(value => value > 0).withMessage("El precio no es valido"), // validación personalizada para verificar que el price sea un número positivo
    handleInputErrors,
    generateProduct
)

/**
* @swagger
* /api/products/{id}:
*   patch:
*    summary: Update a product availability by ID
*    tags:
*      - Products
*    description: Return the updated availability of the product
*    parameters:
*      - in: path
*        name: id
*        description: The product ID
*        required: true
*        schema:
*          type: integer
*    requestBody:
*      required: true
*      content:
*          application/json:
*              schema:
*                  type: object
*                  properties:
*                      availability:
*                          type: boolean
*                          example: true
*    responses:
*      400:
*              description: Invalid input our ID supplied
*      404:
*              description: Product not found
*      200:
*             description: Succesful response
*             content:
*                  application/json:
*                      schema:
*                              $ref: '#/components/schemas/Product'
*/

router.patch("/:id",
    param('id').isInt().withMessage("ID no valido"),
    handleInputErrors,
    updateAvailability)

/**
* @swagger
* /api/products/{id}:
*   put:
*    summary: Update a product by ID
*    tags:
*      - Products
*    description: Return the updated product
*    parameters:
*      - in: path
*        name: id
*        description: The product ID
*        required: true
*        schema:
*          type: integer
*    requestBody:
*      required: true
*      content:
*          application/json:
*              schema:
*                  type: object
*                  properties:
*                      name:
*                          type: string
*                          example: "Monitor Curvo 42 pulgadas"
*                      price:
*                          type: number
*                          example: 500.99
*                      availability:
*                          type: boolean
*                          example: true
*    responses:
*      400:
*              description: Invalid input our ID supplied
*      404:
*              description: Product not found
*      200:
*             description: Succesful response
*             content:
*                  application/json:
*                      schema:
*                              $ref: '#/components/schemas/Product'
*/

router.put("/:id",

    param('id').isInt().withMessage("ID no valido "), 
    body("name")
            .notEmpty().withMessage("El nombre del producto es obligatorio"),
    body("price")
            .isNumeric().withMessage("El price debe ser un número")
            .notEmpty().withMessage("El price del producto es obligatorio") //
            .custom(value => value > 0).withMessage("El precio no es valido"), // validación personalizada para verificar que el price sea un número positivo
    body('availability')
            .isBoolean().withMessage("El availability debe ser un valor booleano"),
    handleInputErrors,
    updateProduct
)

/**
* @swagger
* /api/products/{id}:
*   delete:
*    summary: Delete a product by ID
*    tags:
*      - Products
*    description: Return a confirmation message upon successful deletion
*    parameters:
*      - in: path
*        name: id
*        description: The product ID
*        required: true
*        schema:
*          type: integer
*    responses:
*      400:
*              description: Invalid input our ID supplied
*      404:
*              description: Product not found
*      200:
*             description: Succesful response
*             content:
*                  application/json:
*                      schema:
*                          type: string
*                          value: "Product deleted successfully"
*/

router.delete("/:id", 
    param('id').isInt().withMessage("Id no valido"),
    handleInputErrors,
    deleteProduct)

export default router
