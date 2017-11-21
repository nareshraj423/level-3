var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Defining a product Schema.Accessing products from db via model name.
var productModel = mongoose.Schema({
	categoryName: {
		type: String,
		default: 'MyProduct'
	},
	itemName: {
		type: String,
		required: true
	},
	itemDescription: {
		type: String,
		default: ''
	},
	imagePath: {
		type: String,
		default: ""
	},
	price: {
		type: Number,
		required: true
	},
	color: {
		type: String,
		default: ''
	},
	material: {
		type: String,
		default: ''
	},
	sizes: {
		type: String,
		default: ''
	},
	stock: {
		type: String,
		default: ''
	}

});

module.exports = mongoose.model('product', productModel);
