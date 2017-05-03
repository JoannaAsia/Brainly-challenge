var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('css', function() {
	var plugins = [
		autoprefixer({browsers: ['> 1%'], cascade: false})
		// support all browsers with more than 1% of global usage
	];
	return gulp.src('src/*.css')
	.pipe(postcss(plugins))
	.pipe(gulp.dest('final'));
});