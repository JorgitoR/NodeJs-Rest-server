const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagn, mostrarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarArchivo } = require('../middlewares/validar-archivo')

const router = Router();

router.post('/', validarArchivo, cargarArchivo);

// /api/uploads/usuarios/abc234 
// /api/uploads/producto/abc234 
router.put('/:coleccion/:id', [

    validarArchivo,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos

], actualizarImagn);


// http://localhost:8080/api/productos/id
router.get('/:coleccion/:id', [

    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'])),

], mostrarImagen)


module.exports = router;