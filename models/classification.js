const { Schema, model } = require('mongoose');

const clasificacionSchema = Schema({
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
    }
});


clasificacionSchema.methods.toJSON = function () {
    // se descarta la contraseña hasheada y la version del documento pues son datos que no debieramos ver
    const { __v, estado, ...data } = this.toObject();
    // y se devuelve un objeto con los datos del usuario
    return data
}

module.exports = model('Clasificacione', clasificacionSchema);