//cartModel in the form of a constructor.
module.exports = function Cart(oldCart) {

	//Instantiation and initialisation of Cart object attributes with default values or with exisiting session's Cart object.
	//items = Named JSON object consisting of product details.
	this.items = oldCart.items || {};
	this.totalQty = oldCart.totalQty || 0;
	this.totalPrice = oldCart.totalPrice || 0;

	//Function for incrementing/decrementing products into the cart.
	//Function paramaters are item,id. The calling functions are in cartRoute.js
	//item = Product item to be added. 
	//id = Product id of the product being added.
	this.add = function (item, id) {

		// Storing the new/existing product item into the cart.
		var storedItem = this.items[id];

		//Initial values of a new product item to be stored in cart.
		if (!storedItem) {
			storedItem = this.items[id] = {
				item: item,
				qty: 0,
				price: 0
			}
		}

		//Calculating the quantity,price of individual product item.
		storedItem.qty++;
		storedItem.price = storedItem.item.price * storedItem.qty;

		//Calculating the total quantity,price present in the cart.
		this.totalQty++;
		this.totalPrice += storedItem.item.price;
	};

	//Function for decrementing/reducing products into the cart.
	this.sub = function (id) {
		var storedItem = this.items[id]
		storedItem.qty--;
		storedItem.price -= storedItem.item.price;
		this.totalQty--;
		this.totalPrice -= storedItem.item.price;

		//Erase the product item from the cart if 'qty' becomes 0.
		if (storedItem.qty <= 0) {
			delete this.items[id];
		}
	};

	//Function for deleting products from the cart.
	//Updating the totalQTy,totalPrice before erasing a product item.
	this.del = function (id) {
		var storedItem = this.items[id];
		this.totalQty -= storedItem.qty;
		this.totalPrice -= storedItem.price;
		delete this.items[id];

	};

	//Generating the cart list in the form of array for rendering.
	this.generateArray = function () {
		var cartList = [];
		for (var key in this.items) {
			cartList.push(this.items[key]);
		}
		return cartList;
		//Returning array to calling function in cartRoute.js
	};

};
