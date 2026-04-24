<!-- PROYECTO PERN STACK  -->
1. crear archivo  index y server en src
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
    "outDir" : "./dist" =>  ouput donde crea el proyecto 
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
|16. con send podemos enviar datos a la pantalla, tambien json, res.send o res.json
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
39. exportar protucts
40. en la config de db, despues de la coneccion, { models : [ __dirname + '/../models/**/*.ts']} todos los archivos que terminen en ts son considerados modelos 
41. añadir soporte para que funcione los decoradores, en ts config {
    experimentalDecorators: true
    emitDecoratorMetadata : true
}
42. crear carpeta handlers, crear archivo product.ts, son funciones que toman como parametro req y res, asi se puede reemplazar por la funcion en router 
43. importar reques y respones de express, asignarlas a req y res 
44. crear producto en postman, en body crear con su modelo
45. en server  crear server.use(express.json()) para leer datos
46. importar el modelo en handlers product, la funcion tiene que ser async 
47. crear constante de product y instanciar Product(new Product()) y le pasamos el req.body y lo alamcenamos en la base de datos con product.save()
47. mejor manera es Product.create lo guarda directamente en la base de datos
48. en nuestro tsconfig, target : esnext, moduleResolution : nodeNext, module : nodeNext
49. agregar Default true antes de @Column en mi modelo de availability
50. instalar express-validator
51. importamos check y validatorResult, validacion de espacios vacioss y error
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
 52. crear carpeta middleware, crear archivo, y crear funcion para manejar errores callback
 53. asignar reques, response y nextfuncion a los parametros de mi middleware y movemos la logica de error a su middleware
 <!-- 
    resumen de lo hecho 
    creamos el router el rauter maneja las llamadas get, post, put, patch y delete
    dentro del router tenemos la logica de validacion, utilizando la funcion body de express-validator para crear las validaciones
    despues de pasar la validacion, tenemos el middleware de los errores, utilizando la funcion validateResult de express-validator, recuperamos los datos con req como parametro, y con un if si no esta vacio erros, retornamos un status 400 y formateamos errors en forma de array y colocamos next al final para que pase a la siguiente funcion
    una vez que termina el middleware, tenemos la funcion para crear el producto, es una funcion async, utilizamos el modelo y create para crearlo, la creacion tiene que ir dentro de un try catch
  -->

  54. crear funcion getProducts en mi handler, con el modelo utilizamos la funcion findAll eso trae todo lo de la base de datos y respondemos con un json 

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
 65. Creamos funcion para eliminar en el handler, hacemos validacion y agregamos middleware
 66. para eliminar usamos la funcion destroy 
