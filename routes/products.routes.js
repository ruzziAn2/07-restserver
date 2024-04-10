const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, adminRol } = require('../middlewares');
const { existeProductoPorID, existeClasificacionPorID } = require('../helpers/db-validators');
const {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/products.controller');

const router = Router();

// Obtener todas las productos - público
router.get('/', obtenerProductos);

// Obtener producto por id - público
router.get('/:id', [
    check('id', 'No es un id de mongo válido').isMongoId(),
    // check('clasificacion').custom(existeClasificacionPorID),
    check('id').custom(existeProductoPorID),
    validarCampos
], obtenerProducto);

// Crear producto - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('clasificacion', 'No es un id de Mongo').isMongoId(),
    check('clasificacion').custom(existeClasificacionPorID),
    validarCampos
], crearProducto);

// Actualizar producto - privado - cualquier persona con un token válido
router.put('/:id', [
    validarJWT,
    // check('clasificacion', 'No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
], actualizarProducto);

// Borrar un producto - Admin
router.delete('/:id', [
    validarJWT,
    adminRol,
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
], eliminarProducto);

module.exports = router;