const { response } = require('express')




const usuariosGet = (req, res = response) => {
    const query = req.query;
    res.json({
        msg: 'Probando metodo GET - Desde controlador',
        query
    })
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id;
    res.json({
        msg: 'Probando metodo PUT - Desde controlador',
        id
    })
}
const usuariosPost = (req, res = response) => {
    //desestructurar sirve tambien para ocultar información innecesaria devuelta en la petición
    const { nombre, edad } = req.body;

    res.json({
        msg: 'Probando metodo POST - Desde controlador',
        nombre,
        edad
    })
}
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'Probando metodo DELETE - Desde controlador'
    })
}
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Probando metodo PATCH - Desde controlador'
    })
}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}