const express = require('express');
const { dbConnection } = require('../database/config');
const cors = require('cors');

const fileUpload = require('express-fileupload');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;


        this.buscarPATH = '/api/buscar';
        this.usuarioPATH = '/api/usuarios';
        this.authPath = '/api/auth';
        this.productoPATH = '/api/producto'

        this.path = {
            auth: '/api/usuarios',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            usuarios: '/api/auth',
            upload: '/api/uploads',
        }

        // Conectar  a dtb
        this.conectarDb();

        // Middleware. son funciones que add funcionalidad, se ejcuta cuando levantemos nuestro servidor
        this.middlewares();

        // Rutas de aplicacion
        this.routes();
    }

    async conectarDb(){
        await  dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use ( cors())

        // Lectura y parses del body
        this.app.use( express.json() ); //para resivir las peticiones request

        // Directorio publico
        this.app.use( express.static('public') );

        //FileUpload - Carga de archivo
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {

        this.app.use( this.path.upload, require('../routes/uploads'));
        this.app.use( this.path.buscar, require('../routes/buscar'));
        this.app.use( this.productoPATH, require('../routes/productos'));
        this.app.use( this.authPath, require('../routes/auth'));
        this.app.use(this.usuarioPATH, require('../routes/user'));
        this.app.use( this.path.categorias, require('../routes/categorias'));

    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }

}

module.exports = Server;