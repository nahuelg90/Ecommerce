var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
var aggregatePaginate = require('mongoose-aggregate-paginate-v2')

mongoose.connect(process.env.MONGODB_HOST, { useNewUrlParser: true }, function(error){
   if(error){
      throw error; 
   }else{
      console.log('Conectado a MongoDB');
   }
});

mongoosePaginate.paginate.options = {
   lean: true,
   limit: 1
}

aggregatePaginate.options = {
   lean: true,
   limit: 1
}

mongoose.mongoosePaginate = mongoosePaginate
mongoose.aggregatePaginate = aggregatePaginate

module.exports = mongoose; 