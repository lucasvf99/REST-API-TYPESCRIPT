import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerOptions } from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        tags: [
            {
                name: 'products',
                description: 'API operations related to products'
            }
        ],
        info: {
                title: 'REST API Node.js / Express / TypeScript',
                version: '1.0.0',
                description: "Api Docs for Products"
        },
    },
    apis: ['./src/router.ts'] // Ruta al archivo donde se encuentran las anotaciones de Swagger
}

const swaggerSpec = swaggerJSDoc(options);


export default swaggerSpec;