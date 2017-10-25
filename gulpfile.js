var gulp          = require('gulp'),
    autoprefixer  = require('gulp-autoprefixer'),
    cssnano       = require('gulp-cssnano'),
    uglifyes      = require('gulp-uglify-es').default,
    rename        = require('gulp-rename'),
    concat        = require('gulp-concat'),
    del           = require('del');

gulp.task('styles', function() {
  return gulp.src('./src/main.css')
    .pipe(autoprefixer('last 2 version'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function() {
  return gulp.src([
      // Dependencies 
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/underscore/underscore-min.js',
      './node_modules/backbone/backbone-min.js',
      // Custom
      'src/models/**/*.js',
      'src/**/*.js',
    ])
    .pipe(concat('app.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglifyes())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('build', ['clean'], function() {
  gulp.start('styles', 'scripts');
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('dist'));
});