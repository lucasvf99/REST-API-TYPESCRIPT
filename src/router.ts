import { Router } from "express"
import { deleteProduct, generateProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import { body, param } from "express-validator"
import { handleInputErrors } from "./middleware"

const router = Router()
 
router.get("/",  getProducts)

router.get('/:id',  
    param('id').isInt().withMessage("El id debe ser un número entero"), // Validación para asegurarse de que el id sea un número entero
    handleInputErrors,
    getProductById
)

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


router.patch("/:id",
    param('id').isInt().withMessage("El id debe ser un número entero"),
    body("name")
            .notEmpty().withMessage("El nombre del producto es obligatorio"),
    body("price")
            .isNumeric().withMessage("El price debe ser un número")
            .notEmpty().withMessage("El price del producto es obligatorio") //
            .custom(value => value > 0).withMessage("El precio no es valido"), // validación personalizada para verificar que el price sea un número positivo
    body('availability')
            .isBoolean().withMessage("El availability debe ser un valor booleano"),
    handleInputErrors,
    updateAvailability)

router.put("/:id",

    param('id').isInt().withMessage("El id debe ser un número entero"),
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

router.delete("/:id", 
    param('id').isInt().withMessage("El id debe ser un número entero"),
    handleInputErrors,
    deleteProduct)

export default router
