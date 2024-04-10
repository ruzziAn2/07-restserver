const validaCampos = require('../middlewares/validarCampos');
const validaJWT = require('../middlewares/validarJWT');
const validaRol = require('../middlewares/validarRol');
const validaArchivo = require('../middlewares/validarArchivo')


module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRol,
    ...validaArchivo
}