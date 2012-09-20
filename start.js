var server = require('./mserver');
var router = require('./router');
var handle = require('./handle');
var cache = require('memory-cache');
var users = require('./user.js');

//Initialize users
var usuarioDani = Object.create(users.User);
usuarioDani.name = 'dani';
usuarioDani.messages = [ { "origin": "peter", "text":"Cuanto tiempo, soy Peter"}, {"origin":"barbara", "text":"Como estamos?"}];

var usuarioBea = Object.create(users.User);
usuarioBea.name = 'bea';
usuarioBea.messages = [];

usuarioDani.save();
usuarioBea.save();

//

server.start(router, handle);