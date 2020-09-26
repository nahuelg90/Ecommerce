var mainModel = require("../models/categoriasModel")

/* Lo saqué de https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404 ya que el forEach no es asincrónico */
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function findSons(array_hijos){
    sons = []
    await asyncForEach(array_hijos,async hijo=>{
      categoriaLeaf = {
        _id: hijo._id,
        descripcion: '',
        categoriasHijas: []
      }
      let leaf = await mainModel.findById(categoriaLeaf._id);
      categoriaLeaf.descripcion = leaf.descripcion;
      if (leaf.categoriasHijas.length > 0){
        categoriaLeaf.categoriasHijas.push(await findSons(leaf.categoriasHijas));
      }
      sons.push(categoriaLeaf);
    });
    return sons
}

module.exports = {
    getAll: async function(req, res, next) {
      let categorias = await mainModel.find({});
      await  mainModel.populate(categorias, {path:'categoriaPadre'});
      await  mainModel.populate(categorias, {path:'categoriasHijas'});
      res.status(200).json(categorias)
    },

    getAllTree: async function(req, res, next) {
      let categorias = await mainModel.find({"categoriaPadre": null});
      categoriaTree = [];
      await asyncForEach(categorias,async categoria=>{
        categoriaRoot = {
          _id: categoria._id,
          descripcion: categoria.descripcion,
          categoriasHijas: []
        }
        
        if(categoria.categoriasHijas.length >0){
          categoriaRoot.categoriasHijas.push(await findSons(categoria.categoriasHijas))
        }
        categoriaTree.push(categoriaRoot);
      });
      res.status(200).json(categoriaTree)
    },

    getCategoriasSinPadre: async function(req, res, next) {
      let categorias = await mainModel.find({"categoriaPadre": null});
      await  mainModel.populate(categorias, {path:'categoriasHijas'});
      res.status(200).json(categorias)
    },

    getById: async function(req, res, next) {
      try {
        let categoria = await mainModel.findById(req.params.id);
        await  mainModel.populate(categoria, {path:'categoriaPadre'});
        await  mainModel.populate(categoria, {path:'categoriasHijas'});
        res.status(200).json(categoria);
      } catch(e){
        res.status(400).json({"stauts":"error","mensaje":"no se encontró la categoría"}) // 400: Bad Request
      }
      
    },

    create: async function(req, res, next) {
      
      let resultado = await mainModel.findOne({descripcion:req.body.descripcion});
      if(!resultado){
        
        let categoria = new mainModel({
          descripcion: req.body.descripcion, 
          categoriaPadre: req.body.categoriaPadre, // es el "Id" de la categoría, sin el ObjectId("Id")
          categoriasHijas: req.body.categoriasHijas // ARRAY es el "Id" de la categoría, sin el ObjectId("Id") 
        })
        let data = await categoria.save();
        if(typeof req.body.categoriaPadre  !== 'undefined' && req.body.categoriaPadre ){
          // agregar la categoría hija al padre
          await mainModel.update({ _id:req.body.categoriaPadre}, 
            { $push: { categoriasHijas: data._id } }, 
            { multi: false })
        }
        if( req.body.categoriasHijas ){
          req.body.categoriasHijas.forEach(element => {

            // esto es asincrónico
            mainModel.updateOne({ _id:element}, 
              {$set: { categoriaPadre: data._id }},  // le tuve que poner $set porque hay que decir qué hacer. https://docs.mongodb.com/manual/reference/method/db.collection.update/
              { multi: false })
          });
        }
        res.status(201).json({"stauts":"ok","data":data}) // 201: CREATED
      } else {
         res.status(400).json({"stauts":"error","mensaje":"ya existe una categoría con ese nombre"}) // 400: Bad Request
      }
    },

    updateById: async function(req, res, next) {
      let data = await mainModel.update({ _id: req.params.id}, req.body, { multi: false })
      if(typeof req.body.categoriaPadre  !== 'undefined' && req.body.categoriaPadre ){
        // agregar la categoría hija al padre
        await mainModel.update({ _id:req.body.categoriaPadre}, 
          { $push: { categoriasHijas: req.params.id } }, 
          { multi: false })
      }
      res.status(201).json({"stauts":"ok","data":data})
    },

    deleteById: async function(req, res, next) {
      let productoAsociado = await mainModel.findOne( {categoria: req.params.id})
      if (productoAsociado) {
        let data = await mainModel.findByIdAndDelete(req.params.id);
        // tendría que quitar la categoría dentro de las hijas del padre
        res.status(200).json({"stauts":"ok","mensaje":"Categoría eliminada"}) 
      } else {
        res.status(400).json({"stauts":"error","mensaje":"La categoría tiene productos asociados."}) 
      }
      
    }
}