
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprexifer = require('autoprefixer');
var postcsssimplevars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var nano = require('gulp-cssnano');
var pcssimport = require('postcss-import');
var browserSync = require('browser-sync').create();
var mixins = require('postcss-mixins');

function doCSS(glp){

	console.log('CSS Updated!');

	gulp.src('./app/styles/styles.css').pipe(browserSync.stream());

	return glp.src('./app/styles/styles.css')
    .pipe(postcss([pcssimport, mixins,autoprexifer, postcsssimplevars, nested]))
    .on('error', function(err){
        console.log(err.toString());
        this.emit('end');
    })
	//.pipe(nano())
	.pipe(glp.dest('./app/prod/styles'))
	;
}
gulp.task('css', function(){
	doCSS(gulp);
});