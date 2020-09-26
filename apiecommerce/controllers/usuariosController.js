var mainModel = require("../models/usuariosModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var transporter = require('../bin/email')

module.exports = {
  create: async function(req, res, next) {
    let resultado = await mainModel.findOne({email:req.body.email});
    if(!resultado){
      let usuario = new mainModel({
        email: req.body.email, 
        password: req.body.password, 
        nombre: req.body.nombre ,
        apellido: req.body.apellido
      });
      await usuario.save();
      await transporter.sendMail({
        from: process.env.NODEMAILER_USER_GMAIL,
        to: req.body.email,
        subject: 'Bienvenido/a '+req.body.nombre,
        text: 'Bienvenido/a a nuestro ecommerce! Ya podés empezar a comprar',
        html: '<b>Bienvenido/a a nuestro ecommerce! Ya podés empezar a comprar</b>'
      });
      res.status(201).json({"stauts":"OK"}) // 201: CREATED

    } else {
      response = {
        status: "Error",
        message: "El e-mail se encuentra registrado"
      }
      res.send(response);
    }
    
  },
  login: async function(req, res, next) {
    let resultado = await mainModel.findOne({email:req.body.email});
    console.log(resultado)
    if(resultado){
      if(bcrypt.compareSync(req.body.password, resultado.password)){
        resultado.password = null;
        await mainModel.populate(resultado, {path:'comprasRealizadas'});
        const token = jwt.sign({usuario:resultado},process.env.SECRET_KEY,{expiresIn:'24h'})
        res.status(200).json({"stauts":"OK", "usuario": resultado, "token":token})
      } else {
        response = {
          status: "Error",
          message: "E-mail o contraseña incorrectos"
        }
        res.send(response);
      }
    } else {
      response = {
        status: "Error",
        message: "E-mail o contraseña incorrectos"
      }
      res.send(response);
    }
  },
  update: async function(req, res, next) {

    let resultado = await mainModel.findOne({_id:req.body.userToken.usuario._id});
    if (resultado) { 
      mainModel.updateOne({ _id:req.body.userToken.usuario._id}, 
        {$set: { password: req.body.password }},  // le tuve que poner $set porque hay que decir qué hacer. https://docs.mongodb.com/manual/reference/method/db.collection.update/
        { multi: false })
    } else {
      response = {
        status: "Error",
        message: "Usuario no encontrado"
      }
      res.send(response);
    }
  },

  userInfo: async function(req, res, next){
    let resultado = await mainModel.findOne({_id:req.body.userToken.usuario._id});
    await mainModel.populate(resultado, {path:'comprasRealizadas'});
    res.send(resultado)
  }
    
}
