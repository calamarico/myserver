var connect = require('connect');
var http = require('http');
var url = require('url');
var kalamarAuth = require('./cauth');
var kalamarSession = require('./csession');

exports.start = function(route, handle) {
	var app = connect()
  		.use(connect.favicon())
  		.use(connect.logger('dev'))
      //.use(kalamarAuth())
  		.use(function(request, response){
    		  
        var dataPosteada = "";
        var pathname = url.parse(request.url).pathname;
        
	      request.setEncoding("utf8");
			  route.routeRequest(request, response, handle);
  		});
	
	http.createServer(app).listen(8124);
	console.info("Start server on 127.0.0.1:8124");
};