const { response, request, json } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/googlee-verify');

const login =  async(req, res = response) => {

    const { correo, password } = req.body;

    try {

        //verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if( !usuario ){
            return res.status(400).json({
                msg:'Usuario / password no son correctos - correo'
            });
        }

        //verificar si el usuario esta activo
        if( !usuario.estado ){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - estado: false'
            });
        }

        //verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password);
        if( !validPassword){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - password'
            });
        }

        //generar el JWT
        const token = await generarJWT( usuario.id )

        res.json({

            usuario,
            token
    
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}


const google = async(req, res=response) => {

    const { id_token } = req.body;

    try {

        //const googleUser = await googleVerify( id_token );
        //console.log(googleUser)

        const { correo, nombre, img } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ correo });

        if ( !usuario ){
            //si no existe el usuario lo creamos
            const data = {
                nombre,
                correo,
                password: ':P', //por defecto la ponemos, ya que en el models/usuario es requerido
                img,
                google: true 
            };

            //Guardamos en DB
            usuario = new Usuario( data );
            await usuario.save();
        }

        // si el usuario en DB estado=false
        if( !usuario.estado ){
            return res.status(401).json({
                msg:'Hable con el administrador'
            });
        }


        //generar JWT
        const token = await generarJWT( usuario.id );

    } catch (error) {
        json.status(400).json({
            usuario,
            token
        })
    }

    res.json({
        msg:'Todo bien',
        id_token
    })
};


module.exports = {
    login,
    google
}