var gulp = require('gulp'), gutil = require('gulp-util'),
    stylus = require('gulp-stylus'),jshint = require('gulp-jshint')
    concat = require('gulp-concat'),rename = require("gulp-rename")
    cssmin = require('gulp-cssmin'),pug = require('gulp-pug');
 
gulp.task('stylus', function () {
  return gulp.src('components/**/*.styl')
    .pipe(stylus())
    .pipe(rename('main.css'))
    .pipe(gulp.dest('styles'));
});

gulp.task('jshint', function() {
  return gulp.src('components/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('cssminify', function () {
    gulp.src('styles/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
  gulp.watch('components/**/*.styl', ['stylus']);
  gulp.watch('styles/*.css', ['cssminify']);
  gulp.watch('components/**/*.js', ['jshint']);

});

gulp.task('default',['watch'],  function(){

	return gutil.log('Gulp is running!');
});