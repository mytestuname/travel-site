var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var autoprexifer = require('autoprefixer');
var postcsssimplevars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var nano = require('gulp-cssnano');
var pcssimport = require('postcss-import');
var mixins = require('postcss-mixins');

gulp.task('watch', function(){
	
	browserSync.init({
		server: {
			baseDir: "app"
		}
	});

	watch('./app/index.html', function(){
		doHTML(gulp);
	});
	
	watch('./app/styles/**/*.css', function(){
		doCSS(gulp);
	});
	
});

function doHTML(glp){
	browserSync.reload();
}

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