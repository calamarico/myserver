var cache = require('memory-cache');
var fs = require('fs');
var path = require('path');

var mimetypes = {
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.css': 'text/css'
};

exports.routeRequest = function(request, response, handle) {
	console.info('Method:' + request.method);
	console.info('URL origen:' + request.url);
	console.info(request.headers);

	if (request.method === 'GET') {
		var url = (decodeURI(request.url) === '/') ? 'index.html' : decodeURI(request.url);
		fs.readFile('webApp/' + path.basename(url), function(err, data) {
			if (err) {
				console.log('Error al encontrar fichero:' +
					path.basename(url));
				response.writeHead(500, {'content-type': 'text/plain'});
				response.end('File not found');
			}
			response.writeHead(200, {'content-type': mimetypes[path.extname(url)]});
			response.end(data);
		});
	}
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
