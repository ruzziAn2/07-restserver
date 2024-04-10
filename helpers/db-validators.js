const Role = require('../models/role');
const Usuario = require('../models/user');
const Clasificacione = require('../models/classification');
const { Producto } = require('../models');


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

// Verificar si el id de usuario existe
const existeUsuarioPorID = async id => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe como usuario: (${id})`);
    }
}

const existeClasificacionPorID = async (id) => {
    const existeClasificacion = await Clasificacione.findById(id);
    if (!existeClasificacion) {
        throw new Error(`El id no existe como clasificacion: (${id})`);
    }
}

const existeProductoPorID = async (id) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El id no existe como producto: (${id})`)
    }
}

//Validar colecciones permitidas
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La colección ${coleccion} no es permitida. Las colecciones permitidas son: ${colecciones}`)
    }
    return true;
}



module.exports = {
    rolValido,
    emailExiste,
    existeUsuarioPorID,
    existeClasificacionPorID,
    existeProductoPorID,
    coleccionesPermitidas
}