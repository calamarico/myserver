module.exports = function cauthSetup() {
	return function cauthHandle(req, res, next) {
		console.log("Ha pasado por calamar auth");
		next();
	};
}