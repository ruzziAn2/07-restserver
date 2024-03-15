const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        // emun: ["ADMIN_ROLE", "USER_ROLE", "SALES_ROLE"]
    }
});


module.exports = model('Role', RoleSchema);