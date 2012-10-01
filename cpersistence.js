var db = require('nano')('http://localhost:5984/myserverapp')

module.exports = function persistenceConnect() {
	function checkUser(name) {
		db.get(name, function(err, body) {
			if(!err) {
				return {"check": true, "body": body};
			}
			else {
				return {"check": false};
			}
		});
	}
}