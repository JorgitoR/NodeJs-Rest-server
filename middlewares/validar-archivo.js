const { response } = require("express");


const validarArchivo = ( req, res=response, next ) => {

    //esto se puede realizar por un middleware
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msg:'No files were uploaded.'
        });
   
    }

    next();

}

module.exports = validarArchivo;