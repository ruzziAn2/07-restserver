const { Router } = require('express');
const { buscar } = require('../controllers/find.controller');


const router = Router();



router.get('/:coleccion/:termino', buscar)




module.exports = router;