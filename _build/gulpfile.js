const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const pump = require('pump');


/**
 * Watches the scss directory in order to rebuild when changes are made
 */
gulp.task('watch', function() {
    return watch('src/**/*', () => {
        gulp.start('production-compile-sass');
        gulp.start('compile-js');
    })
});

/**
 * Starts the build sequence for development
 */
gulp.task('compile-sass', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./map'))
        .pipe(gulp.dest('../content/css/'));
});

/**
 * Compiles Sass for Production
 */
gulp.task('production-compile-sass', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers : ['ie 9-10']
        }))
        .pipe(gulp.dest('../content/css/'));
});

gulp.task('compile-js', function(cb) {
    pump([
        gulp.src('./src/js/*.js'),
        gulp.dest('../content/js/modules/'),
        concat('main.js'),
        gulp.dest('../content/js/')
    ],
    cb
    );
});