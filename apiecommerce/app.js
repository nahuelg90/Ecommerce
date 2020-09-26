var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config() // Faltaba esto


var indexRouter = require('./routes/index');
// agrego variables de ruteo
// usuarios
var usuariosRouter = require('./routes/usuarios');
// productos
var productosRouter = require('./routes/productos');
// usuarios-bo (backoffice)
var usuariosBORouter = require('./routes/usuarios-bo');
// categorias
var categoriasRouter = require('./routes/categorias');
// ventas
var ventasRouter = require('./routes/ventas');
// páginas estáticas
// var paginasEstaticasRouter = require('./routes/paginas-estaticas');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/** HEADER INICIO */
app.use(function(req, res, next) {
  /*res.setHeader('Access-Control-Allow-Origin',['http://localhost:4200', 'http://localhost:3001']);
  res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PUT');
  next();*/
  var allowedOrigins = ['http://localhost:4200', 'http://localhost:3001'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});
app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With,x-access-token');
  res.send(200);
});
/** HEADER FIN */


app.use('/', indexRouter);
// agrego el ruteo a app.use()
// usuarios
app.use('/usuarios', usuariosRouter);
// productos
app.use('/productos', productosRouter); 
// usuarios-bo (backoffice)
app.use('/usuarios-bo', usuariosBORouter); 
// categorias
app.use('/categorias', categoriasRouter); 
// ventas
app.use('/ventas', ventasRouter);
// páginas estáticas
// app.use('/paginas-estaticas', paginasEstaticasRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
