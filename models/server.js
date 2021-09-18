const express = require('express');
const cors = require('cors');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPATH = '/api/usuarios/';

        // Middleware. son funciones que add funcionalidad, se ejcuta cuando levantemos nuestro servidor
        this.middlewares();

        // Rutas de aplicacion
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use ( cors())

        // Lectura y parses del body
        this.app.use( express.json() ); //para resivir las peticiones request

        // Directorio publico
        this.app.use( express.static('public') );
    }

    routes() {

        this.app.use(this.usuarioPATH, require('../routes/user'));

        /*
        this.app.get('/api', (req, res) => {
            res.json({
                msg:'get API'
            }); 
        });
        */
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }

}

module.exports = Server;