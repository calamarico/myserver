var cache = require('memory-cache');
var clone = require('clone');
var persistence = require('./cpersistence.js');

save = function() {
	// var obj = {};
	// obj.messages = this.messages;
	// obj.name = this.name;
	// cache.put(this.name, obj);
	console.log('persistence;');
	console.log(persistence);
	persistence.createUser(this.nick, this);
};

exports.getMessages = function() {
	//var messages = clone(this.messages);
	var obj = thi
	this.messages = [];
	this.save();
	return messages;
};
exports.fetch = function() {
	var obj = null;
	obj = cache.get(this.name);
	if(obj !== null) {
		this.name = obj.name;
		this.messages = obj.messages;
		return true;
	}
	else {
		return false;
	}
};
exports.addMessage = function(obj) {
	this.messages.push(obj);
	this.save();
};
exports.set = function(obj) {
	this.nick = obj.nick;
	this.identity = obj.identity;
	this.inbox = obj.inbox;
	//save();
};
