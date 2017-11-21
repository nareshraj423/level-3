var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('../../../model/userModel');

// Configuring local strategy function.
// Read user inputs from passport session.
// Find the user profile and save it as user if successful
// Else deliver error message.
module.exports = function () {
	passport.use(new LocalStrategy({
			usernameField: 'username',
			passwordField: 'password'
		},
		function (username, password, done) {
			User.findOne({
				username: username
			}, function (err, results) {
				if (results.password === password) {
					var user = results;
					done(null, user);
				} else {
					done(null, false, {
						message: 'Wrong Password'
					});
				}
			});
		}));

};
