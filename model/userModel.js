var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Defining a user schema. Accessing users from db via a model name.
var userModel = mongoose.Schema({
	username: {
		type: String,
		required: true,
		default: "naresh"
	},
	password: {
		type: String,
		required: true,
		default: "raj"
	}
});

module.exports = mongoose.model('user', userModel);
