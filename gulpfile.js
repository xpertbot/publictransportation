var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	htmlmin = require('gulp-htmlmin'),
	notify = require('gulp-notify'),
	rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	buffer = require('vinyl-buffer'),
	browserSync = require('browser-sync').create(),
	mergeStream = require('merge-stream'),
	del = require('del'),
	babelify = require('babelify'),
	watchify = require('watchify'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	runSequence = require('run-sequence'),
	sass = require('gulp-sass');

var PATH = 'public/';

gulp.task('clean', function(){
	return del(['public']).then(paths => {
		console.log("Deleted files and folder:\n", paths.join('\n'));
	});
});

gulp.task('copy', function(){
	return mergeStream(
	    gulp.src('src/img/**/*').pipe(gulp.dest('public/img/'))
	  );
});

gulp.task('sass', function(){
	return gulp.src('src/sass/main.scss')
		.pipe(sass({
			outputStyle:'compressed'
		}))
		.on('error', notify.onError("Error: <%= error.message %>"))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest(PATH+'css/'))
		.pipe(browserSync.stream());
});

gulp.task('js', function(){

	return browserify("src/js/main.js")
		.transform("babelify", {presets: ['es2015']})
		.bundle()
		.pipe(source('main.js'))
		.pipe(buffer())
		.on('error', notify.onError("Error: <%= error.message %>"))
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify())
		.on('error', notify.onError("Error: <%= error.message %>"))
		.pipe(sourcemaps.write('./'))
		.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest(PATH+'js'))
		.pipe(browserSync.stream());
});

gulp.task('html', function(){
	return gulp.src('src/templates/**/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.on('error', notify.onError("Error: <%= error.message %>"))
		.pipe(gulp.dest(PATH))
});

gulp.task("serve", function(){
	browserSync.init({
		server: {
			open: false,
			baseDir: "./public",
		}
	});

	gulp.watch('src/sass/main.scss', ['sass']);
	gulp.watch('src/js/**/*.js', ['js']);
	gulp.watch('src/**/*.html', ['html']).on("change", browserSync.reload);
});

gulp.task('default', function(callback){
	runSequence('clean', ['sass', 'js', 'html', 'copy'], ["serve"], callback);
});
