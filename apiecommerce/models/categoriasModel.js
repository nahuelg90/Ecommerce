var mongoose = require('../bin/mongodb')
var Schema = mongoose.Schema;

var MainSchema = new Schema({
    descripcion:String,
    categoriaPadre: {type:Schema.ObjectId, ref:"categorias"},
    categoriasHijas: [{type:Schema.ObjectId, ref:"categorias"}]
})

module.exports = mongoose.model('categorias',MainSchema)
