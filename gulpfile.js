var gulp = require('gulp'),
	nodemon = require('gulp-nodemon');

gulp.task('inject', function () {

	var wiredep = require('wiredep').stream;
	var inject = require('gulp-inject');

	var injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], {
		read: false
	});

	var injectOptions = {
		ignorePath: '/public'
	};

	var options = {
		bowerJson: require('./bower.json'),
		directory: './public/lib',
		ignorePath: '../../public'
	}

	return gulp.src('./src/views/*.html')
		.pipe(wiredep(options))
		.pipe(inject(injectSrc, injectOptions))
		.pipe(gulp.dest('./src/views'));

});

gulp.task('serve', ['inject'], function () {

	nodemon({
			script: 'app.js',
			delayTime: 1,
			ext: '.js',
			env: {
				PORT: 5006
			},
			ignore: ['./node-modules/**']
		})
		.on('restart', function () {
			console.log('Server Restarting..');
		});
});
