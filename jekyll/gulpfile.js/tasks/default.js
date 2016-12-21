// ==== DEFAULT ==== //

var gulp      = require('gulp'),
  runSequence = require('run-sequence')
;

// Default task chain: build -> (livereload or browsersync) -> watch
gulp.task('default', ['watch']);

// Setup task chain: update -> icons.
gulp.task('setup', function(callback) {
  runSequence('update', 'image-icons',
  [
    'default'
  ],
  callback);
});
