const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/user');


const usuariosGet = (req, res = response) => {
    const query = req.query;
    res.json({
        msg: 'Probando metodo GET - Desde controlador',
        query
    })
}

const usuariosPost = async (req, res = response) => {



    //desestructurar sirve tambien para ocultar información innecesaria devuelta en la petición
    const { nombre, correo, contraseña, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, contraseña, rol });

    // // Verificar si el correo existe
    // const existeCorreo = await Usuario.findOne({ correo });
    // if (existeCorreo) {
    //     return res.status(400).json({
    //         msg: 'El correo ya está registrado'
    //     })
    // }

    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.contraseña = bcrypt.hashSync(contraseña, salt);

    //Guardar en BD
    await usuario.save();

    res.json({
        usuario
    })
}

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { contraseña, google, correo, ...resto } = req.body;

    if (contraseña) {
        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.contraseña = bcrypt.hashSync(contraseña, salt);
    }


    const user = await Usuario.findByIdAndUpdate(id, resto);

    // await user.save();

    res.json({
        msg: 'Probando metodo PUT - Desde controlador',
        id,
        resto,
        user
    })

}
const usuariosDelete = async (req, res = response) => {
    const { id, ...resto } = req.params
    const user = await Usuario.findByIdAndDelete(id)
    res.json({
        msg: 'Probando metodo DELETE - Desde controlador',
        id,
        user
    })
}
const usuariosPatch = async (req, res = response) => {
    //copiado desde usuariosPut
    //habra alguna diferencia entre usuariosPut y usuariosPatch?

    const { id } = req.params;
    const { contraseña, google, correo, ...resto } = req.body;

    if (contraseña) {
        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.contraseña = bcrypt.hashSync(contraseña, salt);
    }


    const user = await Usuario.findByIdAndUpdate(id, resto);

    // await user.save();

    res.json({
        msg: 'Probando metodo PATCH - Desde controlador',
        id,
        resto,
        user
    })
}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}