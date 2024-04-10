const { response, request } = require("express");
const { Clasificacion } = require('../models');

const clasificacionGet = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const [total, listaClasificaciones] = await Promise.all([
        Clasificacion.countDocuments({ estado: true }),
        Clasificacion.find({ estado: true })
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        listaClasificaciones
    });
};

const clasificacionGetXID = async (req, res = response) => {
    const { id } = req.params;
    const clasificacion = await Clasificacion.findById(id).populate('usuario', 'nombre');
    if (!clasificacion) {
        return res.status(400).json({
            msg: 'No se encontró la clasificación buscada'
        });
    }
    res.json({
        id,
        clasificacion
    });
};

const clasificacionPost = async (req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const clasificacionDB = await Clasificacion.findOne({ nombre });
    if (clasificacionDB) {
        return res.status(400).json({
            msg: `La categoría ${clasificacionDB.nombre} ya existe`
        });
    }
    const data = {
        nombre,
        usuario: req.usuario._id
    };
    const clasificacion = new Clasificacion(data);
    await clasificacion.save();
    res.status(201).json(clasificacion);
};

const clasificacionPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, estado, usuario, ...resto } = req.body;

    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id;
    /* 
        Ya viene el ID validado desde la ruta
    */
    // if (!id) {
    //     return res.json({
    //         msg: 'ID no reconocido - Clasificación'
    //     });
    // }
    const clasificacion = await Clasificacion.findByIdAndUpdate(id, resto, { new: true });
    res.json(clasificacion);
};

const clasificacionDelete = async (req, res = response) => {
    const { id } = req.params;
    const clasificacionBorrada = await Clasificacion.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json({
        clasificacionBorrada
    });
};

module.exports = {
    clasificacionPost,
    clasificacionGet,
    clasificacionGetXID,
    clasificacionPut,
    clasificacionDelete
};