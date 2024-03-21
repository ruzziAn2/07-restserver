const { Schema, model } = require('mongoose')

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    contraseña: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'SALES_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


usuarioSchema.methods.toJSON = function () {
    // se descarta la contraseña hasheada y la version del documento pues son datos que no debieramos ver
    const { __v, contraseña, ...usuario } = this.toObject();
    // y se devuelve un objeto con los datos del usuario
    return usuario
}


module.exports = model('Usuarios', usuarioSchema)