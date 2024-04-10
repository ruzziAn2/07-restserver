const { Router } = require('express');
const { check } = require('express-validator');


// const { validarCampos } = require('../middlewares/validarCampos');
// const { validarJWT } = require('../middlewares/validarJWT');
// const { adminRol, tieneRol } = require('../middlewares/validarRol')
const { validarCampos, validarJWT, adminRol, tieneRol } = require('../middlewares/index');


const { rolValido, emailExiste, existeUsuarioPorID } = require('../helpers/db-validators');

const { usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch } = require('../controllers/users.controller');
const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id', 'Existe usuario con ese ID').custom(existeUsuarioPorID),
    check('rol').custom(rolValido),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('contraseña', 'La contraseña es obligatoria, debe tener más de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail().custom(emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(rolValido),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    validarJWT,
    // adminRol,
    tieneRol('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id', 'No existe usuario con ese ID').custom(existeUsuarioPorID),
    validarCampos
], usuariosDelete);

router.patch('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id', 'No existe usuario con ese ID').custom(existeUsuarioPorID),
    // check('rol').custom(rolValido),
    validarCampos
], usuariosPatch)

module.exports = router;