var cache = require('memory-cache');
var clone = require('clone');

var User = {
	save: function() {
		var obj = {};
		obj.messages = this.messages;
		obj.name = this.name;
		cache.put(this.name, obj);
	},
	getMessages: function() {
		var messages = clone(this.messages);
		this.messages = [];
		this.save();
		return messages;
	},
	fetch: function() {
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
	},
	addMessage: function(obj) {
		this.messages.push(obj);
		this.save();
	},
	setName: function(name) {
		this.name = name;
		return this;
	}
}

exports.User = User;