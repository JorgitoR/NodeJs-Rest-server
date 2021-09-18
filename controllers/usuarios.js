const { response, request } = require('express');

const usuarioGet = (req=request, res=response) => {

    const query = req.query;  //desesctructuracion de objetos {}

    res.json({
        msg:'get API controller',
        query
    })

}

module.exports = {
    usuarioGet
}