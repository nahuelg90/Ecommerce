var express = require('express');
var router = express.Router();
var validateUserBO = require('../uservalidatebo');
var mainController = require('../controllers/categoriasController');

/* GET Todas las categorías */
router.get('/', mainController.getAll);

/* GET Todas las categorías como arbol*/
router.get('/categorias-tree', mainController.getAllTree);

/* GET Todas las categorías sin padre*/
router.get('/categorias-sin-padre', mainController.getCategoriasSinPadre);

/* GET Todos los productos según la categoría */
router.get('/:id', mainController.getById);

/* POST Crear una categoría */
router.post('/',validateUserBO, mainController.create); 

/* PUT Actualizar una categoría */
router.put('/:id',validateUserBO, mainController.updateById);

/* DELETE Eliminar una categoría */
router.delete('/:id',validateUserBO, mainController.deleteById);

module.exports = router;
