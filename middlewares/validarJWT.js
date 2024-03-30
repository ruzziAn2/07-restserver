const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/user');


const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);
        if(!usuario){
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }

        //Verificar si el usuario tiene el estado en verdadero
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no válido - ESTADO: false'
            })
        }

        
        
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

    console.log({ Mira: token });
}

module.exports = {
    validarJWT
}