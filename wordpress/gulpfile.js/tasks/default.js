// ==== DEFAULT ==== //

var gulp = require( 'gulp' );


// 1. Default
// 2. Setup
// 3. Build
// 4. Dist


// 1. Default //

// Default task chain: build -> (livereload or browsersync) -> watch
gulp.task( 'default', ['watch']);


// 2. Setup //

// One-off setup tasks.
gulp.task( 'setup', ['update']);


// 3. Build //

// Build a working copy of the theme.
gulp.task( 'build', ['images', 'scripts', 'styles', 'wordpress']);


// 4. Dist //

// Dist task chain: wipe -> build -> clean -> copy -> compress images
// NOTE: this is a resource-intensive task!
gulp.task( 'dist', ['wordpress-dist']);
