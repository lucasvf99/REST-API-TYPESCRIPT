import {Request, Response, NextFunction} from 'express'

import {validationResult} from "express-validator"

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {

    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() }) // Si hay errores de validación, se devuelve una respuesta con el código de estado 400 (Bad Request) y un objeto JSON que contiene un array de errores. Cada error en el array incluye información sobre el campo que falló la validación y el mensaje de error correspondiente.
    }
    next()
}