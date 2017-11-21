var express = require('express');
var cartRouter = express.Router();

//import cartModel, productModel for data manipulation.
var Cart = require('../../model/cartModel');
var Product = require('../../model/productModel');

// productModel is taken as argument for usage in database operations.
var routes = function (nav) {

	var cartController = require('../controllers/cartController')(nav);

	//Securing unauthorised access to user profile route.
	cartRouter.use(cartController.middlewareProfile);

	//Defining route to view cart page.
	cartRouter.route('/')
		.get(cartController.getIndex);

	//Defining route to add product items to cart.
	cartRouter.use('/add/:id', cartController.middlewareAddById);

	//Defining route to reduce product items from cart.
	cartRouter.route('/sub/:id')
		.get(cartController.getSubById);

	//Defining route to erase producct items from cart.
	cartRouter.route('/del/:id')
		.get(cartController.getDelById);

	return cartRouter;
};

module.exports = routes;
