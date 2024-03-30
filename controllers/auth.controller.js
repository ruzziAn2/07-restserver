const { response } = require("express");
const Usuario = require('../models/user')
const bcryptjs = require('bcryptjs')
const { generarJWT } = require('../helpers/generarJWT')

const loginController = async (req, res = response) => {

    const { correo, contraseña } = req.body;
    try {
        //Verificar si el correo existe
        const usuario = await Usuario.findOne({ correo })
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrecto - Correo no encontrado'
            });
        }
        //Verificar si el usuario está activo
        if (usuario.estado === false) {
            //lo mismo seria si uso: if(!usuario.estado) pero creo que 
            //es mas notorio así lo que se está verificando
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrecto - Usuario deshabilitado'
            })
        }
        //Verificar la contraseña
        const contraseñaValida = bcryptjs.compareSync(contraseña, usuario.contraseña)
        if (!contraseñaValida) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrecto - Contraseña incorrecta'
            })
        }
        //Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el que sabe'
        })
    }
}

module.exports = {
    loginController
}