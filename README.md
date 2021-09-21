# Temas puntuales
1. Rest server 
2. Express
3. Router
4. Models

# realizar nuestro git
1. crear el archivo .gitignore nos ayudara a ignorar documentos
2. git init
3. git add .
4. git commit -m
5. para recuperar un archivo git checkout -- .
6. para eliminar el archivo env en produccion git rm .env --cached
7. nuevamente realizamos el -> git add . -> git commit -m 

# Para crear un release tag en github
1. git tag
2. git tag -a v1.0.0 -m "Fin seccion 8"
3. git push --tags 


# Temas puntuales de la seccion
1. Definir los alcance de nuestro RESTServer
2. CRUD
3. Encriptacion de contraseñas
4. Validaciones personalizadas
5. Creacion de roles 
6. Conexiones con MLAB
7. Despliegue de bases de datos en la nube
8. Conexion con Robo 3T con base de datos en la nube
9. Configuracion de variables de entorno
10. Borrado de archivos.
    .-> Eliminado fisico de la base de datos.
    .-> Eliminacion por estado en un campo de la coleccion

# Encriptando la contraseña
1. BcryptJS. npm i bcryptjs

# Mongoose orm de node

# Validar campos
1. npm i express-validator

# middlewares
es una funcion que se ejecuta antes de llamar un controlador o seguir con nuestra peticiones


# Produccion
1. .gitignore: excluimos el archivo de node_module & el archivo de variables de entorno .env
2. .example.env el archivo de desarrollo 

# Para ver las variables de entornos en Heroku
1. cmd -> heroku config
2. herouku config:set nombre="jorgito"
3. para crear variables de entorno: heroku config:set nombre="jorgito"
4. para eliminar una variable de entorno: heroku config:unset nombre


# JWT
1. npm i jsonwebtoken
