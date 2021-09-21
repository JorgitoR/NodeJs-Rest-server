const { response } = require("express")


const esAdminRole = (req, res=response, next ) =>{


    if( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primera'
        });
    }

    const {role, nombre }= req.usuario; //desestructuracion de objetos
    
    if( role !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${ nombre } no es administrador - No puede hacer esto`
        })
    }

    next();
}

const tieneRole = ( ...roles )=> { //me devuelve un arreglo, recivo los elementos

    return (req, res=response, next) => {
        console.log(roles, req.usuario.role);
        
        if( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primera'
            });
        }

        if ( !roles.includes( req.usuario.role ) ){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${ roles }`
            });
        }


        next();
    }


}

module.exports = {
    esAdminRole,
    tieneRole
}