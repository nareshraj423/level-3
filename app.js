/*
Robust Express Application Assignment
------------------------------------------------------------------------------------------------------------------------------------------
Problem statement -
Create an Express MVC based REST API for a Ecommerce website. Take ideas from
flipkart.com or amazon.in. The API should have following features -
1) API to signup, login, forgot password etc. use PassportJS if required.
2) API to list products, create a product, view information of a particular product,delete a product, edit a product etc. you can think of more API by taking reference from above mentioned websites. Extra skill score will be given for this intuitive thinking
3) API to add products to cart and remove products from cart.
4) All APIs should give response in a proper standard format.
------------------------------------------------------------------------------------------------------------------------------------------
Create middlewares and libraries wherever you feel is required. Extra marks will be
given for careful structuring of the project and quality of code. You have to follow all the
guidelines taught in the sessions.
Host this code in a github repository as well and send the link of that repository in the
submission.
Handle all error cases carefully to make sure that your nodejs application doesn’t crash.
Technologies to be used ​- NodeJs, ExpressJs and MongoDB
------------------------------------------------------------------------------------------------------------------------------------------
Evaluation Basis
This project will be evaluated on following basis -
1) Quality of JavaScript code - Yo​ ur application's Javascript code should be optimized to
be readable with proper indentation and comments. It should be broken down into
functions for better maintainability and it should not contain any logical bugs.
2) Project MVC structure and design of schemas - Ext ​ ra skill score will be given for
design of good schema and mvc structure of the application.
3) Intuitive Thinking - ​You have thinking intuitively and make the website as easy to
understand as possible. You have think about all the possible error cases and you have
to handle them by giving proper response to user.
4) Originality of code - ​Your code will be checked for plagiarism and if it's not original, it
will be discarded with a negative skill score.
------------------------------------------------------------------------------------------------------------------------------------------
Deliverables from Candidate
1) Compressed Folder containing all your code.
2) A text file containing the link of your github repository.
Create a folder containing all these deliverables. Compressed all these into a ZIP/RAR format
and then upload it in the assignment page.
-------------------------------------------------------------------------------------------------------------------------------------------

*/

// Basic modules imported for building an applicaiton.
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var product = require('./model/productModel');

//Navigation bar variable.
var nav = [
	{
		Link: '/api/explore',
		Text: 'Explore'
		}
];

var port = process.env.PORT || 5000;

//Configuring databse: Native Mongoose driver.
var db = mongoose.connection;
var url = 'mongodb://localhost:27017/eStore';
mongoose.connect(url);

//Database error handling and connection status.
db.on('error', function (err) {
	console.log('Enable MongoDB server. Connection error: ' + err);
});
db.once('open', function () {
	console.log('MongoDB server is connected on local host: ' + url);
});

//Define template engine.
app.set('views', './src/views');
app.set('view engine', 'ejs');

//Use applicaiton level middleware for common functionality.
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
	secret: 'library',
	resave: false,
	saveUninitialized: false,
	cookie: {
		maximumAge: 180 * 60 * 1000
	}
}));

// Importing passport module from passport.js module.
require('./src/config/passport')(app);

app.use(express.static('public'));

// Routing.
var user = require('./model/userModel');
var product = require('./model/productModel');
var authRouter = require('./src/routes/authRoutes')(nav, user);
var productRouter = require('./src/routes/productRoutes')(nav, product);
var cartRouter = require('./src/routes/cartroutes')(nav);

//Define secondary routes used in application.
app.use(express.static('public'));

app.use('/api', productRouter);
app.use('/auth', authRouter);
app.use('/view-cart', cartRouter);

//Define main route of application.
app.get('/', function (req, res) {
	res.render('index_o', {
		title: 'Hello from render',
		nav: [
			{
				Link: '/api/explore',
				Text: 'Explore'
		}
]
	});
});

// Server keeps listening to all incoming requests on configured port.
app.listen(port, function (err) {
	console.log('Gulp task is running on my project ' + port);
});
