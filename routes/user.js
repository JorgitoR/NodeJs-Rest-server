//Rutas relacionadas a los usuarios.
const { Router} = require('express');
const { usuarioGet } = require('../controllers/usuarios')

const router = Router();


router.get('/', usuarioGet);

router.put('/:id', (req, res) => {

    const { id } = req.params;


    res.json({
        msg:'put API',
        id
    }); 
});

router.post('/', (req, res) => {

    const { nombre, edad } = req.body;


    res.json({
        msg:'post API',
        nombre,
        edad

    }); 
});

router.delete('/', (req, res) => {
    res.json({
        msg:'delete API'
    }); 
});

router.patch('/', (req, res) => {
    res.json({
        msg:'delete API'
    }); 
});

module.exports = router;