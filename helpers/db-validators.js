const Role = require('../models/role');
const usuario = require('../models/usuario');


const esRoleValido = async(role = '')=>{
    
    const existeRol = await Role.find( { role } );
    if ( !existeRol ){
        throw new Error(`El rol ${ role } no esta refistrado en la DB`)
    }
  
}

const emailExiste = async( correo = '') => {

    //Verificar si el correo existe
    const ExisteEmail = await usuario.findOne( { correo } );
    if( ExisteEmail ){
        throw new Error(`{El correo: ${ correo }, ya esta registrado }`);
    }
}

const existeUsuarioPorId = async( id) => {

    //Verificar si el correo existe
    const existeUsuario = await usuario.findById( { id } );
    if( !existeUsuario ){
        throw new Error(`{El id no existe ${ id } }`);
    }
}

const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {

    const incluida = colecciones.includes(coleccion);
    if ( !incluida ){
        throw new Error(`La coleccion ${ coleccion } no es permitida, ${ colecciones }`);
    }

    return true;


}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    coleccionesPermitidas
}