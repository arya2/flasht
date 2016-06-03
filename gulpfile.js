var gulp = require('gulp');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var less = require('gulp-less');
var concat = require('gulp-concat');
var gsi = require('gulp-scripts-index');

gulp.task('default', ['inject-deps', 'compile-less']);

gulp.task('compile-less', function () {
    return gulp
        .src('./public/app/components/**/*.less')
        .pipe(less())
        .pipe(concat("dist.css"))
        .pipe(gulp.dest('public/build/'))
});

gulp.task('inject-deps', function () {
    return gulp.src('./public/index.html').pipe(inject(gulp.src(['app/components/**/*.js'], {
            cwd: __dirname + "/public"
        }).pipe(angularFilesort())))
        .pipe(gulp.dest('./public'));
});