const validaCampos = require('../middlewares/validarCampos');
const validaJWT = require('../middlewares/validarJWT');
const validaRol = require('../middlewares/validarRol');


module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRol
}