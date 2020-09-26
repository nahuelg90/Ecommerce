const jwt = require('jsonwebtoken');

function validateUser(req,res,next){
    jwt.verify(req.headers['x-access-token'],process.env.SECRET_KEY,function(err,decoded){
      if(err){
        res.json({message:err.message})
      }else{
        req.body.userToken = decoded
        next();
      }
    })
}


module.exports = validateUser;