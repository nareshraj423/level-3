var express = require('express');
var mongoose = require('mongoose');
var authRouter = express.Router();
var passport = require('passport');

var router = function (nav, User) {

	//Defining signUp route.
	authRouter.route('/signUp')
		.post(function (req, res) {
			// New User credentials are saved to db.
			var user = new User(req.body);
			user.save(function (err, results) {
				if (err)
					res.status(500).send(err);
				else
					// Passport module creates a login function in req attribute for sending user credentials to passport module.
					req.login(results, function () {
						res.redirect('/auth/profile');
					});
			});
		});

	//Defining signIn route. Authentication using passport module.
	authRouter.route('/signIn')
		.post(passport.authenticate('local', {
			failureRedirect: '/'
		}), function (req, res) {
			// User profile is created 'req.user' after authentication and redirected to profile page.
			res.redirect('/auth/profile');
		});

	//Defining user profile route.
	authRouter.route('/profile')
		.all(function (req, res, next) {
			//Securing unauthorised access to user profile route.
			if (!req.user) {
				res.redirect('/');
			}
			next();
		})

		.get(function (req, res) {
			// Redirected to default route.
			res.redirect('/api/explore');
		});

	return authRouter;
};

module.exports = router;
