const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validarCampos');
const { loginController, googleSignIn } = require('../controllers/auth.controller');

const router = Router();


router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('contraseña', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
] ,loginController )

router.post('/google',[
    check('id_token', 'El id_token es obligatorio').not().isEmpty(),
    validarCampos
] ,googleSignIn )


module.exports = router;