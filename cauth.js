var connector = require('./cpersistence');
var usersBBDD = {
	'dani': 'calamar',
	'bea': 'guapisima'
};

module.exports = function cauthSetup() {
	return function cauthHandle(request, response, next) {
		if (/^\/login\/?$/.test(request.url)) {
			console.log('entra por login');
			request.on('data', function(chunk) {
				if (request.headers['content-type'] === 'application/json') {
					var objResult;
					objResult = JSON.parse(chunk);
					if (objResult['user'] && objResult['pass']) {
						if (request.method === 'POST') {
							if (typeof objResult['user'] !== 'undefined' &&
								usersBBDD[objResult['user']] === objResult['pass']) {
								request.session.data.user = objResult['user'];
								response.writeHead(200, {'content-type': 'text/plain'});
								response.end('Login correct');
							}
							else {
								response.writeHead(401, {'content-type': 'text/plain'});
								response.end('Login incorrect');
							}
						}
						else if (request.method === "PUT") {
							connector.checkUser(objResult["user"]);
							console.log(checkUser);
						}
					}
				}
			});
		}
		else if(/^\/logout\/?$/.test(request.url) && request.method === "DELETE") {
			if(request.session.data.user !== "Guest") {
				request.session.data.user = "Guest";
				response.writeHead(200, {'content-type':'text-plain'});
				response.end("You\'ve been logged out");
			}
			else {
				response.writeHead(500, {'content-type':'text-plain'});
				response.end("You aren\'t logged");
			}
		}
		else {
			next();
		}
	};
}
