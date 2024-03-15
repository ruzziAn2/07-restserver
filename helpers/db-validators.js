const Role = require('../models/role');
const Usuario = require('../models/user');


const rolValido = async rol => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol(${rol}) no existe`);
    }
}

// Verificar si el correo existe
const emailExiste = async correo => {
    const existeCorreo = await Usuario.findOne({ correo });
    if (existeCorreo) {
        throw new Error(`El correo(${correo}) ya existe`);
    }
}


module.exports = {
    rolValido,
    emailExiste
}