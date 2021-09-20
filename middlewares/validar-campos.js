//un middlewares no es mas que una funcion, como es una funcion recive un tercer elemento que es next,
//next es lo que tengo que llamar si la funcion pasa.


const { check, validationResult } = require('express-validator');

const validarCampos = ( req, res, next ) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json(errors)
    }

    next(); // si todo funciona llega hasta aqui, si no hay mas middlewares llega al controlador.

}

module.exports = {
    validarCampos
}