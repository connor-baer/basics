// ==== STYLES ==== //

var gulp    = require( 'gulp' ),
    plumber = require( 'gulp-plumber' ),
    plugins = require( 'gulp-load-plugins')({ camelize: true } ),
    pkg     = require( './../../package.json' ),
    config  = require( '../../gulpconfig' ).styles
;


// Build stylesheets from source Sass files, post-process, and write source maps (for debugging) with libsass
gulp.task( 'styles-compile', function() {
  return gulp.src(config.build.src)
  .pipe( plumber() )
  .pipe( plugins.sourcemaps.init() ) // Note that sourcemaps need to be initialized with libsass
  .pipe( plugins.sass(config.libsass) )
  .pipe( plugins.cssnano(config.cssnano) )
  .pipe( plugins.sourcemaps.write('./') )
  .pipe( gulp.dest( config.build.dest) );
});


// Add the theme metadata required by WordPress to style.css.
gulp.task( 'styles-metadata', [ 'styles-compile' ], function() {

  // Using data from package.json.
  var metadata = ['/*!',
    'Theme name: <%= pkg.name %>',
    'Theme URI: <%= pkg.homepage %>',
    'Author: <%= pkg.author %>',
    'Author URI: http://madebyconnor.co',
    'Description: <%= pkg.description %>',
    'Version: <%= pkg.version %>',
    'License: <%= pkg.license %>',
    'License URI: https://www.gnu.org/licenses/gpl-3.0.en.html',
    'Tags: <%= pkg.keywords %>',
    'Text Domain: <%= pkg.name %>',
    'Domain Path: /languages/',
    'GitHub Theme URI: <%= pkg.homepage %>',
    'GitHub Branch: master',
    ' */',
    ''].join('\n');

  return gulp.src(config.metadata.src)
  .pipe(plugins.header(metadata, { pkg: pkg } ))
  .pipe(gulp.dest(config.metadata.dest));
});


// Build stylesheets from source Sass files, post-process, and write source maps (for debugging) with libsass
gulp.task( 'styles', [ 'styles-metadata' ]);
