// ==== DEFAULT ==== //

var gulp      = require('gulp');

// Default task chain: build -> (livereload or browsersync) -> watch
gulp.task('default', ['watch']);

// Setup task chain: update -> icons.
gulp.task('setup', ['update', 'image-icons']);
