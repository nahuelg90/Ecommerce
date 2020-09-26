var mongoose = require('../bin/mongodb')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var Schema = mongoose.Schema;

var MainSchema = new Schema({
    email:{
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    nombre: {
        type:String,
        required: true
    },
    apellido: {
        type:String,
        required: true
    },
    cuil: {
        type:String,
        required: true
    },
    permisos: String,
    creado: {
        type: Date,
        default: Date.now
      }
})

MainSchema.pre('save', function(next){
    const salt = bcrypt.genSaltSync(saltRounds);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
})

MainSchema.pre('updateOne',{ document: true, query: false }, function(next) {
    const salt = bcrypt.genSaltSync(saltRounds);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
})


module.exports = mongoose.model('usuarios-bo',MainSchema)
