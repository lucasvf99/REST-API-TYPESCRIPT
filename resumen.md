<!-- PROYECTO PERN STACK  -->

1. crear archivo index y server en src
2. podemos ejecutar proyecto, en terminal node src/index.ts o el archivo que quieras
3. en package.json deespues de license, type: module

<!-- añadir dependencias de desarrollo  -->

4. npm i -D typeScript ts-node
5. en scripts de package.json => dev : npx ts-node src/index.ts
6. instalar dependencia nodemon => npm i -D nodemon (desarrollo)
7. en package.json en dev => "dev" : " nodemon --exec npx ts-node src/index.ts"

<!-- tsc compilador de ts  -->

8. compilar archivos de ts a js, npx tsc src/index.ts
9. crear archivo tsconfig.json, ponemos las reglas para que compile, siempre en objeto

10. "compilerOptions" {
    "outDir" : "./dist" => ouput donde crea el proyecto
    "rootDir": "./src" => directorio printipal
    "lib": ["ESNext", "DOM"], => modelo de js
    "strict": false => si esta en true no permite ningun any
    "sourceMap" : true => crea mapas (averiguar que es)
    "esModuleInterop": true, => permite poder importar j es
    "declaration": true => archivos de definicion
    },
    "include": ["src/**/*.ts"] => incluye todos los archivos ts

11. instalar express y -D @types/express
12. importar express en server, crear constante server y llamar funcion de express
13. importar en index.ts
14. crear funcion server.listen(puerto, () =>{})
15. crear en server, server.get('/', ( req, res)=>{}) eso es routing
<!--
request es lo que envias => req
response es respuesta => res
-->
16. con send podemos enviar datos a la pantalla, tambien json, res.send o res.json
17. crear el archivo router para cada request
18. importar instancia de router, Router from express, crear constante y llamar funcion Router
19. importar router en index, para agregarlo usamos use, server.use('/', router)

<!-- que se un orm?
    simplifica la comunicacion entre una base de datos y el codigo de tu aplicacion
-->
<!--
    utilizamos render para crear base de datos
        1- new  posrgres sql
        2- nombre
        3-data base opcional
        4- region mas cerca
        5- elegir version
 -->
 <!-- 
    instalamos sequelize 
    instalamos sequelize para pg (postgres)
  -->

20. creamos carpeta config, conecciones
21. creamos archivo db.ts
22. importamos Sequelise, creamos constante db = Sequelize()
23. copiar de render externaldatabase url y pegar en la funcion Sequelize, exportar db
24. importar en server db, creamos funcion asincrona, try catch, en try un await db.auntenthicate(), si esta todo bien db.sync()
25. al final de nuestro externaldatabase url agregamos ?sll=true
26. instalar dotenv
27. creamos variable de entorno
28. importamos dotenv en db, y llamamos la funcion dotenv.config()
29. reemplazamos la url por la variable de entorno process.env.DATABASE_URL
30. abrir DBeaver, crear nueva coneccion postgreSQL
    host => desde @ hasta .com, empieza cn dpg
    database => despues de /
    nombre de usuario => despues de //
    constraseña => despues de : hasta @
31. instalamos dependencia colors para ver mensajes en consola
32. importarlo en server y cambiar colores colors.blue()
33. crear constante de PORT si no es process.env.port || 3000
34. instalar dependencia sequelize-typescript
35. cambiar coneccion sequelize en db agregar solo -typescript
36. crear carpeta models, crear archivo Product.model.ts

<!-- que es un decorador ?
    sintaxis que inicia con @, llaman una funcion dentro de una funcion o otro codigo
 -->

37. importar decoradores, Table, Column, Model, DataType, Default
38. crear tabla y modelo, modelo en una clase
39. tabla aparte, dentro de los modelos van los Column({}), dentro de column definimos los type: DataType
40. exportar protucts
41. en la config de db, despues de la coneccion, { models : [ __dirname + '/../models/**/*.ts']} todos los archivos que terminen en ts son considerados modelos
42. añadir soporte para que funcione los decoradores, en ts config {
    experimentalDecorators: true
    emitDecoratorMetadata : true
    }
43. crear carpeta handlers, crear archivo product.ts, son funciones que toman como parametro req y res, asi se puede reemplazar por la funcion en router
44. importar reques y respones de express, asignarlas a req y res
45. crear producto en postman, en body crear con su modelo
46. en server crear server.use(express.json()) para leer datos
47. importar el modelo en handlers product, la funcion tiene que ser async
48. crear constante de product y instanciar Product(new Product()) y le pasamos el req.body y lo alamcenamos en la base de datos con product.save()
49. mejor manera es Product.create lo guarda directamente en la base de datos
50. en nuestro tsconfig, target : esnext, moduleResolution : nodeNext, module : nodeNext
51. agregar Default true antes de @Column en mi modelo de availability
52. instalar express-validator
53. importamos check y validatorResult, validacion de espacios vacioss y error
    await check(campo a verificar).notEmpty().withMessage(mensaje a usuario).run(req)
    let errors = validationResult(req)

                if(!errors.isEmpty()){
                    return res.status(400).json({ errors: errors.array() })
                }

    <!-- con .custom podemos definir nosotros la configuracion necesaria, con un callback -->
    <!-- mover validacion hacia el raouter
        check para funciones asincronas
        body para router
     -->
    <!--
        middleware
        => software intermedio aue se utiliza para procesar las solicitudes http
        siempre para trabajar con middleware hay que tener req y res
     -->

54. crear carpeta middleware, crear archivo, y crear funcion para manejar errores callback
55. asignar reques, response y nextfuncion a los parametros de mi middleware y movemos la logica de error a su middleware
<!--
   resumen de lo hecho
   creamos el router el rauter maneja las llamadas get, post, put, patch y delete
   dentro del router tenemos la logica de validacion, utilizando la funcion body de express-validator para crear las validaciones
   despues de pasar la validacion, tenemos el middleware de los errores, utilizando la funcion validateResult de express-validator, recuperamos los datos con req como parametro, y con un if si no esta vacio erros, retornamos un status 400 y formateamos errors en forma de array y colocamos next al final para que pase a la siguiente funcion
   una vez que termina el middleware, tenemos la funcion para crear el producto, es una funcion async, utilizamos el modelo y create para crearlo, la creacion tiene que ir dentro de un try catch
 -->

56. crear funcion getProducts en mi handler, con el modelo utilizamos la funcion findAll eso trae todo lo de la base de datos y respondemos con un json

  <!-- se puede ordenar de forma acsendente en precio, id, lo que quieras usando esta config
    findAll({
        order: [
            ['price', 'ASC'] O DESC
        ]
    })
   -->

55. agregar declare antes de los nombres del modelo, no aparecen los warning en consola
56. para traer los datos que uno quiere, dentro de findAll, agregamos atributes:{exclude: ['elemento a excluir']}
57. crear funcion para traer producto por id, obtenemos el id por params req.params.id, con Product.findByPk(id) filtramos por id
58. si no hay producto con un if, retornamos un status 404
59. validar parametro para que sea un entero, importar param de express-validator
param('id).inInt().withMessage()
<!-- si algo falla con la validacion lo pasa al middleware -->

60. crear funcion para actualizar producto en handlers
<!-- tenemos que verificar si existe o no el producto, traemos logica del endpoint del id -->
61. en postman crear el body para actualizar, actualizamos con product.update(req.body) ahi le pasamos los nuevos datos, pero tenemos que actualizarlo con product.save()

<!-- el comportamiento de update si solo le pasamos un valor a cambiar nos protege y solo cambia ese valor, si no lo tenemos cambia todo producto en si, si solo le pasamos name, dejaria solo el name dentro del producto lo demas se perderia -->

62. ponemos validacion al router de put copiamos la de post, pero agregamos availability si es booleano o no

63. creamos funcion para patch en handlers, llamamos funcion en router
<!-- Que diferencia hay entre put y patch ?
    patch puede cambiar un solo valor si asi se lo pasa, a diferencia de put que si solo se le pasa un valor, reemplaza todo por ese valor solo
    PUT => Actualiza
    PATCH => Modifica
 -->
64. Creamos funcion para eliminar en el handler, hacemos validacion y agregamos middleware
65. para eliminar usamos la funcion destroy

 <!-- TESTING  -->

1. Descargar superter en desarrollo con @types/supertest para tener el tipado de typeScript, jest @types/jest ts-jest
2. en consola npx ts-jest config: init, crea el archivo jest.config.js
3. crear carpeta **tests**, crear archivo server.test.ts
4. agregar en ts config type: [node, jest]
5. describe esta de forma global, sirve para agrupar serie de pruebas, toma 2 parametros nombre de prueba y segundo un callback
6. con test o it, primero lo que debe hacer la prueba, segundo parametro un callback
7. con expect y toBe, expect seria la suma y toBe el resultado
// test
// describe('Nuestro primer test', () => {
// it('debería sumar dos números correctamente', () => {
// expect(1 + 2).toBe(3)
// })
// it('la suma no deberia ser 3', () => {
// expect(1 + 1).not.toBe(3)
// })
// })
<!-- como realizamos el testing? -->
8. en package.json en scripts creamos el llamado a test : "jest"
9. con npm test corre la prueba
10. para testear algo que no esperas se agrega el not antes del toBe expect(1+1).not.toBe(3), aca seria que uno mas uno no sea 3

<!-- utilizar supertest para endpoint  -->

1. en server.ts despues de router , crear un endpoint get basico que la respuesta sea un json que devuelva un msj
2. importar reques de supertest en server.test.ts, y server
3. usamos la funcion describe, con it declaramos que tiene que hacer y su callback async
4. creamos un const res = await request(sever).get esto trae la respuesta de server y con console.log mostramos los datos
5. para que funciones los log, debemos ir a config db.ts, agregarle logging: false
6. agreagar en el json, test despues de jest --detectOpenHandles
7. con expect decimos que esperamos un res.status tobe 200
8. podemos escribir los test que no deberian ser, con not.toBe

<!-- probando los habdlers con supertest -->

1. crear en handlers la carpeta **test** y crear archivo .test.ts
2. crear logica de test, con it nombre + callback, luego constante con await y request a server, con un .post(/api).send, send es lo que vas a enviar, osea un objeto de product
3. cunado se crea una producto tiene que ser un status 201, ir al handlers y agregarle el status
4. toHaveProperty es para ver si tiene o no una propiedad, ej, un id, la respuesta si viene en un objeta data
5. podemos testear la validacion antes, podemos pasarle el objeto vacio y escribir la logica

<!-- como limpiar base de datos al hacer pruebas, porq se llena muchas -->

1. crear carpeta en src llamda data y un archivo index
2. importamos exit de node:process y db de config/db
3. creamos una constante clearDb, una arrow function async y un try catch, en el catch poner un console.log y seguido un exit(1), el uno hace referencia que termina pero con errores
4. en try con await db.sync({force: true}) elimina los datos y finalizamos con exit

5. llamar funcion if(process.argv[2] === '--clear' ){
   clearDb()
   }
6. en package en scripts, pretest : "ts-node ./src/data --clear, en vez de db mejor pretest se ejecuta antes del test

<!-- TEST PARA PETICION TIPO GET, GET(ID), Put, Delete-->

1. crear funcion describe(url, callback)
2. palabra reservada it(string, callback) asincrono
3. crear constante con await, request(server).get(url)
4. con expect verificar status y que la respuesta sea json o mas pruebasd
<!--
En postman podemos realizar una peticion y en base en la respuesta crear los test
-->

<!-- METRICAS DE VALIDACION -->

# \*\*CODE COVERAGE

\*\*METRICA UTILIZADA PARA MEDIR LA CANTIDAD DE CODIGO FUENTE QUE HA SIDO EJECUTADO O CUBIERTO POR UN CONJUNTO DE PRUEBAS

1. en package debajo de test, " npm run pretest && test:coverage" : "jest --detectOpenHandles --coverage"
2. con ese comando se ejecuta primero pretest y luego coverage
3. se ejecuta con npm run test:coverage
4. devuelve una tabla con valores
   Lines : lineas de archivos ejecutadas almenos una vez
   Uncovered Line: son las lineas no ejecutadas en los archivos
   Stmts(statemants): codigo inalcanzable, codigo que no se ejecuta, porciones de codigo

# \*\*# <!Forzar errores para los catchs -->

1. en server.test
2. Utilizamos un mock, tecnica para las pruebas, simula comportamiento de ciertos modulos
3. importar en server.test mi base de datos
4. importar instancia de sequelice ( db )
5. escribir funcion de testeo para mi base de datos, fallo t exito
6. crear el mock antes de la funcion, con jest, jest.mock('../config/db') toma como valor un string
7. dentro de la funcion it, jest.spyiOn(db, 'authenticate), crea una funcion simulada, le pasamos la base de datos y le pasamos el metodo que queremos observar
8. agregamos mockRejectedValueOnce para forzar error y le pasamos un error entre parentesis
9. crear constate, luego jest.spyOn(console, 'log')
10. luego mandamos a llamar a la base de datos
11. luego utilizamos el expect, pasamos la constante como parametro, luego utilizamos toHaveBeenCalledWith(especial para mock), dentro de los parentesis, va otro expect.stringContaining('string que deseamos verificar)

<!-- Documentar apis -->

# SWAGGER

1. instalar swagger-jsdoc swagger-ui-express // nos va a permitie tener una url en la cual tengamos nuestra documentacion
2. ahora lo mismo pero con type, -D @type/swagger-jsdoc @type/swagger-ui-express dependencia de desarrolo y tener soporte de typescript
3. en config crear archivo swagger.ts
4. importamos swaggerJSDoc
5. creamos constante options : swaggerJSDoc.Option (para tener autocompletado), es un objeto
6. dentro del objeto
   swaggerDefinition : {
   openapi: '3.0.2',
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
   }
   apis: [ // donde encuentra los endpoint que vas a documentar
   './src/router.ts'
   ]
7. crear constante swaggerSpec, espicificacion de swagger
8. en la constante llamamos swaggerJSDoc y le pasamos options entre parentesis
9. ir a server, crear ruta para documentacion, url '/docs', con server.use
10. importar swaggerUi y swaggerSpec
11. dentro de la ruta usamos swaggerUi.serve / nos da una url, swaggerUi.setup(swaggerStep) / configuracion

# SCHEMA PARA DOCUMENTAR

1. En router, justo despues de definirlo, abrir un comentario largo, poner @swagger(para saber que es sintaxis para swagger)
2. Configuracion =>
<!--
components:
        schemas:
            Product:
                type: object
                properties:
                    id:
                        type: integer //entero
                        description: The product ID
                        example: 2
                    name:
                        type: string // texto
                        description: The product name
                        example: Monitor Curvo 42 pulgadas
 -->

# DOCUMENTAR ENDOPOINTS

# GET

1. Tiene que ser antes del endopint y con comentario de /\*\*/
<!-- 
@swagger
/api/products => url de peticion
    get: => tipo de peticion
        summary: Get a list of products => texto que vemos en la interfaz
        tags: => agrupa donde definimos el tag en swagger.ts
            - Products
        description: Return a list of products
        response: => codigo de respuesta
            200
                description: Succesful response
                content: 
                    application/json: => tipo de respuesta
                        shcema: 
                            type: awway
                            items:
                                $ref: '#/components/schemas/Product' => al hacer la peticion muestra el schema que deberias obtener

-->

# GET :ID

/\*\*

- @swagger
- /api/products/{id}
-   get:
        summary: Get a product by id
        tags:
          - Products
        description: Retunr a product based on its unique id
        parameters:
            in: path => le dice que el parametro tiene que estar en la url
            name: id
            description: The id of the product to retrieve
            requiered: true
            schema:
                type: integer
        - responses:
        404:
        description: Product not found
        400:
        description: Bad Request
        -       200:
        -           description: Succesful response
        -              content:
        -                  application/json:
        -                      schema:
                                    $ref: '#/components/schemas/Product'
  \*/

# POST

/\*\*

- @swagger
- /api/products:
-   post:
    - summary: Create a new Prodcut
    - tags:
    -      - Products
    - description: Retunr a new record in the database
    - requestBody:
        required: true
        content: application/json 
            schema: 
                type: object
                properties:
                    name: 
                        type: string
                        example: 'monitor curvo'
                    price:
                        type: number
                        example: 400
    - responses:
    -      400:
    -             description: Bad request - invalid input data
    -      201:
    -              description: product created succesfully
    \*/

# PUT 
@swagger
api/product/{id}:
    put: 
        summary: updates a product with user input
        tag: 
            -Products
        description: Returns the update prodcut
        parameters:
            in: path => le dice que el parametro tiene que estar en la url
            name: id
            description: The id of the product to retrieve
            requiered: true
            schema:
                type: integer
        requestBody: 
            required: true
            content: application/json 
                schema: 
                    type: object
                    properties:
                        name: 
                            type: string
                            example: 'monitor curvo'
                        price:
                            type: number
                            example: 400
                        availability: 
                            type: boolean
                            example: true
        responses: 
            200:
                description: Succeful response
                content: 
                    application/json:
                        schema: 
                            $ref: '#/components/schemas/Product'
            400:
                description: Bad request invalid id our invalid input data
            404:
                description: Product not found

# CAMBIAR LOGOTIPO DE SWAGGER 
opcional clase 409