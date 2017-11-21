var express = require('express');
var productRouter = express.Router();


// productModel is taken as argument for usage in database operations.
var routes = function (nav, Product) {
	
	// Implementing controllers for easy code readability.
	var productController = require('../controllers/productController')(nav);
	
	// 
	productRouter.use(productController.middlewareProfile);

	// Routes configuration to create a product item in db.
	productRouter.route('/explore')
		.post(productController.postExploreIndex)

		// To view all products in db.
		.get(productController.getExploreIndex);

	//Midlleware which simplifies the process of finding a particular product id.
	productRouter.use('/explore/:productId', productController.middlewareById);

	// Routes configuration to view a particular product.
	productRouter.route('/explore/:productId')
		.get(productController.getExploreById)

		// To edit all or some attributes at once in a product.
		.put(productController.putExploreById)

		// To edit a particular attribute in a blog, without any changes to other attributes.
		.patch(productController.patchExploreById)

		// To delete a particular product using Id.
		.delete(productController.deleteExploreById);

	return productRouter;
};

module.exports = routes;
