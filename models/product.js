const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    clasificacion: {
        type: Schema.Types.ObjectId,
        ref: 'Clasificacion',
        required: [true, 'La clasificación debe existir']
    },
    precio: {
        type: Number,
        default: 0
    },
    descripcion: { type: String },
    disponible: { type: Boolean, default: true },
    img: { type: String }
});

ProductSchema.methods.toJson = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
}



module.exports = model('Producto', ProductSchema);