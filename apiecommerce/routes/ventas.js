var express = require('express');
var router = express.Router();
var validateUserBO = require('../uservalidatebo');
var validateUser = require('../uservalidate');
var mainController = require('../controllers/ventasController');

/* GET Obtener todas las ventas realizadas  -   Validar que sea un usuario-bo */
router.get('/', validateUserBO,mainController.getAll);

/* GET Obtener las ventas realizadas por el usuario logueado */
router.get('/usuario', validateUser,mainController.getByUsuario);

/* GET Obtener el detalle de una venta según el ID - Validar que tenga permisos */
router.get('/:id', validateUser, mainController.getById);

/* POST Genera una nueva venta */
router.post('/',validateUser, mainController.create);

/* PUT Actualiza una venta según el ID*/
router.put('/:id',  validateUserBO,mainController.updateById);

/* DELETE Elimina una venta según el ID  - ¿Hace falta?*/
router.delete('/:id', validateUserBO,mainController.deleteById);



module.exports = router;
