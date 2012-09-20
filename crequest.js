var cacheResources = {};

exports.handleRequest = function(request) {
	request.setEnconding();
	console.info("Method:" + request.method);
	console.info("URL origen:" + request.url);	
	console.info(request.headers);
	request.on('data', function(chunk) {
		if(request.method = "POST") {
			post(request, chunk);
		}
	});
	return request;
};

function post(request, chunk) {
	//check content-type header
	switch(request.headers["content-type"]) {
		case 'application/json':
			 console.info(typeof(chunk));
			 console.info(chunk);
			// handleJSONRequest(chunk);
			break;
		default:
			console.info("default content");
	}
};

function handleJSONRequest(data) {
	var obj = {};
	for(obj in data) {
		console.info("propertie:" + obj);
		console.info("value:");
		console.info(data[obj]);
		switch(obj) {
			case 'pull':
				console.info('is a pull');
				break;
			case 'msg':
				console.info('send msg');
				break;
			default:
				console.info('unknow action:' + obj);
				break;
		}
	}

};
