var mongoose = require('../bin/mongodb')
var Schema = mongoose.Schema;

var imagenSchema = new Schema({
  nombreArchivo: String,
  pathArchivo: String
})

var MainSchema = new Schema({
    denominacion: {
      unique: true,
      type: String
    },
    SKU: {
      unique: true,
      type: String
    },
    precio: {
        type: Number,
        min:0
    },
    precioDeOferta: {
        type: Number,
        min:0
    },
    enOferta: {
      type: Boolean,
      default: false
    },
    imagenes: [imagenSchema],
    descripcion: String,
    cantidad: Number,
    categoria: {type:Schema.ObjectId, ref:"categorias"},
    destacado: Boolean,
    tags: [String],
    productosRelacionados: [{type:Schema.ObjectId, ref:"productos"}],
    creado: {
      type: Date,
      default: Date.now
    }

})

MainSchema.plugin(mongoose.mongoosePaginate);
module.exports = mongoose.model('productos',MainSchema)
