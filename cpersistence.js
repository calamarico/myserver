var db = require('nano')('http://localhost:5984/connectapp');

exports.checkUser = function(name) {
	db.get(name, function(err, body) {
		if (!err) {
			return {'check': true, 'body': body};
		}
		else {
			return {'check': false};
		}
	});
}
exports.createUser = function(id, object) {
	var dbObject = object;
	db.get(id, function(err, body)) {
		if(!err) {

		}
	}
	if (!this.checkUser(id).check) {
		db.insert(dbObject, id, function(err, body, header) {
			if (err) {
				console.log('Error al insertar usuario: ' + err.message);
				return false;
			}
			console.log('Usuario: ' + id + ' insertado');
			return true;
		});
	}
	else {
		return false;
	}
}

exports.deleteUser = function(id) {
	//Pendiente de usar el db.destroy
}
