var gulp = require('gulp');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');

gulp.task('default', function () {
    return gulp.src('./public/index.html').pipe(inject(gulp.src(['app/components/**/*.js'], {
            cwd: __dirname + "/public"
        }).pipe(angularFilesort())))
        .pipe(gulp.dest('./public'));
});