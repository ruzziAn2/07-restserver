const { response, request } = require("express");
const { Producto } = require('../models');



//obtenerProductos
const obtenerProductos = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const [total, listaProductos] = await Promise.all([
        Producto.countDocuments({ estado: true }),
        Producto.find({ estado: true })
            .populate('usuario', 'nombre')
            .populate('clasificacion', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        listaProductos
    });
};


//obtenerProducto
const obtenerProducto = async (req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('clasificacion', 'nombre');
    res.json({
        id,
        producto
    });
};


//crearProducto
const crearProducto = async (req = request, res = response) => {
    const { __v, estado, usuario, ...body } = req.body

    const productoDB = await Producto.findOne({ nombre: body.nombre });
    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        });
    }
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,
    };
    const producto = new Producto(data);
    await producto.save();

    res.status(201).json(producto);
};



//actualizarProducto
const actualizarProducto = async (req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...resto } = req.body;

    if (resto.nombre) {
        resto.nombre = resto.nombre.toUpperCase();
    }

    resto.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, resto, { new: true });

    res.json(producto);
};




//eliminarProducto
const eliminarProducto = async (req, res = response) => {
    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(productoBorrado);
};





module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
}