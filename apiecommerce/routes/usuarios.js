var express = require('express');
var router = express.Router();
var validateUser = require('../uservalidate');

var mainController = require('../controllers/usuariosController');


/* POST Registro de un nuevo usuario de Backoffice*/
router.post('/registro', mainController.create);

// POST Logueo de usuario ya existente de Backoffice
router.post('/login', mainController.login);

// POST Logueo de usuario ya existente de Backoffice
router.post('/update', validateUser, mainController.update); //toma del token

// GET Info de usuario
router.get('/', validateUser, mainController.userInfo); 

module.exports = router;
