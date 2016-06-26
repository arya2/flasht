var gulp = require('gulp');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var less = require('gulp-less');
var concat = require('gulp-concat');
var gsi = require('gulp-scripts-index');
var watch = require('gulp-watch');
var debug = require('gulp-debug');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

gulp.task('default', ['compile-scripts', 'compile-less', 'watch-less', 'watch-scripts']);

gulp.task('compile-less', function() {
    return gulp
        .src('./public/app/components/**/*.less')
        .pipe(less())
        .pipe(concat("dist.css"))
        .pipe(gulp.dest('public/build/'))
});

gulp.task('watch-less', function() {
    return gulp.watch('./public/app/components/**/*.less', ['compile-less']);
});
gulp.task('watch-scripts', function() {
    return gulp.watch('./public/app/components/**/*.js', ['compile-scripts']);
});

gulp.task('compile-scripts', function() {
    return gulp
        .src('./public/app/components/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(angularFilesort())
        .pipe(concat("scripts.js"))
        .pipe(gulp.dest('./public/build'));
});
