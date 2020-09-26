var mainModel = require("../models/ventasModel")
var productoModel = require("../models/productosModel")
var usuarioModel = require("../models/usuariosModel")
var transporter = require('../bin/email')
var mp = require("../bin/mercadopago")

module.exports = {
  getAll: async function(req, res, next) {
    let ventas = await mainModel.paginate(
      {}, //query
      { //options
        populate: 'usuario', 
        limit: req.query.limit?req.query.limit:10,
        page: req.query.page?req.query.page:1
      });
    res.status(200).json(ventas)
  },

    getByUsuario: async function(req, res, next) {
      let ventas = await mainModel.paginate({_id:req.body.userToken.usuario._id}, //query
        { //options
        populate: 'usuario', 
        limit: req.query.limit?req.query.limit:10,
        page: req.query.page?req.query.page:1
      });
      res.status(200).json(ventas)
    },

    getById: async function(req, res, next) {
      let venta = await mainModel.findById(req.params.id);
      if(venta){
        await mainModel.populate(venta, {path:'usuario'});
        res.status(200).json(venta)
      } else {
        res.status(400).json({"stauts":"error","mensaje":"Venta no encontrada"})
      }
    },       

    create: async function(req, res, next) {

      try {
        let data = await productoModel.findById(req.body.detalle.id_producto)
       
        
        if(data.cantidad - req.body.detalle.cantidadVendida >= 0){
          
          let user = await usuarioModel.findById(req.body.userToken.usuario._id)
          data.cantidad = (data.cantidad - req.body.detalle.cantidadVendida);
          if(data.enOferta){
            req.body.detalle.precio = data.precioDeOferta;
          } else {
            req.body.detalle.precio = data.precio;
          }
          req.body.detalle.precio = data.precio;
          let total = req.body.detalle.precio * req.body.detalle.cantidadVendida;
          
          let venta = new mainModel({
            usuario: req.body.usuario,
            importe: total,
            estadoDePago: req.body.estadoDePago,
            detalle: req.body.detalle,
            metodoPago: req.body.metodoPago
          })
          let dataVenta = await venta.save();
          
          await productoModel.update({ _id: data["id"]}, data, { multi: false })
          user['comprasRealizadas'].push(dataVenta["id"])
          await usuarioModel.update({ _id: user["id"]}, user, { multi: false })
          await transporter.sendMail({
            from: process.env.NODEMAILER_USER_GMAIL,
            to: user.email,
            subject: 'Muchas gracias por tu compra! '+user.nombre,
            text: 'Registramos tu compra del producto ' +req.body.detalle.denominacion+" por un total de "+total+" \nMuchas gracias por tu compra!",
            html: '<b>Registramos tu compra del producto ' +req.body.detalle.denominacion+" por un total de "+total+"</b><br>Muchas gacias por tu compra!</br>"
          });
          let data_return = {}
          if (req.body.metodoPago == "Mercadopago"){
            let preference = {
              items: [{
                id: dataVenta["_id"],
                title: req.body.detalle.denominacion,
                quantity: req.body.detalle.cantidadVendida,
                currency_id: 'ARS',
                unit_price: req.body.detalle.precio
              }],
              payer: {
                email: user.email
              },
              notification_url: 'http://miurl.com' // acá tendría que tener algún servicio que reciba la notificación y marque como pagado
            }
            data_return = await mp.pagar(preference)

          }
          
          res.status(201).json({"stauts":"ok","data":dataVenta, "dataMp": data_return}) // 201: CREATED
        } else {
          res.status(400).json({"stauts":"error","mensaje":"No hay stock suficiente"})
        }        
      } catch (error) {
        res.status(400).json({"stauts":"error","mensaje":"Error al generar la venta"})
      }
        
     
    },

    updateById: async function(req, res, next) {
      
      try {
        let data = await mainModel.update({ _id: req.params.id}, req.body, { multi: false })
        res.status(200).json({"stauts":"ok","data":data}) 
      } catch (error) {
        res.status(400).json({"stauts":"error","mensaje":"Venta no encontrada"})
      }
    },

    deleteById: async function(req, res, next) {
      try {
        await mainModel.findByIdAndDelete(req.params.id);
        res.status(200).json({"stauts":"ok","mensaje":"Venta eliminada"}) 
      } catch (error) {
        res.status(400).json({"stauts":"error","mensaje":"Venta no encontrada"})
      }
      
    }
}
