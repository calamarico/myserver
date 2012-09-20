var csession = require('sesh').magicSession();
module.exports = function csessionSetup() {
	var user = "good";
	var password

	return function csessionHandle(req, res, next) {
		console.log("Ha pasado por calamar auth");
		next();
	};
}