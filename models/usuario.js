// vamos a crear el modelo de usuario, es una coleccion de la dtb, coleccion es una tabla
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required: [false, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [false, 'El correo es obligatorio'],
        unique:true
    },
    password: {
        type: String,
        required: [false, 'La contraseña es obligatoria']
    },
    img:{
        type:String,
    },
    role:{
        type:String,
        required:false,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
});

UsuarioSchema.methods.toJSON = function(){
    //cuando se manda a llamar toJSON se ejecuta la funcion
    const { __v, password, _id, ...usuario } = this.toObject(); //desestructuramos el objeto, y todo los demas almacenamos en usuario
    usuario.uid = _id;
    return usuario
}

module.exports = model('Usuario', UsuarioSchema); //nombre de la tabla - seguido el esquema UsuarioSchema   