var users = require('./user.js');

function handleResource(request, response, chunk) {
	var origin = request.url.match(/(\w+)\/?$/).pop();
	console.log("El origin es:" + origin);
	function sendMsg(obj) {
		var userOrigin = Object.create(users.User);
		userOrigin.setName(origin);
		
		if(userOrigin.fetch()) {
			var userDestination = Object.create(users.User);
			userDestination.setName(obj.destination);
			if(userDestination.fetch()) {
				userDestination.addMessage({
					origin: origin,
					text: obj.text
				});
				return true;
			}
			else {
				return false;
			}
		}
		return false;
	};

	function pull(obj) {
		var userOrigin = Object.create(users.User);
		userOrigin.setName(origin);
		if(userOrigin.fetch()) {
			var jsonString = JSON.stringify(userOrigin.getMessages());
			return jsonString;
		}
		return null;
	};

	if(request.method === 'POST') {
		//check content-type header
		switch(request.headers["content-type"]) {
			case 'application/json':
				var objResult;
			 	console.info(typeof(chunk));
			 	console.info(chunk);
			 	try {
			 		console.info("El chunk es:" + chunk);
			 		objResult = JSON.parse(chunk);
			 	}
			 	catch(e) {
			 		console.info("Excepcion al serializar json:");
			 		console.info(e);
			 	}
			 	if(objResult.destination) {
			 			//send msg
			 			if(sendMsg(objResult)) {
			 				response.writeHead(201, {'Content-Type': 'text/plain'});
			 				response.end("Sending Message!");
			 			}
			 			else {
			 				response.writeHead(401, {'content-type':'text/plain'});
			 				response.end("The message could not be sent")
			 			}
			 		} 
			 		else {
			 			//pull
			 			var resultPull = pull(objResult);
			 			if(resultPull) {
			 				console.info("resultPull:");
							console.info(resultPull);
			 				response.writeHead(200, {'content-type': 'application/json'});
			 				response.end(resultPull);
			 			}
			 			else {
			 				response.writeHead(401, {'content-type': 'text/plain'});
			 				response.end("User not found");
			 			}
			 		}
				break;
			default:
				console.info("default content");
		}
	}
};

exports.handleResource = handleResource;