// ==== THEME ==== //

var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    phpcbf      = require('gulp-phpcbf'),
    wppot       = require('gulp-wp-pot'),
    sort        = require('gulp-sort'),
    plugins     = require('gulp-load-plugins')({ camelize: true }),
    config      = require('../../gulpconfig').theme;

// Copy Advanced Custom Fields PRO files to the `build` folder
gulp.task('theme-acf', function() {
  return gulp.src(config.acf.src)
  .pipe(plugins.changed(config.acf.dest))
  .pipe(gulp.dest(config.acf.dest));
});

// Copy readme file to the `build` folder
gulp.task('theme-readme', function() {
  return gulp.src(config.readme.src)
  .pipe(plugins.changed(config.readme.dest))
  .pipe(gulp.dest(config.readme.dest));
});

// Copy custom font files to the `build` folder
gulp.task('theme-fonts', function() {
  return gulp.src(config.fonts.src)
  .pipe(plugins.changed(config.fonts.dest))
  .pipe(gulp.dest(config.fonts.dest));
});

// Lint theme php files with phpcbf, then copy to the `build` folder
gulp.task('theme-php', function () {
  return gulp.src(config.php.src)
  .pipe(phpcbf({
    bin: config.php.bin,
    standard: config.php.standard,
    warningSeverity: config.php.warningSeverity
  }))
  .on('error', gutil.log)
  .pipe(gulp.dest(config.php.dest));
});

// Copy composer dependency files to the `build` folder
gulp.task('theme-composer', function() {
  return gulp.src(config.composer.src)
  .pipe(plugins.changed(config.composer.dest))
  .pipe(gulp.dest(config.composer.dest));
});

// Update language template file with latest strings
gulp.task('languages', function () {
  return gulp.src(config.php.src)
    .pipe(sort())
    .pipe(wppot( {
      domain: config.lang.domain,
      destFile: config.lang.domain+'.pot',
      package: config.lang.domain,
      bugReport: 'https://github.com/uwc/'+config.lang.domain+'/issues',
      lastTranslator: 'Connor Bär <hello@connorbaer.io>',
      team: 'Made by Connor. <hello@connorbaer.io>'
    } ))
    .pipe(gulp.dest(config.lang.languages));
});

// Copy everything under `src/languages` indiscriminately
gulp.task('theme-lang', ['languages'], function() {
  return gulp.src(config.lang.src)
  .pipe(plugins.changed(config.lang.dest))
  .pipe(gulp.dest(config.lang.dest));
});


// All the theme tasks in one
gulp.task('theme', ['theme-lang', 'theme-php', 'theme-fonts', 'theme-readme', 'theme-acf']);
