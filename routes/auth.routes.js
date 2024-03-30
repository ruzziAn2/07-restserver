const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validarCampos');
const { loginController } = require('../controllers/auth.controller');

const router = Router();


router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('contraseña', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
] ,loginController )


module.exports = router;