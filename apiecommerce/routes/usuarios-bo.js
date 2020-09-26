var express = require('express');
var router = express.Router();
var validateUserBO = require('../uservalidatebo');
var mainController = require('../controllers/usuarios-boController');


/* POST Registro de un nuevo usuario de Backoffice*/
router.post('/registro', mainController.create);

// POST Logueo de usuario ya existente de Backoffice
router.post('/login', mainController.login);

// POST Logueo de usuario ya existente de Backoffice
router.post('/update',validateUserBO, mainController.update);


module.exports = router;