// ==== WORDPRESS ==== //

var gulp    = require( 'gulp' ),
    plugins = require( 'gulp-load-plugins' )({ camelize: true }),
    pkg     = require( './../../package.json' ),
    config  = require( '../../gulpconfig' ).wordpress
;


// Copy Advanced Custom Fields PRO files to the `build` folder.
gulp.task('wordpress-acf', function() {
  return gulp.src(config.acf.src)
  .pipe(plugins.changed(config.acf.dest))
  .pipe(gulp.dest(config.acf.dest));
});


// Copy readme file to the `build` folder.
gulp.task('wordpress-readme', function() {
  return gulp.src(config.readme.src)
  .pipe(plugins.changed(config.readme.dest))
  .pipe(gulp.dest(config.readme.dest));
});


// Copy custom font files to the `build` folder.
gulp.task('wordpress-fonts', function() {
  return gulp.src(config.fonts.src)
  .pipe(plugins.changed(config.fonts.dest))
  .pipe(gulp.dest(config.fonts.dest));
});


// Lint theme php files with phpcbf, then copy to the `build` folder.
gulp.task('wordpress-php', function () {
  return gulp.src(config.php.src)
  .pipe(plugins.phpcbf({
    bin: config.php.bin,
    standard: config.php.standard,
    warningSeverity: config.php.warningSeverity
  }))
  .on('error', plugins.util.log)
  .pipe(gulp.dest(config.php.dest));
});


// Update language template file with latest strings.
gulp.task('languages', function () {
  return gulp.src(config.php.src)
  .pipe(plugins.sort())
  .pipe(plugins.wpPot( {
    domain: pkg.name,
    destFile: pkg.name+'.pot',
    package: pkg.name,
    bugReport: pkg.homepage + '/issues',
    lastTranslator: pkg.author,
    team: 'Made by Connor. <hi@madebyconnor.co>'
  } ))
  .pipe(gulp.dest(config.lang.languages));
});


// Copy everything under `src/languages` indiscriminately.
gulp.task('wordpress-lang', ['languages'], function() {
  return gulp.src(config.lang.src)
  .pipe(plugins.changed(config.lang.dest))
  .pipe(gulp.dest(config.lang.dest));
});


// All the above theme tasks in one.
gulp.task('wordpress', ['wordpress-lang', 'wordpress-php', 'wordpress-fonts', 'wordpress-readme', 'wordpress-acf']);


// Copy files from the `build` folder to 'dist/[project]'.
gulp.task('wordpress-dist', ['clean-tidy'], function() {
  return gulp.src(config.dist.src)
  .pipe(gulp.dest(config.dist.dest));
});
