var mongoose = require('../bin/mongodb')
var Schema = mongoose.Schema;

var productoSchema = new Schema({
  denominacion:String,
  SKU: String,
  precio: Number,
  imagenes: [String],
  descripcion: String,
  cantidadVendida: Number,
  id_producto: {type:Schema.ObjectId, ref:"productos"}
  
})

var MainSchema = new Schema({
    fecha:{
      type: Date,
      default: Date.now
      
    },
    usuario: {type:Schema.ObjectId, ref:"usuarios"},
    detalle: productoSchema,
    importe: Number,
    estadoDePago: {
      type: String,
      default: "Pendiente de pago"
    },
    metodoPago: {
      type: String,
      default: "Efectivo"
    },
})

MainSchema.plugin(mongoose.mongoosePaginate);
module.exports = mongoose.model('ventas',MainSchema)

