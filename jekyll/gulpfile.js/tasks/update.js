// ==== UPDATE ==== //

var gulp  = require('gulp'),
  plugins = require('gulp-load-plugins')({ camelize: true }),
  config  = require('../../gulpconfig').update
;

// Used to get around Sass's inability to properly @import vanilla CSS; see: https://github.com/sass/sass/issues/556
gulp.task('update-deps', function () {
  return gulp.src(config.src)
  .pipe(plugins.changed(config.dest))
  .pipe(plugins.rename(config.rename))
  .pipe(gulp.dest(config.dest));
});

gulp.task('update', ['update-deps']);
