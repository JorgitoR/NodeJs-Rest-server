const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async(req=request, res=response, next ) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {

        const { uid }= jwt.verify(token, process.env.SECRETORPRIVATEKEY );

        //leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( uid );

        //Validar si el usuario no existe
        if( !usuario ){
            return res.status(401).json({
                msg:'Token no válido - usuario no existe en DB'
            })
        }

        //verificar si el uid tiene estado true
        if ( !usuario.estado ){
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        }

        req.usuario = usuario   //en req.usuario almacenamos la informacion del usuario
        next();
        
    } catch (error) {
        console.log(error);
        request.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports = {
    validarJWT
}