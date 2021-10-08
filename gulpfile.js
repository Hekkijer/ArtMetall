const gulp = require('gulp');
const { series } = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cleancss = require('gulp-clean-css');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

// BrowserSync
function watch(){
	browserSync.init({
		server: {
			baseDir: './'
		}
	})
	gulp.watch('./css/blocks/*.css', styles);
	gulp.watch("./js/*.js").on('change', browserSync.reload);
	gulp.watch('./index.html').on('change', browserSync.reload);
}

// Compile main.min.css
// function styles(){
// 	// Grab scss (first general, then blocks)
// 	return gulp.src(['./scss/variables.scss',
// 			'./scss/mixins.scss',
// 			'./scss/common.scss',
// 			'./scss/blocks/*.scss',
// 			'./scss/media.scss',
// 			// Libraries
// 			'./libs/*.css',
// 		])
// 		// Initialize sourcemaps
// 		.pipe(sourcemaps.init())
// 		// Concatenate into main.scss
// 		.pipe(concat('main.scss'))
// 		// From scss to css
// 		.pipe(sass())
// 		// Delete comments
// 		.pipe(cleancss( {level: { 1: { specialComments: 0}}}))
// 		// Vendor prefixes
// 		.pipe(autoprefixer(['last 15 versions']))
// 		// Compress to main.min.css
// 		.pipe(cleancss({level: { 0: { sourceMap: true}}}))
// 		.pipe(rename({ extname: '.min.css' }))
// 		// Sourcemaps sources (right here in the main.min.css)
// 		.pipe(sourcemaps.write())
// 		.pipe(gulp.dest('./css/'))
// 		.pipe(browserSync.stream());
// };

// Delete SourceMaps for production
// function clean(){
// 	return gulp.src('./css/main.min.css')
// 		.pipe(cleancss( {level: { 1: { specialComments: 0}}}))
// 		.pipe(gulp.dest('./css/'));
// };

// Compile index.css
function styles() {
	return gulp.src('./css/blocks/*.css')
		.pipe(sourcemaps.init())
		.pipe(concat('index.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./css/'))
		.pipe(browserSync.stream());
};


exports.styles = styles;
exports.watch = watch;
// exports.clean = clean;
