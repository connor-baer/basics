// ==== IMAGES ==== //

var gulp  = require('gulp'),
  plugins = require('gulp-load-plugins')({ camelize: true }),
  config  = require('../../gulpconfig').images;

gulp.task('images', ['image-resize']);

// Optimize and resize images.
gulp.task('image-resize', function () {
  return gulp.src(config.resize.src)
    .pipe(plugins.responsive(config.resize.responsive, {
      errorOnUnusedImage: false,
      silent: true
    }))
    .pipe(gulp.dest(config.resize.dest));
});

// Generate icons.
gulp.task('image-icons', function () {
  return gulp.src(config.icons.src)
    .pipe(plugins.favicons(config.icons.favicons))
    .on('error', plugins.util.log)
    .pipe(gulp.dest(config.icons.dest));
});
