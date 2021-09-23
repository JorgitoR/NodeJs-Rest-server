const { Router } = require('express');
const { check } = require('express-validator');

const { 
    crearCategoria, 
    obtenerCategorias, 
    obtenerCategoriaById,
    actualizarCategoria,
    BorrarCategoria

} = require('../controllers/categorias');

const {
    validarCampos,
    validarJWT,
    esAdminRole
    
} = require('../middlewares/index')

const router = Router()

// /api/categorias

//Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

//Obtener una categoria por id - publico
router.get('/:id', [

    check('id', 'No es un id de mongo Válido').isMongoId(),
    validarCampos

], obtenerCategoriaById);

//Crear categoria - privado - cualquier persona con un token valido
router.post('/', [

    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos

],  crearCategoria);

//Actualizar - privado - cualquiera con un token valido
router.put('/:id', [

    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    //check('id').custom( existeCategoriaById )
    validarCampos

], actualizarCategoria)

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo Válido').isMongoId(),
    validarCampos

], BorrarCategoria);  //path, middleware, function



module.exports = router;
