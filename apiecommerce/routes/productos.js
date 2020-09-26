var express = require('express');
var router = express.Router();
var validateUserBO = require('../uservalidatebo');

var mainController = require('../controllers/productosController');



/* GET obtener todos los productos */
router.get('/', mainController.getAll);



/* GET obtiene los productos destacados para el HOME */
router.get('/destacados', mainController.getDestacados);

/* GET busca por lo pasado*/
router.get('/find/:query', mainController.find);

/* GET obtener el detalle de un producto según su ID */
router.get('/:id', mainController.getById);

/* POST Crear un producto */
router.post('/', validateUserBO,mainController.create); 

/* POST Subir imagenes de un producto */
router.post('/upload', validateUserBO,mainController.upload); 


/* PUT Actualizar un producto */
router.put('/:id', validateUserBO,mainController.updateById); 

/* DELETE Eliminar un producto */
router.delete('/:id',validateUserBO,mainController.deleteById); 

module.exports = router;
