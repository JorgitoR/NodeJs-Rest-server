const path = require('path');
const fs = require('fs'); //file system

const { v4: uuidv4 } = require('uuid');


const { response } = require('express');
const { subirArchivo } = require('../helpers/subir-archivo');

const  Usuario  = require('../models/usuario');
const  Producto  = require('../models/producto');

const cargarArchivo = async(req, res=response) => {

    try {

        // txt , md
        const file = await subirArchivo(req.files, undefined, 'textos');
        res.json({ file });
        
    } catch (error) {
        res.status(400).json({ msg })
    }


};


const actualizarImagn = async(req, res=response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if( !modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if( !modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
            break;
    
        default:
            break;
    }


    // Limpiar imagenes previas
    if( modelo.img ){
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img);
        if ( fs.existsSync( pathImagen ) ){
            fs.unlinkSync( pathImagen ); //eliminamos la img
        }
    }

    const file = await subirArchivo(req.files, ['txt', 'md'], coleccion);
    modelo.img = file;

    await modelo.save();
    res.json(modelo);

}

const mostrarImagen = (req, res=response) => {


    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if( !modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if( !modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
            break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' })
    }


    // Limpiar imagenes previas
    if( modelo.img ){
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img);
        if ( fs.existsSync( pathImagen ) ){
            return res.sendFile( pathImagen )
        }
    }

    res.json({
        msg:'falta place holder'
    })

}


/*
const cargarArchivo = (req, res=response) => {

    //esto se puede realizar por un middleware
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      res.status(400).json({msg:'No files were uploaded.'});
      return;
    }
    

    if (!req.files.archivo) {
        res.status(400).json({msg:'No files were uploaded.'});
        return;
    }
  
    //sampleFile = req.files.sampleFile;
    console.log('req.files >>>', req.files); // eslint-disable-line
    
    const { archivo } = req.files;
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[ nombreCortado.length -1 ];

    //Validar la extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if ( !extensionesValidas.includes(  extension )){
        return res.status(400).json({
            msg: `La extension ${ extension } no es permitida, ${ extensionesValidas } `
        })
    }

   
    res.json({
        extension
    })
 


    const nombreTemp = uuidv4() + '.' + extension;
    const uploadPath = path.join( __dirname, '../uploads/', nombreTemp );

    //guardar el archivo por su nombre
    //const uploadPath = path.join( __dirname,  '../uploads/', archivo.name);
  
    archivo.mv(uploadPath, (err)=> {
      if (err) {
        return res.status(500).send(err);
      }
  
      res.json({msg: 'File uploaded to ' + uploadPath });
    });


}
*/

module.exports = {
    cargarArchivo,
    actualizarImagn,
    mostrarImagen
}