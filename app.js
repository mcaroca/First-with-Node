/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');

var app = express();

// all environments
app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', {
		layout: false 
	});
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

// development only
app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

//Declaro array para el valor entregado por el cliente
var productos = new Array();

//Vistas para main y comprador
app.get('/', function(request, response) {
	response.render('index', { title: 'Yo voy' });
});
app.get('/comprador', function(request, response) {
	response.render('comprador', { title: 'Yo voy - Comprador' });
});

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//Importo socket.io
var io = require('socket.io').listen(server);

//Conexión.
io.sockets.on('connection', function(socket){
  //Emitimos nuestro evento connected
  socket.emit('Conectado');
  socket.emit('primera', productos);
  
  //Función para recibir el dato enviado y devolverlo, uso de on y emit
  socket.on('datos', function(data){
    productos.push(data);
    //socket.productos = data;
    console.log('Datos guardados ' + productos);
    socket.broadcast.emit('productos', productos);
  });
});
