var mainModel = require("../models/productosModel");
const { populate } = require("../models/productosModel");
var multer = require('multer');
var DIR = './public/images/';
var upload = multer({dest: DIR}).single('photo');

async function getArrayBusqueda(arrayEnString)
{
  let arrayConvertido = arrayEnString.split(",")
  var arrayBusqueda = [];
  for (var i = 0; i < arrayConvertido.length; i++) {
    arrayBusqueda[i] = new RegExp(arrayConvertido[i]);
  }
  return arrayBusqueda
}

module.exports = {
    getAll: async function(req, res, next) {
      let productos = await mainModel.paginate(
        {}, //query
        { //options
          populate: 'categoria', 
          limit: req.query.limit?req.query.limit:10,
          page: req.query.page?req.query.page:1
        });
      res.status(200).json(productos)
    },

    getById: async function(req, res, next) {
      try{
        let producto = await mainModel.findById(req.params.id);
      if(producto){
        await mainModel.populate(producto, {path:'categoria'});
        res.status(200).json(producto)
      } else {
        res.status(400).json({"stauts":"error","mensaje":"Producto no encontrado"})
      }
      } catch (e){
        res.status(400).json({"stauts":"error","mensaje":"Producto no encontrado"})
      }
      
    },

    find: async function(req,res,next){

      try{
        // convertir la query ya que voy a mandar las palabras a buscar separados por coma
        let arrayBusqueda = await getArrayBusqueda(req.params.query)
        // lo quise hacer con aggregatePaginate, pero no tomaba el Aggregate y traía todo.
        let productos = await mainModel.aggregate([
          { $unwind: "$tags"},
          { $match: {
              $or: [
                  {"denominacion":  {$in: arrayBusqueda}},
                  {"tags": {$in: arrayBusqueda}}
              ]
          }},
          { $group: {
              _id: "$_id",
              enOferta: {$first: "$enOferta"},
              tags: {$push: "$tags"},
              denominacion: {$first: "$denominacion"},
              SKU: {$first: "$SKU"},
              precio : {$first: "$precio"},
              precioDeOferta :{$first: "$precioDeOferta"},
              imagenes : {$first: "$imagenes"},
              cantidad : {$first: "$cantidad"},
              categoria :{$first: "$categoria"},
              destacado :{$first: "$destacado"},
              descripcion :{$first: "$descripcion"}
              
          }}
      ])
      if(productos){
               
        await mainModel.populate(productos, {path:'categoria'});
        res.status(200).json(productos)
      } else {
        res.status(400).json({"stauts":"error","mensaje":"Producto no encontrado"})
      }
    } catch (e){
       res.status(400).json({"stauts":"error","mensaje":"Producto no encontrado"})
      }
    },    
    getDestacados: async function(req, res, next) {
      console.log(req.query)
      let productosDestacados = await mainModel.paginate(
        {destacado:1}, //query
        { //options
          populate: 'categoria', 
          limit: req.query.limit?req.query.limit:10,
          page: req.query.page?req.query.page:1
        });

      res.status(200).json(productosDestacados)
    },

    create: async function(req, res, next) {
      let resultado = await mainModel.findOne({$or:[{denominacion:req.body.denominacion},{SKU:req.body.SKU}]});
      if(!resultado) {
        let producto = new mainModel({
          denominacion: req.body.denominacion, 
          SKU: req.body.SKU,
          precio: req.body.precio,
          precioDeOferta: req.body.precioDeOferta,
          imagenes: req.body.imagenes,
          cantidad: req.body.cantidad,
          categoria: req.body.categoria,
          destacado: req.body.destacado,
          descripcion: req.body.descripcion,
          tags: req.body.tags
        })
        let data = await producto.save();
        res.status(201).json(data) // 201: CREATED
      } else {
        res.status(400).json({"stauts":"error","mensaje":"Ya existe un producto con el mismo nombre o SKU"})
      }
    },

    updateById: async function(req, res, next) {
      let data = await mainModel.update({ _id: req.params.id}, req.body, { multi: false })
      res.status(200).json(data)
    },

    deleteById: async function(req, res, next) {
      let data = await mainModel.findByIdAndDelete(req.params.id);
      res.status(200).json({"stauts":"ok","mensaje":"Producto eliminado"}) 
    },

    upload: async function(req, res, next) {
      try{
          var path = '';
          upload(req, res, function (err) {

                  if (err) {
                      // An error occurred when uploading
                      console.log(err);
                      next()
                  }  
                  // No error occured.
                  path = req.file.path;
                  res.status(201).json({status: "success", message: "Imagen cargada exitosamente", data: req.file});
          });  
      }catch(e){
      
          console.log(e)
          next(e)
      }
  }
}
