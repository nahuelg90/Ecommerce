var mongoose = require('../bin/mongodb')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var Schema = mongoose.Schema;

var MainSchema = new Schema({
    email:String,
    password: String,
    nombre: String,
    apellido: String,
    favoritos: [{type:Schema.ObjectId, ref:"productos"}],
    comprasRealizadas: [{type:Schema.ObjectId, ref:"ventas"}],
    creado: {
        type: Date,
        default: Date.now
    }
})

MainSchema.pre('save', function(next){ //lo tuve que poner así porque con arrow function no funcionaba, this era nulo
    const salt = bcrypt.genSaltSync(saltRounds);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
})

MainSchema.pre('updateOne',{ document: true, query: false }, function(next){
    const salt = bcrypt.genSaltSync(saltRounds);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
})

module.exports = mongoose.model('usuarios',MainSchema)

