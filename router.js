var cache = require('memory-cache');

exports.routeRequest = function(request, response, handle) {
	console.info("Method:" + request.method);
	console.info("URL origen:" + request.url);	
	console.info(request.headers);
	request.on('data', function(chunk) {
		// ALL url links to handleResource
		if(/^\/login\/?$/.test(request.url)) {
			console.info("Recurso login solicitado");
			response.writeHead(200, "Content-type:text/plain");
			response.end("Login");
		}
		else if(/^\/user\/(\w+)\/?$/.test(request.url)) {
			console.info("Recurso de usuario solicitado");
			handle.handleResource(request, response, chunk);
		}
		
	});
	return request;
};