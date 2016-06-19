var gulp = require('gulp');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var less = require('gulp-less');
var concat = require('gulp-concat');
var gsi = require('gulp-scripts-index');
var watch = require('gulp-watch');

gulp.task('default', ['inject-deps', 'compile-less', 'watch-less', 'inject-deps']);

gulp.task('compile-less', function () {
    return gulp
        .src('./public/app/components/**/*.less')
        .pipe(less())
        .pipe(concat("dist.css"))
        .pipe(gulp.dest('public/build/'))
});

gulp.task('watch-less', function () {
    return gulp.watch('./public/app/components/**/*.less', ['compile-less']);
});
gulp.task('watch-script-deps', function () {
    return gulp.watch('./public/app/components/**/*.js', ['inject-deps']);
});

gulp.task('inject-deps', function () {
    return gulp
        .src('./public/index.html')
        .pipe(inject(gulp.src(['app/components/**/*.js'], {
                cwd: __dirname + "/public"
            })
            .pipe(angularFilesort())))
        .pipe(gulp.dest('./public'));
});