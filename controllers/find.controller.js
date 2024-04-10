const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const { Usuario, Clasificacion, Producto } = require('../models')

const coleccionesPermitidas = [
    'clasificacions',
    'productos',
    'roles',
    'usuarios'
];

const buscarUsuarios = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino)
    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }

    const regExp = new RegExp(termino, 'i')

    const usuarios = await Usuario.find({
        $or: [{ nombre: regExp }, { correo: regExp }],
        $and: [{ estado: true }]
    });



    res.json({
        // cantidad: conteo,
        results: usuarios
    });

    // const conteo = await Usuario.count({
    //     $or: [{ nombre: regExp }, { correo: regExp }],
    //     $and: [{ estado: true }]
    // });

}

const buscarClasificaciones = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const clasificacion = await Clasificacion.findById(termino);
        return res.json({
            results: (clasificacion) ? [clasificacion] : []
        });
    }
    const regExp = new RegExp(termino, 'i')

    const clasificaciones = await Clasificacion.find({
        //podria simplificarse como { nombre:regExp, estado: true }
        $and: [{ estado: true }, { nombre: regExp }]
    });



    res.json({
        results: clasificaciones
    });

}

const buscarProductos = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino)
    if (esMongoID) {
        const producto = await Producto.findById(termino)
            .populate('clasificacion', 'nombre');
        return res.json({
            results: (producto) ? [producto] : []
        });
    }
    const regExp = new RegExp(termino, 'i')

    const productos = await Producto.find({
        $and: [{ estado: true }, { nombre: regExp }]
    }).populate('clasificacion', 'nombre');



    res.json({
        results: productos
    });
}

const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'clasificacions':
            buscarClasificaciones(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;

        default:
            res.status(500).json({
                msg: 'Se me olvido como buscar'
            });
            break;
    }

}


module.exports = {
    buscar
}