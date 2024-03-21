const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/user');


const usuariosGet = async (req, res = response) => {
    //limitamos la salida de usuarios mediante un parametro en la busqueda
    const { limite = 5, desde = 0 } = req.query;
    // //traer todos los usuarios
    // const usuarios = await Usuario.find({ estado: true })
    //     //para poder elegir desde que numero se mostraran los resultados
    //     .skip(Number(desde))
    //     //en el parametro, el numero a filtrar llega como string.
    //     //Se convierte con el metodo Number para evitar errores
    //     .limit(Number(limite))

    // //conteo de usuarios(documentos)
    // const totalUsuarios = await Usuario.countDocuments({ estado: true })

    //la respuesta es una coleccion de promesas
    const [total, listaUsuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        // msg: 'Probando metodo GET - Desde controlador',
        // "Total de usuarios": totalUsuarios,
        // usuarios
        total,
        listaUsuarios
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
    const { _id, contraseña, google, correo, ...resto } = req.body;

    if (contraseña) {
        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.contraseña = bcrypt.hashSync(contraseña, salt);
    }


    const user = await Usuario.findByIdAndUpdate(id, resto);

    // await user.save();

    res.json({
        // msg: 'Probando metodo PUT - Desde controlador',
        id,
        resto,
    })

}
const usuariosDelete = async (req, res = response) => {
    const { id } = req.params
    //borrar fisicamente con modelo de usuario por metodo de Mongoose:
    // const user = await Usuario.findByIdAndDelete(id)


    //borrar cambiando estado ya que la lista de usuarios ACTIVOS 
    // que trae el GET son todos los que tengan "estado: true"
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    res.json({
        // msg: 'Probando metodo DELETE - Desde controlador',
        id,
        usuario
    })
}
const usuariosPatch = async (req, res = response) => {
    //copiado desde usuariosPut
    //¿habra alguna diferencia entre usuariosPut y usuariosPatch?

    const { id } = req.params;
    const { _id, contraseña, google, correo, ...resto } = req.body;

    if (contraseña) {
        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.contraseña = bcrypt.hashSync(contraseña, salt);
    }


    const user = await Usuario.findByIdAndUpdate(id, resto);

    // await user.save();

    res.json({
        // msg: 'Probando metodo PUT - Desde controlador',
        id,
        resto,
    })
}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}