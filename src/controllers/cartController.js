var Cart = require('../../model/cartModel');
var Product = require('../../model/productModel');

// Functions of cartRoute.js grouped in a controller for easy retrival, testing and readability.
var cartController = function (nav) {

	var middlewareProfile = function (req, res, next) {
		//Securing unauthorised access to cart routes.
		if (!req.user) {
			res.redirect('/');
		}
		next();
	};

	var getIndex = function (req, res, next) {
		// If new session then null is assigned for rendering to cart.ejs page.
		if (!req.session.cart) {
			return res.render('cart', {
				title: 'My Cart',
				nav: nav,
				prod: null
			});
		}
		// Saving current cart session to cart object.
		// If new session then empty JSON object is assigned.
		var cart = new Cart(req.session.cart);
		console.log(cart);
		// Rendering Cart details using cartModel on Cart.ejs page.
		res.render('cart', {
			title: 'My Cart',
			nav: nav,
			prod: cart.generateArray(),
			totalP: cart.totalPrice,
			totalQ: cart.totalQty
		});
	};

	var middlewareAddById = function (req, res, next) {

		var productId = req.params.id;
		// Saving current cart session to cart object.
		// If new session then empty JSON object is assigned.
		var cart = new Cart(req.session.cart ? req.session.cart : {});

		//Finding product item in db using mongoose command.
		Product.findById(productId, function (err, product) {
			if (err) {
				return res.redirect('/api/explore');
			}
			// Function call to cartModel for decrement action.
			cart.add(product, product.id);
			// Saving currnet cart to req.session.
			req.session.cart = cart;
			console.log(req.session.cart);
			// Redirecting to cart page after decrementing.
			res.redirect('/view-cart');
		});
	};

	var getSubById = function (req, res, next) {

		var productId = req.params.id;
		// Saving current cart session to cart object.
		// If new session then empty JSON object is assigned.
		var cart = new Cart(req.session.cart ? req.session.cart : {});
		// Function call to cartModel for decrement action.
		cart.sub(productId);
		// Saving currnet cart to req.session.
		req.session.cart = cart;
		console.log(req.session.cart);
		// Redirecting to cart page after decrementing.
		res.redirect('/view-cart');
	};

	var getDelById = function (req, res) {

		var productId = req.params.id;
		// Saving exisiting  cart sesion.
		var cart = new Cart(req.session.cart);
		// Function call to cartModel for deleting action.
		cart.del(productId);
		// Saving currnet cart to req.session.			
		req.session.cart = cart;
		console.log(req.session.cart);
		// Redirecting to cart page after decrementing.
		res.redirect('/view-cart');
	};

	return {
		middlewareProfile: middlewareProfile,
		getIndex: getIndex,
		middlewareAddById: middlewareAddById,
		getSubById: getSubById,
		getDelById: getDelById
	};
};

module.exports = cartController;
