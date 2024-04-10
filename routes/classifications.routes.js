const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, adminRol } = require('../middlewares');

const { existeClasificacionPorID } = require('../helpers/db-validators');

const {
    clasificacionPost,
    clasificacionGet,
    clasificacionGetXID,
    clasificacionPut,
    clasificacionDelete
} = require('../controllers/classifications.controller');


const router = Router();


// Obtener todas las categorias - público
router.get('/', clasificacionGet);

// Obtener categoria por id - público
router.get('/:id', [
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom(existeClasificacionPorID),
    validarCampos
], clasificacionGetXID);

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], clasificacionPost);

// Actualizar categoria - privado - cualquier persona con un token válido
router.put('/:id', [
    validarJWT,
    // check('id', 'No es un id de mongo válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeClasificacionPorID),
    validarCampos
], clasificacionPut);

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    adminRol,
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom(existeClasificacionPorID),
    validarCampos
], clasificacionDelete);

module.exports = router;