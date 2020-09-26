var mainModel = require("../models/usuarios-boModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create: async function(req, res, next) {
      let resultado = await mainModel.findOne({email:req.body.email});
      if(!resultado){
        let usuario = new mainModel({
          email: req.body.email, 
          password: req.body.password, 
          nombre: req.body.nombre ,
          apellido: req.body.apellido,
          cuil: req.body.cuil,
          permisos: req.body.permisos
        });
        await usuario.save();
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
      if(resultado){
        if(bcrypt.compareSync(req.body.password, resultado.password)){
          resultado.password = null;
          const token = jwt.sign({usuario:resultado},process.env.SECRET_KEY_BO,{expiresIn:'24h'})
          res.status(200).json({"stauts":"OK", "usuario": resultado, "token":token})
        } else {
          response = {
            status: "error",
            message: "E-mail o contraseña incorrectos"
          }
          res.status(400).send(response);
        }
      } else {
        response = {
          status: "error",
          message: "E-mail o contraseña incorrectos"
        }
        res.status(400).send(response);
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
      
    }
}
