// ==== IMAGES ==== //

var gulp    = require( 'gulp' ),
    plugins = require( 'gulp-load-plugins' )({ camelize: true } ),
    config  = require( '../../gulpconfig' ).images
;


// Copy changed images from the source folder to 'build'.
gulp.task('images-copy', function() {
  return gulp.src(config.copy.src)
  .pipe(plugins.changed(config.copy.dest))
  .pipe(gulp.dest(config.copy.dest));
});


// Optimize and resize images.
gulp.task('images-resize', [ 'images-copy' ], function () {
  return gulp.src(config.resize.src)
  .pipe(plugins.changed(config.resize.dest))
  .pipe(plugins.responsive(config.resize.responsive, config.resize.options))
  .pipe(gulp.dest(config.resize.dest));
});


// Copy changed images from the source folder to 'build'.
gulp.task('images', ['images-copy']);
