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
  var htmlFilter = plugins.filter(config.icons.favicons.html, {restore: true});
  var iconsFilter = plugins.filter(['*', '!' + config.icons.favicons.html], {restore: true});

  return gulp.src(config.icons.src)
    .pipe(plugins.favicons(config.icons.favicons))
    .pipe(htmlFilter)
    .pipe(gulp.dest(config.icons.destHtml))
    .pipe(htmlFilter.restore)
    .pipe(iconsFilter)
    .pipe(gulp.dest(config.icons.dest));
});
