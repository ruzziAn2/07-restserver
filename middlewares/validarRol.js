const { request, response } = require('express')


const adminRol = async (req = request, res = response, next) => {
    // como la ruta actua de manera secuencial, ya tengo los datos de usuario desde el otro middleware.
    //
    // const usuario = await Usuario.findById(uid)

    // if(!usuario){
    //     return res.status(401).json({
    //         msg: 'Token no valido - usuario no existe DB'
    //     })
    // }
    //
    // como ya tengo los datos solo llamo req.usuario

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere validar el rol sin antes verificar el token'
        });
    }
    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - no tiene acceso`
        })
    }





    next()
}


const tieneRol = (...roles) => {
    return (req, res = response,next) =>{
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere validar el rol sin antes verificar el token'
            });
        }
        const { rol, nombre } = req.usuario;
        if(!roles.includes(rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }. ${nombre} no lo tiene`
            })
        }

        next()
    }
}

module.exports = {
    adminRol,
    tieneRol
}