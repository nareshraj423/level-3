var Product = require('../../model/productModel');


// Functions of productRoute.js grouped in a controller for easy retrival, testing and readability.
var productController = function (nav) {

	var middlewareProfile = function (req, res, next) {
		if (!req.user) {
			res.redirect('/');
		}
		next();
	};

	var postExploreIndex = function (req, res) {
		var product = new Product(req.body);
		product.save(function (err, results) {
			if (err)
				res.status(500).send(err);
			else
				res.redirect('/api/explore')
		});
	};

	var getExploreIndex = function (req, res, next) {
		var query = {};
		for (var key in req.query) {
			query[key] = req.query[key];
		}
		Product.find(query, function (err, products) {
			if (err)
				res.status(500).send(err);
			else
				res.render('explore', {
					title: 'eStore Products',
					nav: nav,
					prods: products
				});
		});
	};

	var middlewareById = function (req, res, next) {

		var id = req.params.productId;

		Product.findById({
			_id: id
		}, function (err, product) {
			if (err)
				res.status(500).send(err);
			else if (product) {
				//req.product is created in req for data manipulation.
				req.product = product;
				next();
			} else
				res.status(404).send('No Product Found');
		});
	};

	var getExploreById = function (req, res) {
		res.render('exploreone', {
			title: 'Good',
			nav: nav,
			prod: req.product
		})
	};

	var putExploreById = function (req, res) {
		req.product.categoryName = req.body.categoryName;
		req.product.itemName = req.body.itemName;
		req.product.itemDescription = req.body.itemDescription;
		req.product.price = req.body.price;
		req.product.imagePath = req.body.imagePath;
		req.product.color = req.body.color;
		req.product.material = req.body.material;
		req.product.sizes = req.body.sizes;
		req.product.stock = req.body.stock;
		req.product.save(function (err) {
			if (err)
				res.status(500).send(err);
			else
				res.render('exploreone', {
					title: 'Good',
					nav: nav,
					prod: req.product
				})
		});
	};

	var patchExploreById = function (req, res) {
		if (req.body._id)
			delete req.body._id;
		for (let key in req.body) {
			req.product[key] = req.body[key];
		}
		req.product.save(function (err) {
			if (err)
				res.status(500).send(err);
			else
				res.render('exploreone', {
					title: 'Good',
					nav: nav,
					prod: req.product
				})
		});
	};

	var deleteExploreById = function (req, res) {
		req.product.remove(function (err) {
			if (err)
				res.status(501).send(err);
			else
				res.status(204).send('Produt is not avialable!!');
		});
	};


	return {
		middlewareProfile: middlewareProfile,
		getExploreIndex: getExploreIndex,
		postExploreIndex: postExploreIndex,
		middlewareById: middlewareById,
		getExploreById: getExploreById,
		putExploreById: putExploreById,
		patchExploreById: patchExploreById,
		deleteExploreById: deleteExploreById
	};
};

module.exports = productController;
