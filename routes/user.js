//Rutas relacionadas a los usuarios.
const { Router} = require('express');
const { usuarioGet } = require('../controllers/usuarios')
const bcryptjs = require('bcryptjs')
const { check, validationResult } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, existeUsuarioPorId } = require('../helpers/db-validators')
const Usuario = require('../models/usuario');
const { model } = require('mongoose');
const { countDocuments } = require('../models/usuario');

const router = Router();


router.get('/', usuarioGet);

router.get('/get', (req, res) =>{

    const body = req.body;

    res.json({
        body
    })

});

router.put('/:id', [

    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos

], async(req, res) => {

    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    //TODO validar contra basede datos
    if( password ){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );

    }

    const usuario = await Usuario.findByIdAndUpdate(_id, resto)

    res.json({
        msg:'put API',
        id,
        usuario
    }); 
});

router.post('/', [
    
    check('correo', 'El correo no es valido').isEmail(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de mas de 6 letras').isLength( { min:6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),

    check('role').custom(esRoleValido),

    validarCampos ], async(req, res) => {

    
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json(errors)
    }


    //const { nombre, edad } = req.body;
    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario({nombre, correo, password, role}); //estamos creando una nueva instancia de usuarios

    // Verificar si el correo existe
    const emailExiste = await Usuario.findOne({ correo });
    if( emailExiste ){
        return res.status(400).json({
            msg: 'Ese correo ya está registrado'
        });
    }

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt )


    // Guradar en BD
    await usuario.save();

    res.json({
        msg:'post API',
        usuario

    }); 
});

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
    
], async(req, res) => {

    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( _id, { estado: false } );


    res.json(usuario); 


});

router.patch('/', (req, res) => {
    res.json({
        msg:'delete API'
    }); 
});

module.exports = router;

