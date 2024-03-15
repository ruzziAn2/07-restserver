const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validarCampos');
const { rolValido, emailExiste } = require('../helpers/db-validators');

const { usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch } = require('../controllers/users.controller');
const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('contraseña', 'La contraseña es obligatoria, debe tener más de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail().custom(emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(rolValido),
    validarCampos
], usuariosPost);

router.delete('/:id', usuariosDelete);

router.patch('/:id', usuariosPatch)

module.exports = router;