const dbValidators = require('./db-validators');
const generaJWT = require('./jwt');
const googleVerify = require('./googlee-verify');
const subirArchivo = require('./subir-archivo');


module.exports = {
    ...dbValidators,
    ...generaJWT,
    ...googleVerify,
    ...subirArchivo,
}